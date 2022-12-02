import {useEffect, useState} from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { store } from './redux/store.js'
import Navbar from './navbar';
import ImgPopup from './stock_img.js';

const CreateEvent = () => {

    const navigate = useNavigate();
    const {user} = useSelector((state)=> state.auth)
    
    const [event_name, setName] = useState('');
    const [event_desc, setDesc] = useState('');
    const [event_genre, setGenre] = useState('misc');
    const [event_location, setLocation] = useState('');
    const [event_date, setDate] = useState('');
    const [event_duration, setDuration] = useState('1');
    const [event_age, setAge] = useState('all');
    const [event_image, setImage] = useState(null);
    const [isImage, setIsImage] = useState(true);
    const [useStock, setUseStock] = useState(false);
    const [isUsingStock, setIsUsingStock] = useState(false);

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])


    const genre_options = [
        {value: 'misc', label: 'Miscellaneous'},
        {value: 'music', label: 'Music'},
        {value: 'art', label: 'Art'},
        {value: 'drama', label: 'Drama'},
        {value: 'entertainment', label: 'Entertainment'},
    ];

    const duration_options = [
        {value: '1', label: 'Half Hour'},
        {value: '2', label: 'One Hour'},
        {value: '3', label: 'Two Hours'},
        {value: '4', label: 'Half Day'},
        {value: '5', label: 'Full Day'},
        {value: '6', label: 'More than a Day'},
    ]

    const age_options = [
        {value: 'all', label: 'Everyone'},
        {value: 'child', label: 'Children'},
        {value: 'teen', label: 'Teenagers'},
        {value: 'adult', label: 'Adults'},
    ]
    
    const genre_select = selectedOption => {
        let genres = []
        for(let i=0; i< selectedOption.length; i++){
            genres.push(selectedOption[i].value)
        }
        setGenre(genres)
    }

    const duration_select = selectedOption => {
        setDuration(selectedOption.value)
    }

    const age_select = selectedOption => {
        setAge(selectedOption.value)
    }

    const handleStockPopup = (e) => {
        e.preventDefault();
        setUseStock(true);
    }

    const handleStockImage = (e) => {
        setUseStock(false);
        setIsUsingStock(true);
        setImage(e.target.getAttribute('id'));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isUsingStock){
            const user_id = store.getState().auth.user.user_id;
            const user_name = store.getState().auth.user.user_name;
            const event_img = event_image;

            setDate(new Date(event_date));

            const new_event = {user_id, user_name, event_name, event_desc, event_genre, event_location, event_date, event_duration, event_age, event_img};
            console.log(new_event);

            fetch("http://localhost:4000/dash/event", {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
                body: JSON.stringify(new_event)
            }).then((response)=>{
                response.json().then((body)=>{
                    console.log(body.user_id);
                    fetch(`http://localhost:4000/dash/user/posts/${body.user_id}`,{
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
                    body: JSON.stringify({event_id: body._id})
                    }).then(()=>{
                        navigate('/explore')
                    })
                })
            })
        }
        else if(event_image){
            setIsImage(true);
            const user_id = store.getState().auth.user.user_id;
            const user_name = store.getState().auth.user.user_name;
            let event_img = ""
        
            setDate(new Date(event_date));

            const formData = new FormData();
            formData.append('event_img', event_image);

            fetch('http://localhost:4000/api/image/event', {
                method: 'POST',
                body: formData
            }).then((response)=>{
                response.json().then((body)=>{
                    event_img = body.imgPath
                    const new_event = {user_id, user_name, event_name, event_desc, event_genre, event_location, event_date, event_duration, event_age, event_img};
                    fetch("http://localhost:4000/dash/event", {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
                        body: JSON.stringify(new_event)
                    }).then((response)=>{
                        response.json().then((body)=>{
                                console.log(body.user_id);
                                fetch(`http://localhost:4000/dash/user/posts/${body.user_id}`,{
                                method: 'PUT',
                                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
                                body: JSON.stringify({event_id: body._id})
                                }).then(()=>{
                                    navigate('/explore')
                                })
                            })
                        })
                })
            })
        }
        else{
            setIsImage(false);
        }
    }

   
    return (
    <div>
        <Navbar />
        <div className='create-event'>
            <header>
                <h1>Create Event</h1>
                <br></br>
                <p>Create your own event and make it visible to all!</p>
                <br></br>
                <br></br>
            </header>

            <div className='create-event-body'>
                
                <form className='create-event-form' onSubmit={handleSubmit}>
                        <div className='left'>
                            <div>
                                <label htmlFor='name'>Name</label>
                                <input 
                                    type='text' 
                                    className='name'
                                    value = {event_name}
                                    onChange = {(e)=> setName(e.target.value)}
                                    maxLength = "22"
                                    required
                                    ></input>
                            </div>

                            <br></br>
                            <br></br>
                            

                            <div>
                                <label htmlFor='location'>Location</label>
                                <input 
                                    type='text' 
                                    className='location'
                                    value = {event_location}
                                    onChange = {(e)=> setLocation(e.target.value)}
                                    maxLength = "30"
                                    required
                                    ></input>
                            </div>

                            <br></br>
                            <br></br>
                            

                            <div>
                                <label htmlFor='date'>Date</label>
                                <input 
                                type='datetime-local' 
                                className='date'
                                value = {event_date}
                                onChange = {(e)=> setDate(e.target.value)}
                                required
                                ></input>
                            </div>

                            <br></br>
                            <br></br>

                            <div className='description-body'>
                                <label htmlFor='description'>Description</label>
                                <br></br>
                                <br></br>
                                <textarea 
                                    className='description'
                                    value = {event_desc}
                                    onChange = {(e)=> setDesc(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        </div>
                        
                        <div className='right'>
                            <div>
                                <label htmlFor='genre'>Genre</label>

                                <div className='genre-body'>
                                    <Select
                                        className='genre'
                                        options={genre_options}
                                        onChange={genre_select}
                                        defaultValue={{value: 'misc', label: 'Miscellaneous'}}
                                        isMulti
                                        required
                                    />
                                </div>
                            </div>

                            <br></br>
                            <br></br>

                            <div>
                                <label htmlFor='duration'>Duration</label>
                                <div className='duration-body'>
                                    <Select 
                                        classname='duration'
                                        defaultValue={{value: '1', label: 'Half Hour'}}
                                        options={duration_options}
                                        onChange={duration_select}
                                        required
                                    />
                                </div>
                            </div>

                            <br></br>
                            <br></br>

                            <div>
                                <label htmlFor='age'>Age-Group</label>
                                <div className='age-body'>
                                    <Select 
                                        classname='age'
                                        defaultValue={{value: 'all', label: 'Everyone'}}
                                        options={age_options}
                                        onChange={age_select}
                                        required
                                    />
                                </div>
                            </div>

                            <br></br>
                            <br></br>
    
                            <div className='event-image'>
                                <div className='image-preview'>
                                    <label>Image Preview</label>
                                    <br></br>
                                    <br></br>
                                    {event_image && !isUsingStock && (
                                        <div className='image-preview-body'>
                                            <img className='image-preview-image' alt="not found" src={URL.createObjectURL(event_image)} />
                                            <br />
                                            <div className='image-preview-remove-body'>
                                                <button className='image-preview-remove' onClick={()=>setImage(null)}>Remove Image</button>
                                            </div>
                                        </div>
                                    )}

                                    {event_image && isUsingStock && (
                                         <div className='image-preview-body'>
                                            <img className='image-preview-image' alt="not found" src={`http://localhost:4000/api/image/event/${event_image}`}/>
                                            <br />
                                            <div className='image-preview-remove-body'>
                                                <button className='image-preview-remove' onClick={()=>setImage(null)}>Remove Image</button>
                                            </div>
                                        </div>
                                    )}
                                    {
                                        !event_image && (
                                            <div className='image-preview-empty'>

                                            </div>
                                        )
                                    }
                                    
                                </div>
                                <div className='image-upload'>
                                    <label className='image-upload-label'>
                                    <p>Select Image</p>
                                    <input 
                                        className='event_img'
                                        name='event_img'
                                        type='file'
                                        onChange = {(e)=>{
                                            if(e.target.files[0] && (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg')){
                                                setImage(e.target.files[0]);
                                                setIsImage(true);
                                                setIsUsingStock(false);
                                            }
                                            else{
                                                setImage(null);
                                            }
                                        }}
                                        accept= 'image/png, image/jpeg'
                                    ></input>
                                    </label>
                                </div>
                            </div>
                                
                            <div className='event-stock'>
                                <button className='event-stock-btn' onClick={handleStockPopup}>Use Stock Image</button>
                            </div>

                            <div className='event-submit'>
                                <button type='submit' id='submit'>Create Event</button>
                            </div>
                        </div>
                </form>
            </div>
            
            <ImgPopup trigger={useStock} setTrigger={setUseStock}>
                <div className='stock-image-body'>
                    <img className='stock-image' id='stock1.jpg' onClick={handleStockImage} alt='stock' src='http://localhost:4000/api/image/event/stock1.jpg' />
                    <img className='stock-image' id='stock2.jpg' onClick={handleStockImage} alt='stock' src='http://localhost:4000/api/image/event/stock2.jpg' />
                    <img className='stock-image' id='stock3.jpg' onClick={handleStockImage} alt='stock' src='http://localhost:4000/api/image/event/stock3.jpg' /> 
                    <img className='stock-image' id='stock4.jpg' onClick={handleStockImage} alt='stock' src='http://localhost:4000/api/image/event/stock4.jpg' />
                    <img className='stock-image' id='stock5.jpg' onClick={handleStockImage} alt='stock' src='http://localhost:4000/api/image/event/stock5.jpg' />
                    <img className='stock-image' id='stock6.jpg' onClick={handleStockImage} alt='stock' src='http://localhost:4000/api/image/event/stock6.jpg' />
                </div>
            </ImgPopup>

            <div>
                { !isImage && <span className='image-error'>Please upload a valid image file</span>}
            </div>

        </div>
    </div>);
}
 
export default CreateEvent;