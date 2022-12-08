import React from "react";
import { useNavigate } from 'react-router-dom';


const EventComments = ({comments, inProfile, setPopup, handleRerender}) => {

    const navigate = useNavigate()

    let handleProfileRedirect = (e) => {
        if(inProfile){
            setPopup(false);
            handleRerender(true);
        }
        navigate(`/profile/${e.target.getAttribute('id')}`)
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
                </div>
            ))}
        
        </div>
    );
}
 
export default EventComments;