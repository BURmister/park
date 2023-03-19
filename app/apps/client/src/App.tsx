import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';

import AppContext from './hooks/Context';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import { isLoggedIn, refresh } from './redux/slices/auth/auth.slice';

import Login from './components/pages/login/Login';
import Header from './components/layouts/header/Header';
import Footer from './components/layouts/footer/Footer';
import Home from './components/pages/home/Home';
import About from './components/pages/about/About';
import History from './components/pages/history/History';

import './App.css';

function App() {
   const isUser = useAppSelector(isLoggedIn);
   const dispatch = useAppDispatch();

   let token = Cookies.get('access_token') !== undefined ? Cookies.get('access_token') : '';

   useEffect(() => {
      token = Cookies.get('access_token') !== undefined ? Cookies.get('access_token') : '';
      if (token) {
         dispatch(refresh());
      }
   }, []);

   //TODO remove that if
   if (token === undefined) {
      token = '';
   }

   // if (!isUser) {
   //    return (
   //       <div className="App">
   //          <Header isLogin={false} />
   //          <main>
   //             <Login />
   //          </main>
   //          <Footer />
   //       </div>
   //    );
   // }

   // if (token !== undefined) {
   return (
      <AppContext.Provider value={{ token }}>
         <div className="App">
            <Header isLogin={true} />
            <main>
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/history" element={<History />} />
                  <Route path="*" element={<h1 style={{ textAlign: 'center', paddingTop: '100px', color: 'black' }}>Страница не найдена</h1>} />
               </Routes>
            </main>
            <Footer />
         </div>
      </AppContext.Provider>
   );
   // }
}

export default App;
