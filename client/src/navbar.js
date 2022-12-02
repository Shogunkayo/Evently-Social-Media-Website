import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 
import { store } from './redux/store.js'
import { logout, reset } from './features/auth/authSlice'; 

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
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
                <a href='/'>Messages</a>
                <a href= {`/profile/${store.getState().auth.user.user_id}`}>Profile</a>
                <button className='logout' onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
}
 
export default Navbar;