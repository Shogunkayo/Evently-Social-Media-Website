import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { store } from './redux/store.js'
import Navbar from './navbar.js';
import Cards from './cards.js';

const ProfilePage = () => {
    
    const profileID = useParams().handle

    const [isSameUser, setIsSameUser] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isUserFollowing, setIsUserFollowing] = useState(false);
    const [userEvents, setUserEvents] = useState([]);
    const [interestedEvents, setInterestedEvents] = useState([]);
    const [showPosts, setShowPosts] = useState(true);
    const [showInterested, setShowInterested] = useState(false);
    const [rerender, setRerender]  = useState();
    const [changeUserBio, setChangeUserBio] = useState('');
    const [followUpdate, setFollowUpdate] = useState(false);
    const [user_image, setImage] = useState(null);

    useEffect(()=>{

        fetch(`http://localhost:4000/dash/profile/${profileID}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
        body: JSON.stringify({user_id: store.getState().auth.user.user_id})
        }).then((response)=>{
            response.json().then((body)=>{
                setIsSameUser(body.isSame)
                setUserDetails(body.user)
                console.log(body)
                fetch(`http://localhost:4000/dash/event/create_time?user_id=${body.user._id}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken}
                }).then((response)=>{
                    response.json().then((body)=>{
                        setUserEvents(body)
                    })
                })

                fetch(`http://localhost:4000/dash/event/interested/${body.user.user_name}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken}
                }).then((response)=>{
                    response.json().then((body)=>{
                        setInterestedEvents(body)
                    })
                })
            })
        })
    }, [])

    useEffect(()=>{
        if(rerender){
            fetch(`http://localhost:4000/dash/profile/${profileID}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            body: JSON.stringify({user_id: store.getState().auth.user.user_id})
            }).then((response)=>{
                response.json().then((body)=>{
                    setIsSameUser(body.isSame)
                    setUserDetails(body.user)
                    fetch(`http://localhost:4000/dash/event/create_time?user_id=${body.user._id}`, {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken}
                    }).then((response)=>{
                        response.json().then((body)=>{
                            setUserEvents(body)
                        })
                    })

                    fetch(`http://localhost:4000/dash/event/interested/${body.user.user_name}`, {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken}
                    }).then((response)=>{
                        response.json().then((body)=>{
                            setInterestedEvents(body)
                        })
                    })
                })
            })
            setRerender(false);
        }        
    }, [rerender])

    useEffect(()=>{
        if(!isSameUser){
            fetch(`http://localhost:4000/dash/profile/${store.getState().auth.user.user_id}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken}
            }).then((response)=>{
                response.json().then((body)=>{
                    setCurrentUser(body)
                })
            })
        }
    }, [isSameUser])

    useEffect(()=>{
        if(currentUser || rerender){
            if(currentUser.user_following.includes(userDetails._id)){
                setIsUserFollowing(true)
            }
            else{
                setIsUserFollowing(false)
            }
        }
    }, [currentUser, rerender])

    useEffect(()=>{
        if(followUpdate){
            fetch(`http://localhost:4000/dash/profile/${store.getState().auth.user.user_id}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken}
            }).then((response)=>{
                response.json().then((body)=>{
                    setCurrentUser(body)
                })
            })
            setFollowUpdate(false)
            setRerender(true)
        }
    }, [followUpdate])

    const handleFollow = () => {
        fetch(`http://localhost:4000/dash/profile/follow/${currentUser._id}/${userDetails._id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            body: JSON.stringify({operation: 1})
        }).then((response)=>{
            response.json().then(()=>{
                setFollowUpdate(true)

                fetch(`http://localhost:4000/dash/user/notif/${userDetails._id}`,{
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
                    body: JSON.stringify({_id: currentUser._id, message: ' has started following you!'})
                })
            })
        })
    }

    const handleUnfollow = () =>{
        fetch(`http://localhost:4000/dash/profile/follow/${currentUser._id}/${userDetails._id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            body: JSON.stringify({operation: 0})
        }).then((response)=>{
            response.json().then(()=>{
                setFollowUpdate(true)
            })
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let userBio = changeUserBio
        if(!userBio){
            if(currentUser && currentUser.user_bio){
                userBio = currentUser.user_bio
            }
            else{
                userBio = " "
            }
        }

        const formData = new FormData();
        formData.append('user_img', user_image);
        fetch('http://localhost:4000/api/image/user', {
                method: 'POST',
                body: formData
        }).then((response)=>{
            response.json().then((body)=>{

                fetch(`http://localhost:4000/dash/profile/${store.getState().auth.user.user_id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
                    body: JSON.stringify({user_id: store.getState().auth.user.user_id, user_img: body.imgPath, user_bio: userBio})
                }).then(()=>{
                    setRerender(true);
                    setIsUpdating(false);
                })
            })
        })
    }

    return (
        <div>
            <Navbar />
            {userDetails &&
            <div className='profile-outer'>
                <div className='profile-user-top'>
                    <div className='profile-user-image'>
                        <img src= {`http://localhost:4000/api/image/user/${userDetails.user_img}`}></img>
                        {isSameUser && isUpdating && (
                            <div>
                                <div className='profile-image-upload'>
                                    <form onSubmit={handleSubmit}>
                                        <label className='profile-image-upload-label'>
                                        <p>Select Image</p>
                                        <input 
                                            className='user_img'
                                            name='user_img'
                                            type='file'
                                            onChange = {(e)=>{
                                                if(e.target.files[0] && (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg')){
                                                    setImage(e.target.files[0]);
                                                }
                                                else{
                                                    setImage(null);
                                                }
                                            }}
                                            accept= 'image/png, image/jpeg'
                                        ></input>
                                        </label>
                                        <textarea className='profile-bio' placeholder='Add a bio' onChange={(e)=>{setChangeUserBio(e.target.value)}} maxLength={150}></textarea>
                                        <button type='submit'>Update</button>
                                    </form>
                                </div>
                    
                            </div>
                        )}
                    </div>
                    <div className='profile-user-details'>
                        <div className='profile-user-details-1'>
                            <p className='profile-username'>{userDetails.user_name}</p>
                            {isSameUser && !isUpdating && <button className='profile-update' onClick={()=>{setIsUpdating(true)}}>Edit Profile</button>}
                            {isSameUser && isUpdating && <button className='profile-update-cancel' onClick={()=>{setIsUpdating(false)}}>Cancel</button>}
                            {!isSameUser && currentUser && !isUserFollowing && <button className='profile-follow' onClick={handleFollow}>Follow</button>}
                            {!isSameUser && currentUser && isUserFollowing && <button className='profile-unfollow' onClick={handleUnfollow}>Unfollow</button>}
                            {!isSameUser && <button className='profile-message'>Message</button>}
                        </div>
                        <div className='profile-user-details-2'>
                            <p><span>{userDetails.user_posts.length}</span> posts</p>
                            <p><span>{userDetails.user_followers.length}</span>  followers</p>
                            <p><span>{userDetails.user_following.length}</span>  following</p>
                        </div>
                        <div className='profile-user-details-3'>
                            {!isUpdating && <div className='bio-empty'></div>}
                            {!isUpdating && userDetails.user_bio && <p>{userDetails.user_bio}</p>}
                            {isUpdating && <div className='bio-toggle'></div>}
                        </div>
                    </div>
                </div>

                <div className='profile-toggle'>
                    {!isSameUser && (<button className='profile-toggle-special' onClick={()=>{setShowPosts(true); setShowInterested(false)}}>Posts</button>)}   
                    {isSameUser && (<button onClick={()=>{setShowPosts(true); setShowInterested(false)}}>Posts</button>)}
                    {isSameUser && (<button onClick={()=>{setShowPosts(false); setShowInterested(true)}}>Liked</button>)}
                </div>

                <div className='profile-user-posts'>
                    {showPosts && (<Cards cards={userEvents} inProfile={isSameUser} currentUser={store.getState().auth.user.user_id} handleRerender ={setRerender} sameUser={isSameUser} notInLiked={showInterested}/>)}
                    {showInterested && (<Cards cards={interestedEvents} inProfile={isSameUser} currentUser={store.getState().auth.user.user_id} handleRerender ={setRerender} sameUser={isSameUser} notInLiked={showInterested}/>)}
                </div>
            </div>
            }
            
        </div>
    );
}

export default ProfilePage;