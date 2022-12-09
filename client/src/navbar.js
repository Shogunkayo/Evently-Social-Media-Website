import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 
import { store } from './redux/store.js'
import { logout, reset } from './features/auth/authSlice'; 
import Notifications from './notifications.js';

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
            <form className='navsearch'>
                <input type='text' placeholder='Search...'></input>
                <button type='submit'>Search</button>
            </form>
            <div className='links'> 
                <a href='/'>Home</a>
                <a href='/'>Dashboard</a>
                <a href='/explore'>Explore</a>
                <a href='/create'>Create Event</a>
                <button className='notiffs' onClick={()=>{setNotifPopup(true)}}>Notifications</button>
                <a href='/'>Messages</a>
                <a href= {`/profile/${store.getState().auth.user.user_id}`}>Profile</a>
                <button className='logout' onClick={onLogout}>Logout</button>
            </div>

            <Notifications trigger={notifPopup} setTrigger={setNotifPopup}>
                <button onClick={handleClear} className='notif-clear'>Clear</button>
                {notifications && notifications.notifications.map((notification, i)=>(
                    <div className='notif' key={i}>
                        <img alt='profile' src={`http://localhost:4000/api/image/user/${notifications.details[i].user_img}`}></img>
                        <p><span id={notifications.details[i]._id} onClick={handleRedirect}>{notifications.details[i].user_name}</span> {notification.message}</p>
                    </div>
                ))}
                {(!notifications || notifications.notifications.length == 0) &&(
                    <div className='notif-empty'>
                        <h4>You don't have any notifications!</h4>
                    </div>
                )}
            </Notifications>

        </div>
    );
}
 
export default Navbar;