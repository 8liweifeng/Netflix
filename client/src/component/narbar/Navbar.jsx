import React from 'react';
import { useState } from 'react';
import "./Navbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset===0 ? false: true);
    return () => (window.onscroll = null);
  }
  console.log(isScrolled);
  return (
    <div className={isScrolled? "navbar scrolled" : "navbar"}>
      <div className='container'>
        <div className="left">
          <img 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="" />

          <Link to="/" className='link'><span>Homepage</span></Link>
          <Link to="/series" className='link'><span>Series</span></Link>
          <Link to="/movies" className='link'> <span>Movies</span></Link>
         
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <SearchIcon className='icon'/>
          <span>KID</span>
          <NotificationsIcon className='icon'/>
          <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg" 
          alt="" />
          <div className="profile">
            <ArrowDropDownIcon className='icon'/>
            <div className="options">
              <span>Setting</span>
              <span>Logout</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Navbar