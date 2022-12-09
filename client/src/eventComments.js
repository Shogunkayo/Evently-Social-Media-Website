import React from "react";
import { useNavigate } from 'react-router-dom';
import { store } from "./redux/store";

const EventComments = ({comments, inProfile, setPopup, handleRerender, card}) => {

    const navigate = useNavigate()

    let handleProfileRedirect = (e) => {
        if(inProfile){
            setPopup(false);
            handleRerender(true);
        }
        navigate(`/profile/${e.target.getAttribute('id')}`)
    }

    const handleDelete = (e) => {
        console.log(e.target.getAttribute('id'))
        fetch(`http://localhost:4000/dash/event/comment/${store.getState().auth.user.user_id}/${e.target.getAttribute('id')}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            body: JSON.stringify({event_id: card._id})
        }).then((response)=>{
            response.json().then((body)=>{
                console.log(body)
            })
            setPopup(false);
        })
    }

    return (
        <div className='comment-main-body'>
            {comments.map((comment, i)=>(
                <div className='comment-child-body' key={i}>
                    <div className='comment-profile'>
                        <img alt='profile' src={`http://localhost:4000/api/image/user/${comment.user_img}`}></img>
                    </div>
                    <div className='comment-details'>
                        <h4 onClick={handleProfileRedirect} id= {comment.user_id}>{comment.user_name}</h4>
                        <p>{comment.comment}</p>
                    </div>
                    {comment.user_id == store.getState().auth.user.user_id && (<div className='comment-delete'>
                        <button onClick={handleDelete} id={comment.comment_id}>Delete</button>
                    </div>)}
                </div>
            ))}
        
        </div>
    );
}
 
export default EventComments;