import React from 'react'
import logo from '../assets/logo-appwrite.jpeg'
function Logo({ width = "100px" }) {
  return (
    <div className='rounded-full overflow-hidden'>
      <img src={logo} alt="logo" width={width} />
    </div>
  )
}

export default Logo