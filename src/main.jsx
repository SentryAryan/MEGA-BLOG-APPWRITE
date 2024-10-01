import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import AuthLayout from './components/AuthLayout'
import Login from './pages/Login'
import AddPost from './pages/AddPost'
import AllPosts from './pages/AllPosts'
import EditPost from './pages/EditPost'
import Home from './pages/Home'
import Post from './pages/Post'
import Signup from './pages/Signup'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { 
        path: "/", 
        element: <Home /> 
      },
      {
        path: "/login",
        element: <AuthLayout><Login /></AuthLayout>
      },
      {
        path: "/signup",
        element: <AuthLayout><Signup /></AuthLayout>
      },
      {
        path: "/add-post",
        element: <AuthLayout><AddPost /></AuthLayout>
      },
      {
        path: "/all-posts",
        element: <AuthLayout><AllPosts /></AuthLayout>
      },
      {
        path: "/edit-post/:slug",
        element: <AuthLayout><EditPost /></AuthLayout>
      },
      {
        path: "/post/:slug",
        element: <Post />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </BrowserRouter>,
)
