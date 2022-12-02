import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import CardDesc from './enlarge_card';
import EventComments from './eventComments';
import { store } from './redux/store';

const Cards = ({cards, inProfile, currentUser, handleRerender, sameUser, notInLiked}) => {


    const navigate = useNavigate()

    const [popup, setPopup] = useState(false);
    const [card, setCard] = useState('')
    const [userHasLiked, setUserHasLiked] = useState(false);
    const [userInterested, setUserInterested] = useState([]);
    const [userInterestedChanged, setUserInterestedChanged] = useState(false);
    const [comments, setComments] = useState([]);
    const [eventComment, setEventComment] = useState('');
    const [commentSent, setCommentSent] = useState(false);
    

    const user_name = store.getState().auth.user.user_name;
    const user_id = store.getState().auth.user.user_id;
    
    useEffect(()=>{
        fetch(`http://localhost:4000/dash/user/${user_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken}
            }).then((response)=>{
                response.json().then((body)=>{
                    setUserInterested(body.user_interested)
            })
        })
    }, [])

    useEffect(()=>{
        if(card){
            if(card.event_interested.includes(user_name)){
                setUserHasLiked(true);
            }
            else{
                setUserHasLiked(false);
            }
            fetch(`http://localhost:4000/dash/event/comment/${card._id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            }).then((response)=>{
                response.json().then((body)=>{
                    setCommentSent(false);
                    setComments(body.event_comments);
                })
            })
        }
    }, [card])

    
    useEffect(()=>{
        if(userInterestedChanged){
            fetch(`http://localhost:4000/dash/user/${user_id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            body: JSON.stringify({user_interested: userInterested})
            })

            setUserInterestedChanged(false);
        }   
    }, [userInterestedChanged]);
    
    useEffect(()=>{
        setEventComment('');
        if(commentSent){
            fetch(`http://localhost:4000/dash/event/comment/${card._id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            }).then((response)=>{
                response.json().then((body)=>{
                    setCommentSent(false);
                    setComments(body.event_comments);
                })
            })
        }
    }, [commentSent])

    const getDate = (dateObject) => {
        let object = new Date(dateObject);
        let year = object.getFullYear();
        let month = object.getMonth() + 1;
        let date = object.getDate();

        return date + '-' + month + '-' + year
    }

    const getTime = (dateObject) => {
        let object = new Date(dateObject);
        return object.toLocaleTimeString().slice(0, -6) + object.toLocaleTimeString().slice(-3);
    }

    const getDuration = (duration) => {
        switch (duration) {
            case '1':
                return 'Half Hour'
            
            case '2':
                return 'One Hour'
            
            case '3':
                return 'Two Hours'
            
            case '4':
                return 'Half Day'
            
            case '5':
                return 'Full Day'
            
            case '6':
                return 'More than a Day'
 
            default:
                break;
        }
    }

    const getAge = (age) => {
        switch(age) {
            case 'all':
                return 'Everyone'
            
            case 'teen':
                return 'Teenagers'
            
            case 'adult':
                return 'Adults'

            case 'child':
                return 'Children'
        }
    }

    const handleLike = (e) => {
        e.preventDefault();
        if(userHasLiked){
            card.event_interested.splice(card.event_interested.indexOf(user_name), 1)
            card.event_likes -= 1;
            setUserInterested(userInterested.filter((eventId) => {
                return eventId !== card._id
            }))
            setUserHasLiked(false)
            
        }
        else{
            card.event_interested.push(user_name)
            card.event_likes += 1
            setUserInterested([...userInterested, card._id])
            setUserHasLiked(true)
        }

        setUserInterestedChanged(true)

        fetch(`http://localhost:4000/dash/event/${card._id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            body: JSON.stringify({event_interested: card.event_interested, event_likes: card.event_likes})
        })

        if(inProfile){
            handleRerender(true)
        }
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setEventComment('');
        
        fetch(`http://localhost:4000/dash/user/profileImg/${user_id}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken}
        }).then((response) => {
            response.json().then((body)=>{
                let user_img = body.user_img
                let event_comments = {user_id: user_id, user_name: user_name, user_img: user_img, comment: eventComment, date_created: new Date(), comment_id: user_id + new Date()}
                fetch(`http://localhost:4000/dash/event/comment/${card._id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
                    body: JSON.stringify(event_comments)
                }).then(()=>{
                    setCommentSent(true);
                    
                })
            })
        })
    }


    const handleClick = (e) => {
        if(!popup){
            setPopup(true)
            fetch(`http://localhost:4000/dash/event/default?event_name=${e.currentTarget.getAttribute('data-value')}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken}
            }).then((response)=>{
                response.json().then((body)=>{
                    setCard(body[0]);
                })
            })
        }
    }

    const handleDelete = (e) => {
        fetch(`http://localhost:4000/dash/event/delete/${currentUser}/${e.target.getAttribute('id')}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            body: JSON.stringify({user_id: store.getState().auth.user.user_id})
        }).then((response)=>{
            setPopup(false)
            response.json().then((body)=>{  
                console.log(body)
                for (let index = 0; index < body.deleteInterested.length; index++) {
                    fetch(`http://localhost:4000/dash/user/${body.deleteInterested[index]}/${body.deletedEvent}`,{
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken}
                    })   
                }
            }).then(()=>{
                handleRerender(true);
            })
        })
    }

    let handleProfileRedirect = (e) => {
        if(inProfile){
            setPopup(false);
            navigate(`/profile/${e.target.getAttribute('id')}`)
            handleRerender(true)
        }
        else{
            navigate(`/profile/${e.target.getAttribute('id')}`)
        }   
    }

    return (
        <div className='cards'>
            {cards.map((card)=>(
                <div className='event-preview' key={card._id} onClick = {handleClick} data-value = {card.event_name}>
                    <img src = {`http://localhost:4000/api/image/event/${card.event_img}`} alt='event'></img>
                    <br></br>
                    <br></br>
                    <h3>{card.event_name}</h3>
                    
                    <h5>At {card.event_location}</h5>
                    <h5>On {getDate(card.event_date)}</h5>
                    <br></br>
                    <div className='genre-container'>
                        <h5>Genres:</h5>
                        
                        <div>
                            {card.event_genre.map((genre, i)=>(
                                <div className='genre' key={i}>
                                    <p>{genre}</p>
                                </div>
                            ))}
                        </div>                      
                    </div>

                    
                </div>   
            ))}

            <CardDesc trigger = {popup} setTrigger = {setPopup}>
            {card && ( 
                <div>
                    <div className='popup-event-header'>
                        <h1>{card.event_name}</h1>
                        <p>Created by: <span onClick={handleProfileRedirect} id= {card.user_id}>{card.user_name}</span></p>
                        {inProfile && !notInLiked && sameUser && <button id= {card._id} onClick={handleDelete} className='event-delete'>Delete Event</button>}
                    </div>
                    
                    <div className='popup-event-body'>
                        <div className='popup-event-left'>
                            <div className='popup-event-details'>
                                <p>On: {getDate(card.event_date)}</p>
                                <p>Time: {getTime(card.event_date)}</p>
                                <p>Duration: {getDuration(card.event_duration)}</p>
                                <p>At: {card.event_location}</p>
                                <p>For: {getAge(card.event_age)}</p>
                            </div>
                            
                            <div className='popup-event-desc'>
                                <p>{card.event_desc}</p>
                            </div>

                            <div className='popup-event-like'>
                                {!userHasLiked && <img className='event-like-btn' src="https://img.icons8.com/wired/64/null/hearts.png" onClick={handleLike} alt='like'/>}
                                {userHasLiked && <img className='event-like-btn' src="https://img.icons8.com/dusk/64/null/hearts.png" onClick={handleLike} alt='unlike'/>}
                                <p className='event-likes-no'>{card.event_likes}</p>
                            </div>
                        </div>

                        <div className='popup-event-right'>
                            <div className='popup-event-comment-head'>
                                <p className='comment-no'>{comments.length} Comments</p>
                                <form onSubmit={handleCommentSubmit}>
                                    <div>
                                        <input 
                                            placeholder='Add a comment...'
                                            onChange={(e)=> {setEventComment(e.target.value)}}
                                            required
                                            maxLength={100}
                                        ></input>
                                    </div>
                                    <button type='submit'>Comment</button>
                                    <button type='reset' onClick={()=>{setCommentSent(false)}}>Clear</button>
                                </form>
                            </div>
                        
                            {
                                comments.length ?  (
                                    <div className='comments'>
                                        <EventComments comments={comments} inProfile={inProfile} handleRerender={handleRerender} setPopup={setPopup}/>
                                    </div>
                                ) :
                                
                                (                              
                                    <div className='comments-empty'>
                                        <h3>Be the first to comment!</h3>
                                    </div>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
                )
            }
            </CardDesc>
        </div>
    );
}
 
export default Cards;