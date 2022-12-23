import { useEffect, useRef, useState } from 'react'

import { store } from './redux/store.js'
import Navbar from './navbar.js'
import './stylesheets/message.css'

const Message = () => {

    const [sendMessage, setSendMessage] = useState('')
    const [update, setUpdate] = useState(true)
    const [rooms, setRooms] = useState(false)
    const [messages, setMessages] = useState([])
    const [onUserSelect, setUserSelect] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState(false)

    const messageEnd = useRef (null)
    

    const handleProfileRedirect = () => {

    }

    const handleSelect = (e) => {
        console.log(e.target.id)
        fetch(`http://localhost:4000/dash/message/room/${store.getState().auth.user.user_id}/${e.target.id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
        }).then((response) => {
            response.json().then((room) => {
                console.log(room)
                setSelectedRoom(room)
                setUserSelect(true)
            })
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    useEffect(() => {
        if(update) {
            fetch(`http://localhost:4000/dash/message/${store.getState().auth.user.user_id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            }).then((response) => {
                response.json().then((body) => {
                    console.log(body)
                    setRooms(body)
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

    return (
        <div className='message-outer'>
            <Navbar />
            <div className='message-body'>
                <div className='message-left'>

                    {rooms && rooms.map((room,i) => (
                        <div key={i} id={room._id} onClick={handleSelect}>
                            <div>
                                <img src={`http://localhost:4000/api/image/user/1669871058432.jpg`}></img>
                            </div>
                            <div>
                                <h4>{room.user_name_receiver === store.getState().auth.user.user_name ? room.user_name_sender : room.user_name_reciever}</h4>
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

                    {selectedRoom && (
                        <div className='message-right-body'>
                            <div className='message-right-header'>
                                <img src={`http://localhost:4000/api/image/user/1669871058432.jpg`}></img>
                                <h4>{selectedRoom.user_name_receiver === store.getState().auth.user.user_name ? selectedRoom.user_name_sender : selectedRoom.user_name_reciever}</h4>
                            </div>
                            <div className='message-right-content'>
                                <div className='message-sent'>
                                    <p className='message-content'>Working</p>
                                    <p className='message-date'>1:13 pm</p>
                                </div>
                                <div className='message-received'>
                                    <p className='message-content'>Working it is</p>
                                    <p className='message-date'>1:13 pm</p>
                                </div>
                                <div className='message-sent'>
                                    <p className='message-content'>Working</p>
                                    <p className='message-date'>1:13 pm</p>
                                </div>
                                <div className='message-received'>
                                    <p className='message-content'>Working it is</p>
                                    <p className='message-date'>1:13 pm</p>
                                </div>
                                <div className='message-sent'>
                                    <p className='message-content'>Working</p>
                                    <p className='message-date'>1:13 pm</p>
                                </div>
                                <div className='message-received'>
                                    <p className='message-content'>Working it is</p>
                                    <p className='message-date'>1:13 pm</p>
                                </div>
                                <div className='message-received'>
                                    <p className='message-content'>Working it is</p>
                                    <p className='message-date'>1:13 pm</p>
                                </div>
                                <div className='message-received'>
                                    <p className='message-content'>Working it is</p>
                                    <p className='message-date'>1:13 pm</p>
                                </div>
                                <div className='message-received'>
                                    <p className='message-content'>Working it isWorking it isWorking it isWorking it isWorking it isWorking it isWorking it isWorking it isWorking it isWorking it isWorking it isWorking it isWorking it isWorking it isWorking it isWorking it is</p>
                                    <p className='message-date'>1:13 pm</p>
                                </div>
                                <div className='message-sent'>
                                    <p className='message-content'>WorkingWorkingWorkingWorkingWorkingWorkingWorkingWorkingWorkingWorkingWorking</p>
                                    <p className='message-date'>1:13 pm</p>
                                </div>
                                <div className='message-sent'>
                                    <p className='message-content'>Working</p>
                                    <p className='message-date'>1:13 pm</p>
                                </div>
                                <div className='message-sent'>
                                    <p className='message-content'>Working</p>
                                    <p className='message-date'>1:13 pm</p>
                                </div>

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