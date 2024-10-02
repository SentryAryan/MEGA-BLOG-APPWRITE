import React, { useEffect } from 'react'
import './App.css'
import { getCurrentUser } from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './redux/slices/authSlice'
import { setLoading } from './redux/slices/loadingSlice'
import { useSelector } from 'react-redux'
import Loader from './components/Loader'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom';

function App() {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      dispatch(login({ userData: user }));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(logout());
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <>
      {loading ? <Loader /> : (
        <div className='min-h-screen flex flex-wrap content-between 
        bg-gray-400'>
          <div className='w-full block'>
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}

export default App
