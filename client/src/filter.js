import React from 'react';

const Filter = ({cards, setFiltered, activeGenre, setActiveGenre}) => {

    return (
        <div className='filters'>
                <form>
                    <div>
                        <label htmlFor='type'>Genre</label>
                        <select className='type'>
                            <option value='0'></option>
                            <option value='1'>Music</option>
                            <option value='2'>Drama</option>
                            <option value='3'>Art</option>
                            <option value='4'>Entertainment</option>
                            <option value='5'>Miscellaneous</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='location'>Location</label>
                        <input type='text' className='location'></input>
                    </div>

                    <div>
                        <label htmlFor='date'>Date</label>
                        <input type='date' className='date'></input>
                    </div>

                    <div>
                        <label htmlFor='duration'>Duration</label>
                        <select className='duration'>
                            <option value='0'></option>
                            <option value='1'>30mins</option>
                            <option value='2'>1hr</option>
                            <option value='3'>2hrs</option>
                            <option value='4'>half a day</option>
                            <option value='5'>entire day</option>
                            <option value='6'>more than a day</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='age'>Age-Group</label>
                        <select className='age'>
                            <option value='0'></option>
                            <option value='2'>Children</option>
                            <option value='3'>Teenagers</option>
                            <option value='4'>Adults</option>
                        </select>
                    </div>

                    <div>
                        <button type='submit'>Filter</button>
                        <button type='reset'>Clear</button>
                    </div>
                </form>
            </div>
    );
}
 
export default Filter;