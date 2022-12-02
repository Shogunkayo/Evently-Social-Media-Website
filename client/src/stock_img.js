const ImgPopup = (props) => {
    return (props.trigger) ? ( 
        <div className='image-popup-outer'>
            <div className='image-popup-body'>
                <img src="https://img.icons8.com/plasticine/100/null/close-window.png" className='close-btn' onClick = {()=>{
                    props.setTrigger(false);
                }} alt = "close"/>
                {props.children}
            </div>
        </div>
    ) : '';
}
 
export default ImgPopup;