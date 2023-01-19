import React from 'react';
import { Link } from 'react-router-dom';

interface AllDataByVin {
    Count: number
    Message: string
    Results: InfoByVin[]
    SearchCriteria: string
}

interface InfoByVin {
    Value: string | null
    ValueId: string | null
    Variable: string | null
    VariableId: number
}

interface Variable {
    DataType: string
    Description: string
    GroupName: string
    ID: number
    Name: string
}

interface IState {
    allVariables: Variable[] | null
}
class VariablesList extends React.Component {

    public state: IState = {
        allVariables: null,
    }

    componentDidMount(): void {
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

    render() {
        return (
            <div>
                <Link to='/'> VariablesList</Link>
                {
                    (this.state.allVariables) ?
                        this.state.allVariables.map(m => {

                            return (
                                <div style={{ padding: 20, display: 'flex', border: 'solid', borderWidth: 1 }}>
                                    <Link key={m.ID} to={`/variables/${m.ID}`} state={{ variable: m }} >
                                        <div>{m.Name}: </div>
                                    </Link>
                                    <div>{m.GroupName}: </div>
                                    <div style={{ marginLeft: 10 }}>{m.Description}</div>

                                </div>
                            )
                        })
                        : null
                }
            </div>
        )
    }

}
export default VariablesList