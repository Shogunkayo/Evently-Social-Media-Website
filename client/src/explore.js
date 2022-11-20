import React from 'react';
import Cards from './cards';
import Filter from './filter';
import Navbar from "./navbar";

const Explore = () => {

    const createDate = (year, month, day) => {
        const date = new Date(year, month, day);
        
        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        };

        const y = date.getFullYear();
        const m = padTo2Digits(date.getMonth() + 1);
        const d = padTo2Digits(date.getDate());

        const withHyphens = [d, m, y].join('-');
        return withHyphens;
    }

    const [cards, setCards] = React.useState([
        {name: "Galaxy Fun House", photo: "/images/event.webp" ,location: "Malleshwaram", date: createDate(2022, 3, 21), genres: [{type:"Family", id: 1},{type: "Entertainment", id: 2}], likes: 12, id: 1},
        {name: "Karnataka Art Exhibition", photo: "/images/event.webp", location: "Vijayanagar", date: createDate(2022, 4, 11), genres: [{type:"Art", id: 1}], likes: 22, id: 2},
        {name: "Music Square", photo: "/images/event.webp", location: "Indiranagar", date: createDate(2022, 3, 16), genres: [{type:"Music", id: 1}], likes: 13,  id: 3},
        {name: "Concert", photo: "/images/event.webp", location: "MG Road", date: createDate(2022, 3, 16), genres: [{type:"Music", id: 1}], likes: 12, id: 4},
    ]);


    const [filtered, setFiltered] = React.useState([
        {name: "Galaxy Fun House", photo: "/images/event.webp" ,location: "Malleshwaram", date: createDate(2022, 3, 21), genres: [{type:"Family", id: 1},{type: "Entertainment", id: 2}], likes: 12, id: 1},
        {name: "Karnataka Art Exhibition", photo: "/images/event.webp", location: "Vijayanagar", date: createDate(2022, 4, 11), genres: [{type:"Art", id: 1}], likes: 22, id: 2},
        {name: "Music Square", photo: "/images/event.webp", location: "Indiranagar", date: createDate(2022, 3, 16), genres: [{type:"Music", id: 1}], likes: 13,  id: 3},
        {name: "Concert", photo: "/images/event.webp", location: "MG Road", date: createDate(2022, 3, 16), genres: [{type:"Music", id: 1}], likes: 12, id: 4},
    ]);

    const [activeGenre,setActiveGenre] = React.useState("");

    

    return (
        <div>
            <Navbar />
            <div className='explore-header'>
                <h1>Explore Events</h1>
                <br></br>
                <p>Find events created by people in the community</p>
                <br></br>
                <br></br>
                <div className='sort'>
                    <p>Sort By:</p>
                    <button value='hot' id='hot'>Hot</button>
                    <button value='new' id='new'>New</button>
                </div>
            </div>
            <Filter cards={cards} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre}/>
            <div className='cards-body'>
                <Cards cards={cards}/>
            </div>
        </div>
    );
}
 
export default Explore;