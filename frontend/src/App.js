import React, { useState, useEffect } from "react";
//import logo from './logo.svg';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import JoblyApi from './api/api';
import AppRoutes from "./routes-main/AppRoutes";
import useLocalStorage from "./hooks/useLocalStorage";
import LoadingSpinner from './support/LoadingSpinner';
import Navigation from './routes-main/Navigation';
import UserContext from "./auth/UserContext";
import "./polyfills";
import jwt from "jsonwebtoken";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  console.debug(
      "App",
      "infoLoaded=",
      infoLoaded,
      "currentUser=",
      currentUser,
      "token=",
      token
    );

  // need a useEffect will run whenever the app get a new token
  useEffect(function loadUserInfor(){
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser(){
      if (token){
        try {
          // jwt.decode() will return a payload object which contain username.
          let { username } = jwt.decode(token);
          //update new token in the Api class so it can use it to call the API.
          JoblyApi.token = token;
          // getCurrentUser is a method of JobApi class not function of useEffect.
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          console.debug(currentUser);
          // applications is a column of user table in database of back-end
          setApplicationIds(new Set(currentUser.applications));
        }catch(err){
           console.error("App loadUserInfo: problem loading", err);
           setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    } 
    // we need to set infoLoaded to fasle before we fetch the data 
    // It will show on the screen : Loading.... when it is waiting for the data from the request.
    setInfoLoaded(false);
    getCurrentUser();

  }, [token]);
 
  // login and get token
  async function login(loginData){
    try{
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return {success :true}
    }catch(errors){
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  //signup and  get token
  async function signup(signupData){
    try{
      let token = await JoblyApi.signup({...signupData});
      setToken(token);
      return {success :true};
    }catch(errors){
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  // signout and value of token and currentUser will be null
  async function logout(){
    setCurrentUser(null);
    setToken(null)
  }

  // Check the user did apply for this job
  function hasAppliedToJob(id){
    // Return boolean, if user did apply this job, it return true, otherwise return false
    return applicationIds.has(id)
  }

  async function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
        <div className="App">
          <Navigation logout={logout} />
          <AppRoutes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
