import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

 const Navbar = ({title, icon}) => {

    const authContext = useContext(AuthContext)

    const {user} = authContext
    return (
        <div className="navbar bg-primary">
            {user === null ? '' :  <h3> Logged In As: {user.name}</h3>}
            <h1 className={icon}> {title}</h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}

export default Navbar;