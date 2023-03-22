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
import News from './components/pages/news/News';
import Events from './components/pages/events/Events';
import Pay from './components/pages/info-pages/pay/Pay';
import Garden from './components/pages/info-pages/garden/Garden';
import Excursions from './components/pages/info-pages/excursions/Excursions';
import AddEvents from './components/pages/admin/events/Events';
import AddNews from './components/pages/admin/news/News';

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

   if (token === undefined) {
      token = '';
   }

   // if (token !== undefined) {
   return (
      <AppContext.Provider value={{ token }}>
         <div className="App">
            <Header />
            <main>
               <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/info/pay" element={<Pay />} />
                  <Route path="/info/garden" element={<Garden />} />
                  <Route path="/info/excursions" element={<Excursions />} />
                  <Route path="*" element={<h1 style={{ textAlign: 'center', paddingTop: '100px', color: 'black' }}>Страница не найдена</h1>} />
                  <Route path="/events/add" element={<AddEvents />} />
                  <Route path="/news/add" element={<AddNews />} />
               </Routes>
            </main>
            <Footer />
         </div>
      </AppContext.Provider>
   );
   // }
}

export default App;
