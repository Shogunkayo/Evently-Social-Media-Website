import React from 'react';

const Filter = ({handleFilter}) => {
    
   
    const [eventGenre, setEventGenre] = React.useState('');
    const [eventLocation, setEventLocation] = React.useState('');
    const [eventDuration, setEventDuration] = React.useState('');
    const [eventAge, setEventAge] = React.useState('');

    const handleReset = (e) => {
        setEventGenre('');
        setEventLocation('');
        setEventDuration('');
        setEventAge('');
        let filter_array = {}
        const filter_query = '?' + new URLSearchParams(filter_array).toString();
        handleFilter(filter_query)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let filter_array = {}
        if(eventGenre){
            filter_array.event_genre = eventGenre
        }
        if(eventLocation){
            filter_array.event_location = eventLocation
        }
        if(eventDuration){
            filter_array.event_duration = eventDuration
        }
        if(eventAge){
            filter_array.event_age = eventAge
        }
        const filter_query = '?' + new URLSearchParams(filter_array).toString();
        handleFilter(filter_query)
    }

    return (
        <div className='filters'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='type'>Genre</label>
                        <select className='type' onChange={(e)=>{setEventGenre(e.target.value)}}>
                            <option value= ''></option>
                            <option value='music'>Music</option>
                            <option value='drama'>Drama</option>
                            <option value='art'>Art</option>
                            <option value='entertainment'>Entertainment</option>
                            <option value='misc'>Miscellaneous</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='location'>Location</label>
                        <input type='text' maxLength={30} className='location' onChange={(e)=>{setEventLocation(e.target.value)}}></input>
                    </div>

                    <div>
                        <label htmlFor='duration'>Duration</label>
                        <select className='duration' onChange={(e)=>{setEventDuration(e.target.value)}}>
                            <option value=''></option>
                            <option value={1}>Half hour</option>
                            <option value={2}>One Hour</option>
                            <option value={3}>Two Hours</option>
                            <option value={4}>Half Day</option>
                            <option value={5}>Full Day</option>
                            <option value={6}>More than a Day</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='age'>Age-Group</label>
                        <select className='age' onChange={(e)=>{setEventAge(e.target.value)}}>
                            <option value=''></option>
                            <option value='child'>Children</option>
                            <option value='teen'>Teenagers</option>
                            <option value='adult'>Adults</option>
                            <option value='all'>Everyone</option>
                        </select>
                    </div>

                    <div>
                        <button type='submit'>Filter</button>
                        <button type='reset' onClick={handleReset}>Clear</button>
                    </div>
                </form>
            </div>
    );
}
 
export default Filter;