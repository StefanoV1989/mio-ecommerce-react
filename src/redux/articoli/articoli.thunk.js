import { firestore } from "../../firebase/firebase.data";
import { getArticoliFail, getArticoliStart, getArticoliSuccess } from "./articoli.actions";

export const getProdotti = () => {

    return dispatch => {
        const articoliRef = firestore.collection('prodotti');

        dispatch(getArticoliStart());

        articoliRef.get().then(articoliSnapshop => {

            const cicloSnapshot = articoliSnapshop.docs.map((val) => {

                const { id, title, items, image, url } = val.data();

                return {
                    id,
                    title,
                    items,
                    image,
                    url
                }
            })

            const prodotti = cicloSnapshot.reduce((accumulator, prodotti) => {
                accumulator[prodotti.title.toLowerCase()] = prodotti;
                return accumulator;
            }, {})

            dispatch(getArticoliSuccess(prodotti));

            
        }).catch(error => {
            dispatch(getArticoliFail(error));
        })
    }
}