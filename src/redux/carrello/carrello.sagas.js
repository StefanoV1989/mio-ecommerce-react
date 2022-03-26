import { all, call, takeLatest, put, select } from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.data';
import { selectLoggedUser } from '../user/user.selectors';
import { UserActionTypes } from '../user/user.types';
import { retrieveCarrello, svuotaCarrelloFrontEnd } from './carrello.actions';
import { selectProdottiInCarrello } from './carrello.selectors';
import { CarrelloActionTypes } from './carrello.types';


export function* getFirestoreCarrello(action) {

    const utenteLoggato = yield select(selectLoggedUser);

    if (utenteLoggato) {
        
        const cartRef = firestore.collection(`users/${utenteLoggato.uid}/cartItems`);

        const cartSnapshot = yield cartRef.get();

        if(cartSnapshot.size === 0 && action.type === UserActionTypes.LOG_IN) {
            const prodottiInCarrello = yield select(selectProdottiInCarrello);

            const batch = firestore.batch();

            prodottiInCarrello.forEach(articolo => {
                const newDoc = cartRef.doc(); 

                batch.set(newDoc, articolo);
            })

            yield batch.commit();

            yield put(retrieveCarrello(prodottiInCarrello));

            return;
        }

        const elementiCarrello = yield cartSnapshot.docs.map(val => {
            return val.data();
        })

        yield put(retrieveCarrello(elementiCarrello));
    }

}

export function* onLogIn() {
    yield takeLatest([
        UserActionTypes.CHECK_USER_LOG,
        UserActionTypes.LOG_IN
    ], getFirestoreCarrello);
}


export function* saveCarrelloFirestore(action) {

    const utenteLoggato = yield select(selectLoggedUser);

    if (utenteLoggato) {
        const cartRef = yield firestore.collection(`users/${utenteLoggato.uid}/cartItems`);

        const cartSnapshot = yield cartRef.get();

        switch (action.type) {
            case CarrelloActionTypes.ADD_PRODOTTO:
                if (cartSnapshot.size === 0) {
                    cartRef.doc().set({
                        ...action.payload,
                        quantita: 1
                    });
                }
                else {
                    const documento = [];

                    cartSnapshot.docs.forEach(val => {
                        const datiDoc = val.data();

                        if (datiDoc.id === action.payload.id) {
                            firestore.doc(`users/${utenteLoggato.uid}/cartItems/${val.id}`).set({
                                ...datiDoc,
                                quantita: datiDoc.quantita + 1
                            });

                            documento.push(datiDoc);
                        }
                    });

                    if (documento.length === 0) {
                        cartRef.doc().set({
                            ...action.payload,
                            quantita: 1
                        });
                    }
                }

                break;
            case CarrelloActionTypes.CANCELLA_ELEMENTO:
                cartSnapshot.docs.forEach(val => {
                    const datiDoc = val.data();

                    if (datiDoc.id === action.payload.id) {
                        firestore.doc(`users/${utenteLoggato.uid}/cartItems/${val.id}`).delete();
                        return true;
                    }
                });
                break;
            case CarrelloActionTypes.REMOVE_PRODOTTO:

                cartSnapshot.docs.forEach(val => {
                    const datiDoc = val.data();

                    if (datiDoc.id === action.payload.id) {

                        if (datiDoc.quantita === 1) {
                            firestore.doc(`users/${utenteLoggato.uid}/cartItems/${val.id}`).delete();
                        }
                        else {
                            firestore.doc(`users/${utenteLoggato.uid}/cartItems/${val.id}`).set({
                                ...datiDoc,
                                quantita: datiDoc.quantita - 1
                            });
                        }

                        return true;

                        
                    }
                });
                break;
            case CarrelloActionTypes.SVUOTA_CARRELLO:
                cartSnapshot.docs.forEach(val => {
                    firestore.doc(`users/${utenteLoggato.uid}/cartItems/${val.id}`).delete();
                });
                break;

            default:
            
        }
    }
}

export function* onCarrelloActions() {
    yield takeLatest([
        CarrelloActionTypes.ADD_PRODOTTO,
        CarrelloActionTypes.REMOVE_PRODOTTO,
        CarrelloActionTypes.CANCELLA_ELEMENTO,
        CarrelloActionTypes.SVUOTA_CARRELLO
    ], saveCarrelloFirestore)
}

export function* clearCarrello() {
    yield (put(svuotaCarrelloFrontEnd()));
}

export function* onLogout() {
    yield takeLatest(UserActionTypes.LOG_OUT, clearCarrello)
}


export function* carrelloSagas() {
    yield (all([
        call(onLogIn),
        call(onCarrelloActions),
        call(onLogout),
    ]))
}