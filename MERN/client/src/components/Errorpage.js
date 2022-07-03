import React from 'react';
import { NavLink } from 'react-router-dom';

const Errorpage = () => {
    return (
        <>
            <div id='errorpage'>
                <div className='errorpage'> 
                    <div className='errorpage-404'>
                        <p className='txt-404'>404</p>
                    </div>
                    <h2>We are sorry, page not found!</h2>
                    <p className='mb-5'>
                        The page you are looking for might have been removed or temperarily unavailable.
                    </p>
                    <NavLink to='/' className='link'>Back To Homepage</NavLink>
                </div>
            </div>
        </>
    );
}

export default Errorpage;