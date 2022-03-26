import React from 'react';
import Loader from '../loader/loader.component';

const WithLoading = (ComponenteWrappato) => {
    const Caricamento = ({ loading, ...altreProps }) => {
        return loading ? (
            <Loader />
        ) : (<ComponenteWrappato {...altreProps} />)
    }

    return Caricamento;
}

export default WithLoading;