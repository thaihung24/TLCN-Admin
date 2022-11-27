import React from 'react'

import './topnav.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Dropdown from '../dropdown/Dropdown'
import Message from "../message/Message"
import Loader from "../loader/Loader"
import ThemeMenu from '../thememenu/ThemeMenu'

import notifications from '../../assets/JsonData/notification.json'

import user_image from '../../assets/images/tuat.png'

import user_menu from '../../assets/JsonData/user_menus.json'
import { logout } from '../../actions/userActions'
const curr_user = {
    fullName: 'User',
    avatar:{
        url: "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
    }
}

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.avatar.url} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.fullName}
        </div>
    </div>
)



const Topnav = () => {
    const renderUserMenu = (item, index) => (
        <Link onClick={logoutHandler} key={index}>
            <div className="notification-item">
                <i className={item.icon}></i>
                <span>{item.content}</span>
            </div>
        </Link>
    )
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout())
      }
    return (
         <div className='topnav'>
           <div className="topnav__search">
               <input type="text" placeholder='Search here...' />
               <i className='bx bx-search'></i>
           </div>
           <div className="topnav__right">
               <div className="topnav__right-item">
                   {/* dropdown here */}
                   {userInfo ?
                       (<Dropdown
                           customToggle={() => renderUserToggle(userInfo.data.user)}
                           contentData={user_menu}
                           renderItems={(item, index) => renderUserMenu(item, index)}
                       />) 
                       :(
                       <LinkContainer to='/login'>
                       <Nav.Link>
                         <i className='fas fa-user'></i>Sing In
                       </Nav.Link>
                     </LinkContainer>)}
               </div>
               <div className="topnav__right-item">
                   <Dropdown
                       icon='bx bx-bell'
                       badge='12'
                       contentData={notifications}
                       renderItems={(item, index) => renderNotificationItem(item, index)}
                       renderFooter={() => <Link to='/'>View All</Link>}
                   />
                   {/* dropdown here */}
               </div>
               <div className="topnav__right-item">
                   <ThemeMenu />
               </div>
           </div>
       </div>

    )
}

export default Topnav
