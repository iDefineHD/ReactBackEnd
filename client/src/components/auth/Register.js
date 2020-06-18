import React, { useState, useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'


const Register = () => {
const alertContext = useContext(AlertContext)
const {setAlert} = alertContext
const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
})

const { name, email, password, password2} = user

const onChange = (e) => {
    setUser({...user, [e.target.name]:e.target.value})
}

const onSubmit = (e) => {
    e.preventDefault()
    if(name === '' || email === '' || password === '') {
        setAlert('Please Enter All Fields', 'danger')
    } else if(password !== password2) {
        setAlert('Please Make Sure Your Passwords Match', 'danger')
    } else {
        console.log('Register Submit');
    }
}
    return (
        <div className="form-container">
            <span className="text-primary">Register Account</span>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Email Address</label>
                        <input type="email" name="email" value={email} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Password</label>
                        <input type="password" name="password" value={password} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Confirm Password</label>
                        <input type="password" name="password2" value={password2} onChange={onChange}/>
                    </div>
                    <input type="submit" value="register" className="btn btn-primary btn-block"/>
                </form>
        </div>
    )
}

export default Register
