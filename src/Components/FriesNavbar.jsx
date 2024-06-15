import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useLoginDataProvider } from "../Components/LoginProvider"
import '../Styles/FriesNavBar.css';
import ColorChange from "../Components/ColorChange.jsx"

const FriesNavbar = () => {
  const { setUser, setToken, token, user } = useLoginDataProvider()

  const navigate = useNavigate()

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const closeMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  };
  const handleLogOut = () => {
    setUser(null);
    setToken(null);
    navigate('/')
  }

  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    }
  }, []);

  const tellTime = () => {
    let today = new Date()
    let readableDate = today.toDateString()
    return readableDate
  }

  return (
    <nav className='friesnavbar-style'>
      <div>
        <Link to={`/`} >
          <img src='../VillageLogo-Vect.svg' alt='Logo with heart in hand' className='logo' />
        </Link>
      </div>

     <div className="colorC"> 
       <ColorChange />
     </div>
      
      <div className='fries-btn-container'>
        <button type="button" ref={menuRef} className={`fries-btn ${openMenu ? 'open' : ''}`} onClick={toggleMenu}>
          <div className='fry'></div>
          <div className='fry short'></div>
          <div className='fry'></div>
        </button>
        {openMenu && (
          <div className='dropdown-content'>
            <ul className='ul-style'>
              <li>
                <Link to={'/'} className='Link'> Home </Link>
              </li>
           
              {(!user && !token) && ( // Conditionally render based on user and token state
                <>
                  <li>
                    <Link to={'/users/sign-up'} className='Link'> Sign Up </Link>
                  </li>
                  <li>
                    <Link to={'/users/login'} className='Link'> Log in </Link>
                  </li>
                  <li>
                    <Link to={'/about'} className='Link'>About</Link>
                  </li>
                </>
              )}
              {user && token && (

                <>
                  <li>
                    <Link to={'/users/home'} className='Link' > Profile </Link>
                  </li>
                  <li>
                    <Link to={'/users/villages'} className='Link'> Villages </Link>
                  </li>
                  <li>
                    <Link to={'/users/contacts'} className='Link'> Emergency Contacts </Link>
                  </li>
                  <li>
                    <Link to={'/users/medical'} className='Link'> Medical History </Link>
                  </li>
                  <li>
                    <Link to={'/about'} className='Link'>About</Link>
                  </li>
                  <li>
                    <Link to={'/'} className='Link logout' onClick={handleLogOut} style={{ textDecoration: 'none' }}>Log Out</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav >
  );
};
export default FriesNavbar;












