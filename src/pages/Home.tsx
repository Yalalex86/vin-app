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
        console.log(this.state.allVariables)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Vin:
                        <input onChange={this.handleChange} type="text" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <button onClick={this.getAllVariablesHandler} >Variables</button>
                {
                    (this.state.allVariables) ?
                        this.state.allVariables.map(m => {

                            return (
                                <div style={{ display: 'flex', border: 'solid', borderWidth: 1 }}>
                                    <div onClick={() => this.onVariableClickHandler(m)}>{m.GroupName}: </div>
                                    <div>{m.Name}: </div>
                                    <div style={{ marginLeft: 10 }}>{m.Description}</div>
                                </div>
                            )
                        })
                        : null
                }
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

    private readonly onVariableClickHandler = (variable: Variable) => {
        console.log(variable.ID)
        alert(variable.Description)
    }

    private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ vin: event.target.value })
    }

    private readonly getAllVariablesHandler = () => {
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`)
            .then(res => res.json())
            .then(
                (result: AllDataByVin) => {
                    this.setState({ allVariables: result.Results })
                },
                (error) => {
                    console.log(error)
                }
            )
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

