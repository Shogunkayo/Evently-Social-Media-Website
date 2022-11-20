import React from 'react';
import Select from 'react-select';


import Navbar from "./navbar";
const CreateEvent = () => {

    const [event_name, setName] = React.useState('');
    const [event_desc, setDesc] = React.useState('');
    const [event_genre, setGenre] = React.useState('misc');
    const [event_location, setLocation] = React.useState('');
    const [event_date, setDate] = React.useState('');
    const [event_duration, setDuration] = React.useState('1');
    const [event_age, setAge] = React.useState('all');
    const [isPending, setIsPending] = React.useState(false);

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
        console.log(genres)
        setGenre(genres)
    }

    const duration_select = selectedOption => {
        setDuration(selectedOption.value)
    }

    const age_select = selectedOption => {
        setAge(selectedOption.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const user_id = " "
        const create_time = new Date();
        const event_likes = 0;
        
        setDate(new Date(event_date));
        

        const new_event = {user_id, create_time, event_name, event_desc, event_likes, event_genre, event_location, event_date, event_duration, event_age};
    
        fetch("http://localhost:4000/api/event", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_event)
        }).then(()=>{
            console.log("EVENT CREATED");
            console.log(JSON.stringify(new_event))
        })
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
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input 
                                type='text' 
                                className='name'
                                value = {event_name}
                                onChange = {(e)=> setName(e.target.value)}
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

                        <div>
                            <label htmlFor='genre'>Genre</label>
                            <br></br>
                            <br></br>
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
                            <br></br>
                            <br></br>
                            <Select 
                                classname='duration'
                                defaultValue={{value: '1', label: 'Half Hour'}}
                                options={duration_options}
                                onChange={duration_select}
                                required
                            />
                        </div>

                        <br></br>
                        <br></br>

                        <div>
                            <label htmlFor='age'>Age-Group</label>
                            <br></br>
                            <br></br>
                            <Select 
                                classname='age'
                                defaultValue={{value: 'all', label: 'Everyone'}}
                                options={age_options}
                                onChange={age_select}
                                required
                            />
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

                        <div>
                            { !isPending && <button type='submit' id='submit'>Create</button>}
                            { isPending && <button type='submit'>Creating</button>}
                        </div>
                </form>
            </div>
            
        </div>
    </div>);
}
 
export default CreateEvent;