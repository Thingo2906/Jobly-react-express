import React, {useContext} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompaniesList from "../company/CompaniesList";
import CompanyDetail from "../company/CompanyDetail";
import JobList from "../job/JobList";
import LoginForm from "../form/LoginForm";
import SignupForm from "../form/SignupForm";
import ProfileForm from "../profile/ProfileForm";
import UserContext from "../auth/UserContext";


function AppRoutes({ login, signup }) {
  const { currentUser } = useContext(UserContext);
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`
  );

  return (
    <Routes>
      {/* Unauthorized Routes  */}
      {!currentUser && (
        <>
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
        </>
      )}
      <Route path="/homepage" element={<Homepage />} />

      {/* Authorized Routes  */}
      {currentUser && (
        <>
          <Route path="/companies" element={<CompaniesList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/profile" element={<ProfileForm />} />
        </>
      )}

      {/* All auth */}
      <Route path="*" element={<Navigate to="/homepage" />} />
    </Routes>
  );
}

export default AppRoutes;
