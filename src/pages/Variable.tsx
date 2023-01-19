import React from 'react';
import { useLocation } from 'react-router-dom';

const Variable = () => {

    const location = useLocation()
    const { variable } = location.state
    console.log('variable:', variable)

    return (
        <div>
            <h1> {variable.Name}</h1>
            <p>{variable.Description}</p>

        </div>
    )

}
export default Variable