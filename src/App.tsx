import { Routes, Route, Link } from 'react-router-dom';
import React from 'react';
// import './App.css';
import Home from './pages/Home';
// interface IState {
//     vin: string
//     dataByVin: InfoByVin[] | null
//     allVariables: Variable[] | null
// }

// interface Variable {
//     DataType: string
//     Description: string
//     GroupName: string
//     ID: number
//     Name: string
// }
// interface InfoByVin {
//     Value: string | null
//     ValueId: string | null
//     Variable: string | null
//     VariableId: number
// }

// interface AllDataByVin {
//     Count: number
//     Message: string
//     Results: InfoByVin[]
//     SearchCriteria: string
// }

class App extends React.Component {
    // public state: IState = {
    //     vin: '',
    //     dataByVin: null,
    //     allVariables: null,
    // }

    render() {
        // console.log(this.state.allVariables)
        return (

            <Home />

        )
    }

    // private readonly onVariableClickHandler = (variable: Variable) => {
    //     console.log(variable.ID)
    //     alert(variable.Description)
    // }

    // private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //     this.setState({ vin: event.target.value })
    // }

    // private readonly getAllVariablesHandler = () => {
    //     fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`)
    //         .then(res => res.json())
    //         .then(
    //             (result: AllDataByVin) => {
    //                 this.setState({ allVariables: result.Results })
    //             },
    //             (error) => {
    //                 console.log(error)
    //             }
    //         )
    // }

    // private readonly handleSubmit = (event: React.SyntheticEvent): void => {
    //     event.preventDefault()
    //     fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${this.state.vin}?format=json`)
    //         .then(res => res.json())
    //         .then(
    //             (result: AllDataByVin) => {
    //                 this.setState({ dataByVin: result.Results })
    //             },
    //             (error) => {
    //                 console.log(error)
    //             }
    //         )
    // }
}

export default App

