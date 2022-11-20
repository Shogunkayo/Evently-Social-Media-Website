import React from 'react';
import CardDesc from './enlarge_card';
import Popup from 'reactjs-popup';

const Cards = ({cards}) => {

    const handleClick = (card) => {
        console.log("Working");
        <CardDesc />
    }

    return (
        <div className='cards'>
            {cards.map((card)=>(
                <div className='event-preview' key={card.id} onClick={handleClick}>
                    <img src={card.photo} alt='event photo'></img>
                    <h3>{card.name}</h3>
                    <h5>At {card.location}</h5>
                    <h5>On {card.date}</h5>
                    <div className='genre-container'>
                        <h5>Genres:</h5>
                        <div>
                            {card.genres.map((genre)=>(
                                <div className='genre' key={genre.id}>
                                    <p>{genre.type}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>   
            ))}
        </div>
    );
}
 
export default Cards;