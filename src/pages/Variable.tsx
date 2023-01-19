import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Variable.css'
const Variable = () => {

    useEffect(() => {
        const elem = document.getElementById('description')
        if (elem) {
            elem.innerHTML = variable.Description
        }
    })

    const location = useLocation()
    const { variable } = location.state

    return (<>
        <header className='va--variable--header '>
            <div>
                {variable.Name}
            </div>
            <div style={{ position: 'absolute', left: 20, fontSize: 12 }}>
                <Link to='/variables' >Go back</Link>
            </div>
        </header>
        <body style={{ padding: '0 50px 0 50px' }}>
            <div style={{ marginTop: 20, fontSize: 30, fontWeight: 'bold' }}>
                {variable.Name}
            </div>
            <div >
                {variable.GroupName}
            </div>
            <p id='description'>
                {variable.Description}
            </p>
        </body>
    </>
    )
}
export default Variable