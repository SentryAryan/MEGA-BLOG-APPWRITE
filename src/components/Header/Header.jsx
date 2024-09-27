import React from 'react'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn'
import Container from '../Container/Container'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { useNavigate } from 'react-router-dom'
function Header() {

  console.log("Header.jsx");

  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <Link to="/">
            <Logo width="70px" />
          </Link>
          <ul className='flex ml-auto'>
            {navItems.map((item) => (
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.path)} className='inline-bock 
                  px-6 py-2 duration-[300ms] hover:bg-blue-100 rounded-full'>
                    {item.name}
                  </button>
                </li>
              ) : null
            ))}
            {authStatus && <LogoutBtn />}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header