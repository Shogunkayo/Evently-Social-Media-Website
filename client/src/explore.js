import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import Cards from './cards';
import Filter from './filter';
import Navbar from './navbar';
import { store } from './redux/store.js'

import search_empty from './images/empty_search.jpg'

const Explore = () => {

    const navigate = useNavigate()
    const {user} = useSelector((state)=> state.auth)
    
    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])

    const [cards, setCards] = useState([]);
    const [sort, setSort] = useState('default');
    const [filter, setFilter] = useState('?');

    useEffect(()=>{
        fetch(`http://localhost:4000/dash/event/${sort}${filter}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken} 
        }).then((response) => {
            response.json().then((body)=>{
                setCards(body)
            })
        })
    }, [sort, filter])
    
    const defaultButtonStyle = {
        fontSize: '1.2em',
        padding: '10px',
        margin: '10px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer'
    }

    const activeButtonStyle = {
        fontSize: '1.2em',
        padding: '10px',
        margin: '10px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        backgroundColor: '#22cca4',
        color: '#E4F9F5'
    }

    return (
        <div>
            <Navbar />
            <div className='explore-header'>
                <h1>Explore Events</h1>
                <br></br>
                <p>Find events created by people in the community</p>
                <br></br>
                <br></br>
                <div className='sort'>
                    <p>Sort By:</p>
                    <button value='hot' id='hot' 
                        onClick={()=>{sort==='event_likes' ? setSort('default') : setSort('event_likes');}}
                        style={sort === 'event_likes' ? activeButtonStyle : defaultButtonStyle}
                        >Hot</button>
                    <button value='new' id='new' 
                        onClick={()=>{sort === 'create_time' ? setSort('default') : setSort('create_time');}}
                        style={sort === 'create_time' ? activeButtonStyle : defaultButtonStyle}
                    >New</button>
                </div>
            </div>
            <Filter handleFilter={setFilter}/>
            {cards.length && 
                <div className='cards-body'>
                    <Cards cards={cards} inProfile={false} currentUser={null} handleRerender={null} sameUser={false} notInLiked={false}/>
                </div>}
            {!cards.length && 
                <div className='cards-empty'>
                    <img src={search_empty} alt='search-empty'></img>
                    <h4>We couldn't find what you searched for </h4>
                    <p><a href="http://www.freepik.com">Designed by slidesgo / Freepik</a></p>
                </div>
            }
        </div>
    );
}
 
export default Explore;