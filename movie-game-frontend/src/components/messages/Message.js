import React from 'react';



export default function Message({setShowMessage, callback, message}) {
    return (
        <div className='d-flex justify-content-center w-75'
            id="repeatGuessMessage"
            style={{ position: "fixed", height: "70px" }}>
            <div className='d-flex flex-column w-50 bg-secondary rounded shadow'>
                <div className='d-flex justify-content-end'>
                    <button type="button" className="btn-close" 
                        onClick={() => {
                            setShowMessage(false);
                            callback();
                        }}
                    ></button>
                </div>
                <div className='d-flex justify-content-center align-items-center text-white text-center fw-bold'>
                    {message}
                </div>
            </div>
        </div>
    )
}
