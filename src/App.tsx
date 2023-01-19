import { Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Variable from './pages/Variable'
import VariablesList from './pages/VariablesList';

class App extends React.Component {

    render() {
        return (
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/variables' element={<VariablesList />} />
                <Route path='/variables/:id' element={<Variable />} />
            </Routes>

        )
    }
}

export default App

