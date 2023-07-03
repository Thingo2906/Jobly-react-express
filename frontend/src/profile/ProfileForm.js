import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import JoblyApi from "../api/api";
import Alert from "../support/Alert";
function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  
  console.debug(
    "ProfileForm",
    "currentUser=",
    currentUser,
    "formData=",
    formData,
    "formErrors=",
    formErrors,
    "saveConfirmed=",
    saveConfirmed
  );
  async function handleSubmit(evt){
    evt.preventDefault();
    let updatedUser;
    let profileData = {
       firstName: formData.firstName,
       lastName: formData.lastName,
       email: formData.email,
       password: formData.password,
     };

    
    try {
      updatedUser = await JoblyApi.updateProfile(formData.username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }
    // when we update current user the form will show new information of user not the old one anymore
    // and the password will be emty string, and the user need to fill out password to confirm the change.
    setFormData(formData => ({...formData, password : ""}))
    //  set up the new information for user.
    setCurrentUser(updatedUser)
    setFormErrors([]);
    setSaveConfirmed(true);
  }
   function handleChange(evt){
    const {value, name} = evt.target;
    setFormData(f => ({...f, [name]: value}))
    setFormErrors([]);
  
   }

   return (
     <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
       <h2>Profile</h2>
       <div className="card">
         <div className="card-body">
           <form onSubmit={handleSubmit}>
             <div className="form-group">
               <label><b>Username</b></label>
               <p className="form-control-plaintext">{formData.username}</p>
             </div>
             <div className="form-group">
               <label>FirstName</label>
               <input
                 name="firstName"
                 className="form-control"
                 onChange={handleChange}
                 value={formData.firstName}
               />
             </div>
             <div className="form-group">
               <label>LastName</label>
               <input
                 name="lastName"
                 className="form-control"
                 onChange={handleChange}
                 value={formData.lastName}
               />
             </div>
             <div className="form-group">
               <label>Email</label>
               <input
                 name="email"
                 className="form-control"
                 onChange={handleChange}
                 value={formData.email}
               />
             </div>
             <div className="form-group">
               <h3>Confirm your password to update your change</h3>

               <label>Password</label>
               <input
                 type="password"
                 name="password"
                 className="form-control"
                 onChange={handleChange}
                 value={formData.password}
               />
             </div>

             {formErrors.length ? (
               <Alert type="danger" messages={formErrors} />
             ) : null}

             {saveConfirmed ? (
               <Alert type="success" messages={["Updated successfully."]} />
             ) : null}

             <button
               className="btn btn-primary btn-block mt-4"
               onSubmit={handleSubmit}
             >
               Submit
             </button>
           </form>
         </div>
       </div>
     </div>
   );

}
export default ProfileForm;
