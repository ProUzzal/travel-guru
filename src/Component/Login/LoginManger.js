import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Firebase.config";

export const initializeWithLoginFramework = () => {
    // firebase.initializeApp(firebaseConfig);
  
    // If you get error here use this code to stop recall the function
  
      if(firebase.apps.length===0){
         firebase.initializeApp(firebaseConfig);
   }
  };
  





export const createUserWithEmailAndPass = (Name, email, Password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, Password)
      .then((res) => {
        const userInfo = res.user;
        userInfo["error"] = "";
        // userInfo['success']=message;
        userInfo["success"] = true;
        updateUserInfo(Name);
        return userInfo;
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        const userInfo = {};
        userInfo["success"] = false;
        userInfo["success"] = "";
        userInfo["error"] = errorMessage;
        return userInfo;
        // console.log( errorMessage);
        // ...
      });
  };
  export const signInWithEmailAndPass = (email,Password) => {
    return firebase
       .auth()
       .signInWithEmailAndPassword(email, Password)
       .then((res) => {
         const userInfo = res.user;
         userInfo["error"] = "";
         // userInfo['success']=message;
         userInfo["success"] = true;
         
         console.log("sign in info", res);
         return userInfo;
       })
       .catch(function (error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         const userInfo = {};
         userInfo["success"] = false;
         userInfo["success"] = "";
         userInfo["error"] = errorMessage;
         return userInfo;
         // ...
       });
   };
  const updateUserInfo = (Name) => {
    const user = firebase.auth().currentUser;
  
    user
      .updateProfile({
        displayName: Name,
      })
      .then(() => {
        console.log("Update Successfully");
      })
      .catch(function (error) {
        // An error happened.
        console.log(error.message);
      });
  };




//Google
  
export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log(res.user);
      const { photoURL, email, displayName } = res.user;
      const signInUser = {
        isSignIn: true,
        email: email,
        Name: displayName,
        Photo: photoURL,
        success: true,
      };
      return signInUser;
      console.log(email, displayName);
    })
    .catch((err) => console.log(err));
};


  //SignOutPart//////////////////////////////////////////////////////////SignOutPart
export const handleGoogleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const userInfo = {
        isSignIn: false,
        email: "",
        Name: "",
        Photo: "",
      };
      return userInfo;
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });
};

//facebook
export const handleFbSign = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((res) => {
      const users = res.user;
      users.success = true;
      return users;
    })

    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
};
