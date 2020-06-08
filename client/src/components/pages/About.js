import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const About = () => {
    return (
        <div>
            <h1>About This App</h1>
            <p className="py-1"> This is a full stack app for keeping contacts</p>
            <p className=" btn bg-dark"><strong>V0.1</strong></p>
        </div>
    )
}

export default About;