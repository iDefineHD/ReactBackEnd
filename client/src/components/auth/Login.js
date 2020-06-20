import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'


const Login = (props) => {

const alertContext = useContext(AlertContext)
const authContext = useContext(AuthContext)
const { setAlert } = alertContext
const {login, error, clearErrors, isAuthenticated } = authContext 
const [user, setUser] = useState({
    email: '',
    password: ''
})

useEffect(() => {
    if(isAuthenticated) {
        props.history.push('/')
    }

    if(error === 'Invalid Credentials') {
        setAlert(error, 'danger')
        clearErrors()
    }
    // eslint-disable-next-line
}, [error, isAuthenticated, props.history])

const { email, password} = user

const onChange = (e) => {
    setUser({...user, [e.target.name]:e.target.value})
}

const onSubmit = (e) => {
    e.preventDefault()
    if(email === '' || password === '') {
        setAlert('Please fill in all fields', 'error')
    } else {
       login({
           email, 
           password
       }) 
    }
}

    return (
        <div className="form-container">
            <span className="text-primary">Account Login</span>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Email Address</label>
                        <input type="email" name="email" value={email} onChange={onChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Password</label>
                        <input type="password" name="password" value={password} onChange={onChange} required/>
                    </div>
                    <input type="submit" value="login" className="btn btn-primary btn-block"/>
                </form>
        </div>
    )
}


export default Login
