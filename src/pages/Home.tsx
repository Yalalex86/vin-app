import { Link } from 'react-router-dom';
import React from 'react';
import { Result, AllDataByVin } from '../shared/vinAppTypes';
import './Home.css';

interface IState {
    vin: string
    currentVin: string | null
    vinHistory: string[]
    results: Result[] | null
    emptyFieldError: boolean
    message: string | null
}

class Home extends React.Component {

    public state: IState = {
        vin: '',
        currentVin: null,
        vinHistory: [],
        results: null,
        emptyFieldError: false,
        message: null
    }

    render() {
        return (
            <>
                <header className='va--home--header'>
                    <div >VIN decoder</div>
                    <div className='va--home-header--button'>
                        <Link to='/variables' >Variables</Link>
                    </div>
                </header>

                <body className='va--home--body'>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input style={{ width: 150 }} maxLength={17} placeholder='Enter VIN' onChange={this.handleChange} type="text" value={this.state.vin} />
                        </label>
                        <input style={{ width: 70 }} type="submit" value="Submit" />
                    </form>

                    {this.state.emptyFieldError ?
                        <div>
                            Enter a Vehicle Identification Number, please
                        </div>
                        : null}

                    {(this.state.vinHistory.length !== 0) ?
                        <>
                            <div style={{ fontSize: 12, marginTop: 10 }}>
                                Vin history:
                            </div>
                            <div className='va--home--vin-history'>
                                {this.state.vinHistory.reverse().map((vin, i) =>
                                    <div key={i} style={{ cursor: 'pointer' }} onClick={
                                        () => {
                                            this.getDataByVin(vin)
                                            this.setState({ currentVin: vin })
                                        }
                                    }>
                                        {vin}
                                    </div>)}
                            </div>
                        </>
                        : null
                    }

                    {this.state.message ?
                        <div style={{ marginTop: 20, fontSize: 10, }}>
                            {this.state.message}
                        </div>
                        : null}

                    {this.state.currentVin ?
                        <h2>
                            {this.state.currentVin}
                        </h2>
                        : null}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {
                            (this.state.results) ?
                                this.state.results.map(m => {

                                    if (!m.Value) {
                                        return
                                    }

                                    return (
                                        <div className='va--home--variables'>
                                            <div style={{ width: '40%' }}>
                                                {m.Variable}:
                                            </div>
                                            <div style={{ marginLeft: 10, width: '60%', textAlign: 'right' }}>
                                                {m.Value}
                                            </div>
                                        </div>
                                    )
                                })
                                : null
                        }
                    </div>
                </body >
            </>

        )
    }

    private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {

        const re = /^[A-Za-z0-9]+$/

        if (event.target.value === "" || re.test(event.target.value)) {
            this.setState({ vin: event.target.value, emptyFieldError: false })
        }
    }

    private readonly getDataByVin = (vin: string): void => {
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`)
            .then(res => res.json())
            .then(
                (result: AllDataByVin) => {
                    this.setState({ results: result.Results, message: result.Message })
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    private readonly handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault()

        if (this.state.vin === '') {
            this.setState({ emptyFieldError: true })
            return
        }

        const vin = this.state.vin

        this.setState(() => {
            const newVinHistory = [...this.state.vinHistory, vin]
            if (newVinHistory.length > 5) {
                newVinHistory.shift()
            }
            if (vin === this.state.vinHistory[this.state.vinHistory.length - 1]) {
                return {}
            }
            return { vinHistory: newVinHistory, currentVin: vin, vin: '' }
        }
        )
        this.getDataByVin(vin)

    }
}

export default Home

