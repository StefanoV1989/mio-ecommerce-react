import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth'
import { firebaseConfig } from './firebase.config';

export const getUserProfile = async (userAuth, additionalInfo) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists) {
        const { email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (error) {
            //console.log(error);
        }
    }

    return userRef;
}

export const saveProductIntoDatabase = async (objectToAdd) => {
    const categoryRef = firestore.collection('prodotti');
    const batch = firestore.batch();

    objectToAdd.forEach(obj => {
        const newDoc = categoryRef.doc();

        batch.set(newDoc, obj);
    })

    return await batch.commit();
}



firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;