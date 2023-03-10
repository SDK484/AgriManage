import React, { Component } from 'react';
import AppBar from "./AppBar";
import AppMap from "./AppMap";

class App extends Component {
    constructor(props) {
		super(props);
    }

    render() {
        return (
            <div>
                <AppBar />
                <AppMap />
            </div>
        );
    }
}

export default App;