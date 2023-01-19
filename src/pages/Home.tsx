import { Routes, Route, Link } from 'react-router-dom';
import React from 'react';
interface IState {
    vin: string
    dataByVin: InfoByVin[] | null
    allVariables: Variable[] | null
}

interface Variable {
    DataType: string
    Description: string
    GroupName: string
    ID: number
    Name: string
}
interface InfoByVin {
    Value: string | null
    ValueId: string | null
    Variable: string | null
    VariableId: number
}

interface AllDataByVin {
    Count: number
    Message: string
    Results: InfoByVin[]
    SearchCriteria: string
}

class Home extends React.Component {
    public state: IState = {
        vin: '',
        dataByVin: null,
        allVariables: null,
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Vin:
                        <input onChange={this.handleChange} type="text" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <Link to='/variables' >123</Link>
                {
                    (this.state.dataByVin) ?
                        this.state.dataByVin.map(m => {

                            if (!m.Value) {
                                return
                            }

                            return (
                                <div style={{ display: 'flex', border: 'solid', borderWidth: 1 }}>
                                    <div>{m.Variable}: </div>
                                    <div style={{ marginLeft: 10 }}>{m.Value}</div>
                                </div>
                            )
                        })
                        : null
                }
            </div >

        )
    }

    private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ vin: event.target.value })
    }

    private readonly handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault()
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${this.state.vin}?format=json`)
            .then(res => res.json())
            .then(
                (result: AllDataByVin) => {
                    this.setState({ dataByVin: result.Results })
                },
                (error) => {
                    console.log(error)
                }
            )
    }
}

export default Home

