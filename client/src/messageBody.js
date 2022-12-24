import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';

import { store } from './redux/store.js'
import Navbar from './navbar.js'
import './stylesheets/message.css'

const Message = () => {

    const navigate = useNavigate()

    const [sendMessage, setSendMessage] = useState('')
    const [update, setUpdate] = useState(true)
    const [rooms, setRooms] = useState(false)
    const [onUserSelect, setUserSelect] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState(false)
    const [messageUpdate, setMessageUpdate] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const messageEnd = useRef (null)
    

    const handleProfileRedirect = (e) => {
        console.log('clicked')
        navigate(`/profile/${e.target.getAttribute('id')}`)
    }

    const handleSelect = (e) => {
        fetch(`http://localhost:4000/dash/message/room/${store.getState().auth.user.user_id}/${e.target.id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
        }).then((response) => {
            response.json().then(async (room) => {
                let response = await fetch(`http://localhost:4000/dash/user/profileImg/${room.user_name_reciever === store.getState().auth.user.user_name ? room._id_sender : room._id_reciever}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
                })

                let image_url = await response.json()
                room.reciever_img = image_url.user_img
                setSelectedRoom(room)
                setUserSelect(true)
            })
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:4000/dash/message/room/${store.getState().auth.user.user_id}/${selectedRoom._id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            body: JSON.stringify({sender: store.getState().auth.user.user_id, time: new Date(), message: sendMessage})
        }).then(() => {
            setMessageUpdate(true)
            setSendMessage('')
        })
    }

    const getMessageTime = (time) => {
        let date = new Date(time)
        return date.getHours() + ':' + date.getMinutes()
    }

    useEffect(() => {
        if(update) {
            fetch(`http://localhost:4000/dash/message/${store.getState().auth.user.user_id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            }).then((response) => {
                response.json().then(async (body) => {
                    console.log(body)
                    for(let i=0; i<body.length; i++) {
                        let response = await fetch(`http://localhost:4000/dash/user/profileImg/${body[i].user_name_reciever === store.getState().auth.user.user_name ? body[i]._id_sender : body[i]._id_reciever}`, {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
                        })

                        let image_url = await response.json()
                        body[i].reciever_img = image_url.user_img
                    }
                    setRooms(body)
                    setLoaded(true)
                })
            })
            setUpdate(false)
        }
    }, [update])

    useEffect(() => {
        if(onUserSelect){
            messageEnd.current?.scrollIntoView({behaviour: 'smooth'})
            setUserSelect(false)
        }
    }, [onUserSelect])

    useEffect(() => {
        if(messageUpdate) {
            fetch(`http://localhost:4000/dash/message/room/${store.getState().auth.user.user_id}/${selectedRoom._id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            }).then((response) => {
                response.json().then(async (room) => {
                    let response = await fetch(`http://localhost:4000/dash/user/profileImg/${room.user_name_reciever === store.getState().auth.user.user_name ? room._id_sender : room._id_reciever}`, {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
                    })

                    let image_url = await response.json()
                    room.reciever_img = image_url.user_img
                    setSelectedRoom(room)
                    setUserSelect(true)
                })
            })
            setMessageUpdate(false)
        }
    }, [messageUpdate])

    return (
        <div className='message-outer'>
            <Navbar />
            <div className='message-body'>
                <div className='message-left'>

                    {rooms && rooms.map((room,i) => (
                        <div key={i} id={room._id} onClick={handleSelect}>
                            <div>
                                <img src={`http://localhost:4000/api/image/user/${room.reciever_img}`}></img>
                            </div>
                            <div>
                                <h4>{room.user_name_reciever === store.getState().auth.user.user_name ? room.user_name_sender : room.user_name_reciever}</h4>
                                <p>{room.messages.length === 0 ? ' ' : room.messages[room.messages.length - 1].content}</p>
                            </div>
                            <div>
                                <p>{room.messages.length === 0 ? ' ' : room.messages[room.messages.length - 1].date}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='message-right'>
                    {!selectedRoom &&  (
                        <div className='message-right-banner'>
                            <h1 onClick={handleProfileRedirect}>Evently</h1>
                            <p>Connect with people!</p>
                        </div>)} 

                    {selectedRoom && loaded &&(
                        <div className='message-right-body'>
                            <div className='message-right-header'>
                                <img src={`http://localhost:4000/api/image/user/${selectedRoom.reciever_img}`}></img>
                                <h4 onClick={handleProfileRedirect} id={selectedRoom.user_name_reciever === store.getState().auth.user.user_name ? selectedRoom._id_sender : selectedRoom._id_reciever}>{selectedRoom.user_name_reciever === store.getState().auth.user.user_name ? selectedRoom.user_name_sender : selectedRoom.user_name_reciever}</h4>
                            </div>
                            
                            <div className='message-right-content'>                                
                                {selectedRoom && selectedRoom.messages.map((message, i) => (
                                    <div key={i} className={message.sender === store.getState().auth.user.user_id ? 'message-sent' : 'message-recieved'}>
                                        <p className='message-content'>{message.message}</p>
                                        <p className='message-date'>{getMessageTime(message.time)}</p>
                                    </div>
                                ))}
                                <div ref={messageEnd}/>
                            </div>
                            <div className='message-right-footer'>
                                <form onSubmit={handleSubmit}>
                                    <input placeholder='Type a message...' value={sendMessage} onChange={(e)=> {setSendMessage(e.target.value)}} maxLength={500}></input>
                                    <button type='submit'>Send</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default Message;