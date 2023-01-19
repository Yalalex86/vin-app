import { Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Variable from './pages/Variable'
import VehicleVariablesList from './pages/VehicleVariablesList';

class App extends React.Component {

    render() {
        return (
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/variables' element={<VehicleVariablesList />} />
                <Route path='/variables/:id' element={<Variable />} />
            </Routes>

        )
    }
}

export default App

