import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export const Landing = ({ isAuthenticated }) => {
    if(isAuthenticated) {
        return<Redirect to='/dashboard'/>
    }
    return (
        <section className="landing">
        <div className="dark-overlay">
            <div className="landing-inner">
                <h1 className="x-large">Artisan Connect</h1>
                <p className="lead">
                    Create Artisans profile/portfolio, share products and 
                    get help from other artisans
                </p>
                <div className="buttons">
                    <Link to="/register" className="btn btn-primary">Signup</Link>
                    <Link to="/login" className="btn btn-light">Login</Link>
                    <Link to="/profiles" className="btn btn-light">Artisans</Link>
                    <Link to="/search"className="btn btn-light">Search</Link>
                </div>
            </div>
        </div>
    </section>
    )
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}
const mapStatetoProps = state => ({ 
    isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStatetoProps)(Landing);
