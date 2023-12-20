import React, { useEffect, useState } from 'react'

export default function TheForm({ text, setText, setAnalysis }) {
    const handleChange = (event) => {
        setText(event.target.value)
    }
    const performAnalysis = (event) => {
        event.preventDefault(); // prevent reload when submit
        setAnalysis(true)
    }

    // const [err,setErr] = useState(false)
    const [numCols, setNumCols] = useState(12)

    useEffect(() => {
        const colsCheck = () => {
            window.innerWidth < 450 ? setNumCols(10) : setNumCols(12);
        };

        colsCheck();
        window.addEventListener('resize', colsCheck);

        return () => {
            window.removeEventListener('resize', colsCheck);
        };
    }, []);

    // const checkErr = (text) => {
    //     if(text.length === 0) {
    //         setErr(true)
    //     }
    //     else {
    //         setErr(false);
    //         performAnalysis();
    //     }
    // }

    return (
        <div>
            <form onSubmit={performAnalysis}>
                <div className='row justify-content-center'>
                    <div className='col-auto text-center'>
                        <label className='form-label'>Type something to start the sentiment analysis.</label>
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className={`col-${numCols} text-center`}>
                        <input type='text' className='inputtext form-control my-2' placeholder='Share your thoughts...' value={text} onChange={handleChange}></input>
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className='col-auto text-center'>
                        <button type='submit' className='btn btn-primary text-uppercase fs-6'>Analysis</button>
                    </div>
                </div>
            </form>
        </div>
    )
}