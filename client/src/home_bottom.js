import React from 'react';
import gautham from './images/gautham.jpeg'


const HomeBottom = () => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isPending, setIsPending] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const feedback = {name, email, message}
    }

    return ( 
        <div className='homebottom' id='homebottom'>
            <div className='abouthead'>
                <h1>About Us</h1>
            </div>
            
            <div className='profiles'>
                <div className='gautham'>
                    <img src = {gautham} alt='img1'></img>
                    <h2>Gautham</h2>
                    <p>3rd Sem Computer Science student</p>
                </div>
                <div className='ganesh'>
                    <img src = {gautham} alt='img2'></img>
                    <h2>Ganesh</h2>
                    <p>3rd Sem Computer Science student</p>
                </div>
                <div className='gagan'>
                    <img src = {gautham} alt='img3'></img>
                    <h2>Gagan</h2>
                    <p>3rd Sem Computer Science student</p>
                </div>
            </div>
        
            <div className='feedback'>
                <h4>Send us a message!</h4>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <br/>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br/><br/>
                    <label>Email:</label>
                    <br/>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br/><br/>
                    <label>Message:</label>
                    <br/>
                    <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    { !isPending && <button type='submit'>Send</button>}
                    { isPending && <button type='submit'>Sending...</button>}
                </form>
            </div>

        </div>
    );
}
 
export default HomeBottom;