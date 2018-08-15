import {auth} from "./firebase";

//Check Users
export const doFetchProvidersForEmail = email => auth.fetchProvidersForEmail(email);

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => auth.signOut();

// Password Reset
export const doPasswordReset = email => auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = password => auth
  .userAuth
  .updatePassword(password);
