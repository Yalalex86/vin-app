import React from 'react';
import { Link } from 'react-router-dom';
import { AllDataByVin, VehicleVariable } from '../shared/vinAppTypes';
import './VehicleVariablesList.css'

interface IState {
    vehicleVariables: VehicleVariable[] | null
}

class VariablesList extends React.Component {

    public state: IState = {
        vehicleVariables: null,
    }

    componentDidMount(): void {
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`)
            .then(res => res.json())
            .then(
                (result: AllDataByVin) => {
                    this.setState({ vehicleVariables: result.Results })
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    componentDidUpdate(): void {

        if (this.state.vehicleVariables) {
            this.state.vehicleVariables.map((m) => {
                const elem = document.getElementById(`${m.ID}`)

                if (elem) {
                    elem.innerHTML = m.Description
                }

            })
        }
    }

    render() {

        return (
            <>
                <header className='va--vehicle-variables--header'>
                    <div >
                        Vehicle Variables
                    </div>
                    <div style={{ position: 'absolute', left: 20, fontSize: 12 }}>
                        <Link to='/' >Go back</Link>
                    </div>
                </header>
                <body>
                    {
                        (this.state.vehicleVariables) ?
                            this.state.vehicleVariables.map(m => {

                                return (
                                    <div className='va--vehicle-variables--variable'>
                                        <Link style={{ width: '30%' }} key={m.ID} to={`/variables/${m.ID}`} state={{ variable: m }} >
                                            <div>
                                                {m.Name}:
                                            </div>
                                        </Link>
                                        <div id={`${m.ID}`} style={{ marginLeft: 10, width: '70%' }}>
                                            {m.Description}
                                        </div>
                                    </div>
                                )
                            })
                            : null
                    }
                </body>
            </>

        )
    }
}

export default VariablesList