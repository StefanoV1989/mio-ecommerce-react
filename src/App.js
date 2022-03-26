import React, { Suspense, useEffect } from 'react'
import './App.css';
import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component'

import { Routes, Route, Navigate } from 'react-router-dom';
import Articoli from './pages/articoli/articoli.component';
import Login from './pages/login/login.component';
import { auth } from './firebase/firebase.data';
import { connect, useDispatch } from 'react-redux';
import { checkUserLog } from './redux/user/user.actions';
import { getProdotti } from './redux/articoli/articoli.thunk';
import Loader from './components/loader/loader.component';

const Cassa = React.lazy(() => import('./pages/cassa/cassa.component.jsx'));

export const NoPage = () => (
  <div className='nopage'>NO PAGINA</div>
)

function App({ user, setUser }) {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProdotti());
  }, [dispatch])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      setUser(userAuth);
    })

    //saveProductIntoDatabase(categorie);
  }, [setUser])

  return (
    <div className="App">
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/shop/*' element={<Articoli />} />
          <Route path='/checkout' element={<Cassa />} />
          <Route path='/login' element={user !== null ? (<Navigate to='/' />) : (<Login />)} />
          <Route path='/*' element={<NoPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.loggedUser
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(checkUserLog(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
