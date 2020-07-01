import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../../actions/auth';
import { Logo } from './logo';

export const Navbar = ({ auth: { isAuthenticated, loading},logout }) => {
    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">Artisans</Link>
            </li>
            <li><Link to="/dashboard">
                <i className='fas fa-user' /> { ' '}
                <span className='hide-sm'>Dashboard</span>
             </Link>
            </li>
            <li>
            <a  onClick={ logout }  href="#!">
                <i className='fas fa-sign-out-alt' /> { ' '}
                <span className='hide-sm'>Logout</span>
            </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/homestay">Homestay</Link></li>
            <li><Link to="/profiles">Artisans</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    return (
    <nav className="navbar bg-dark">
        <h1>
           <Link to="/">
               <i><Logo />Artisans Portal</i>
           </Link>
        </h1>
        <button
		type='button'
        className='btn btn-light'
        onClick={() => toggleSocialInputs(!displaySocialInputs)}
		>
        <i className="fa fa-align-right" aria-hidden="true"></i>
        </button>
        { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
    </nav>
    );
};
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect (
    mapStateToProps,
    { logout }
    )(Navbar);
