import {db} from './firebase';

export const doCreateUser = (id, username, firstname, email) => db
    .ref(`users/${id}`)
    .set({username, firstname, email});

export const onceGetUser = (uid) => db
    .ref(`users/${uid}`)
    .once("value", (snapshot) => snapshot)
