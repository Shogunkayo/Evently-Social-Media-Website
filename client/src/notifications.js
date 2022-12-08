const Notifications = (props) => {
    return (props.trigger) ? ( 
        <div className='notif-popup-outer'>
            <div className='notif-popup-body'>
                <img src="https://img.icons8.com/plasticine/100/null/close-window.png" className='close-btn' onClick = {()=>{
                    props.setTrigger(false);
                }} alt = "close"/>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    ) : '';
}
 
export default Notifications;