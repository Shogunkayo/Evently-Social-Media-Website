import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 
import { store } from './redux/store.js'
import { logout, reset } from './features/auth/authSlice'; 
import Notifications from './notifications.js';


import create_btn from './images/create.png'
import logout_btn from './images/logout.png'
import profile_btn from './images/profile.png'
import home_btn from './images/home.png'
import explore_btn from './images/explore.png'
import bell_btn from './images/notification.png'
import message_btn from './images/message.png'

const Navbar = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }


    const [notifPopup, setNotifPopup] = useState(false);
    const [notifications, setNotifications] = useState(null);
    const {user} = useSelector((state)=> state.auth)


    useEffect(()=>{
        if(notifPopup){
            fetch(`http://localhost:4000/dash/user/notif/${user.user_id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken}
            }).then((response)=>{
                response.json().then((body)=>{
                    setNotifications(body)
                    console.log(body)
                })
            })
        }
    }, [notifPopup])

    const handleRedirect = (e) => {
        console.log(e.target.getAttribute('id'))
        setNotifPopup(false)
        if(props.handleRerender){
            props?.handleRerender(true);
        }
        navigate(`/profile/${e.target.getAttribute('id')}`)
    }

    const handleClear = () => {
        fetch(`http://localhost:4000/dash/user/notif/${user.user_id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            body: JSON.stringify({id: user.user_id})
        }).then(()=>{
            setNotifPopup(false)
        })
    }

    return (
        <div className='navbar'>
            <h1>Evently</h1>
            <div className='links'> 
                <a href='/'><div className='links-first'><img src={home_btn} alt='navbar'></img></div></a>
                <a href='/explore'><div className='links-second'><img src={explore_btn} alt='navbar'></img></div></a>
                <a href='/create'><div className='links-third'><img src={create_btn} alt='navbar'></img></div></a>
                <a href='/message'><div className='links-message'><img src={message_btn} alt='navbar'></img></div></a>
                <div className='links-fourth' onClick={()=>{setNotifPopup(true)}}><button className='notiffs' onClick={()=>{setNotifPopup(true)}}><img src={bell_btn} alt='navbar'></img></button></div>
                <a href= {`/profile/${store.getState().auth.user.user_id}`}><div className='links-fifth'><img src={profile_btn} alt='navbar'></img></div></a>
                <div className='links-last'  onClick={onLogout}><button className='logout' onClick={onLogout}><img src={logout_btn} alt='navbar'></img></button></div>

            </div>

            <Notifications trigger={notifPopup} setTrigger={setNotifPopup}>
                <button onClick={handleClear} className='notif-clear'>Clear</button>
                {notifications && notifications.notifications.map((notification, i)=>(
                    <div className='notif' key={i}>
                        <img alt='profile' src={`http://localhost:4000/api/image/user/${notifications.details[i].user_img}`}></img>
                        <p><span id={notifications.details[i]._id} onClick={handleRedirect}>{notifications.details[i].user_name}</span> {notification.message}</p>
                    </div>
                ))}
                {(!notifications || notifications.notifications.length === 0) &&(
                    <div className='notif-empty'>
                        <h4>You don't have any notifications!</h4>
                    </div>
                )}
            </Notifications>

        </div>
    );
}
 
export default Navbar;