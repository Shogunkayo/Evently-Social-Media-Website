import React from 'react';

const Feedback = () => {


    const RecentFeedback = {
        name: "",
        message: "",
    }

    const [fdback_name, setName] = React.useState('');
    const [fdback_email, setEmail] = React.useState('');
    const [fdback_message, setMessage] = React.useState('');
    const [isPending, setIsPending] = React.useState(false);
    const [fdback_recent_one, setRecentOne] = React.useState(Object.create(RecentFeedback));
    const [fdback_recent_two, setRecentTwo] = React.useState(Object.create(RecentFeedback));
    const [fdback_recent_three, setRecentThree] = React.useState(Object.create(RecentFeedback));

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const fdback_time = new Date();
        
        const feedback = {fdback_name, fdback_email, fdback_message, fdback_time}
        
        setIsPending(true);

        fetch("http://localhost:4000/api/feedback", {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(feedback)
        }).then(()=>{
            console.log("FEEDBACK SUBMITTED");
            console.log(JSON.stringify(feedback))
        });
    }

    React.useEffect(()=>{
        console.log("USE EFFECT WORKED");

        fetch("http://localhost:4000/api/feedback", {
            method: 'GET',
        }).then((response)=>{
            response.json().then((recent)=>{
                setRecentOne({name: recent[0].fdback_name, message: recent[0].fdback_message});
                setRecentTwo({name: recent[1].fdback_name, message: recent[1].fdback_message});
                setRecentThree({name: recent[2].fdback_name, message: recent[2].fdback_message});
            })
        })
    }, [isPending])


    return (
        <div className='feedback' id='feedback'>
            
            <div className='feedback-head'>
                <h1>Feedback</h1>
            </div>
            
            <div className='feedback-content'>
                <div className='feedback-form'>
                    <h4>Send us a message!</h4>
                    <form onSubmit={handleSubmit}>
                        <label>Name</label>
                        <br/>
                        <input
                            type="text"
                            required
                            value={fdback_name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={30}
                        />
                        <br/><br/>
                        <label>Email</label>
                        <br/>
                        <input
                            type="email"
                            value={fdback_email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br/><br/>
                        <label>Message</label>
                        <br/>
                        <textarea
                            required
                            value={fdback_message}
                            onChange={(e) => setMessage(e.target.value)}
                            maxLength={90}
                        ></textarea>
                        { !isPending && <button type='submit'>Send</button>}
                        { isPending && <button disabled={true}>Sent</button>}
                    </form>
                </div>

                <div className='feedback-recent'>
                    <h4>Recent Feedback</h4>

                    <div className='feedback-recent-content'>
                        <div>
                            <p className='feedback-name'>By:    {fdback_recent_one.name}</p>
                            <p className='feedback-body'>{fdback_recent_one.message}</p>
                        </div>
                        <div>
                            <p className='feedback-name'>By:    {fdback_recent_two.name}</p>
                            <p className='feedback-body'>{fdback_recent_two.message}</p>
                        </div>
                        <div>
                            <p className='feedback-name'>By:    {fdback_recent_three.name}</p>
                            <p className='feedback-body'>{fdback_recent_three.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Feedback;