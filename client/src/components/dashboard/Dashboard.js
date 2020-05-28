import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { getCurrentHomestay } from '../../actions/homestay';
import  { Spinner }  from '../layout/Spinner';
import  DashboardActions  from './DashboardActions';

const Dashboard = ({ 
    getCurrentProfile,
    getCurrentHomestay,
    auth: { user }, 
    homestay: {homestay},
    profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile()
        getCurrentHomestay()
    })
    
    
    return loading && profile === null ? <Spinner /> : <Fragment>
       
        <h1 className='large text-primary' >Dashboard</h1>
        <p className='lead'>
        <i className='fas fa-user'></i>Welcome { user && user.name}/</p>
        
        { profile !== null ? (
            <Fragment>
                <DashboardActions />
            </Fragment>
        ) : (
            <Fragment>
                <p>You have not setup any Product details,Please add some Info </p>
                <Link to='/create-profile' className='btn btn-primary my-1'>
                Create Profile 
                </Link> 
            </Fragment>
        )}

        { homestay !== null ? (      
            <>
            <Fragment>    
                <p>Edit Your Homestay details</p>
                  <Link to='/Edit-homestay' className='btn btn-primary my-1'>
                    Edit Homestay
                     </Link>
            </Fragment> 
            </>      
            ) : (
                    <Fragment>    
                        <p>You have not setup any Homestay details,Please add some Info </p>
                        <Link to='/create-homestay' className='btn btn-primary my-1'>
                        Create Homestay
                        </Link>
                    </Fragment> 
        )}
           
    </Fragment>
    
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getCurrentHomestay: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    homestay: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    homestay: state.homestay
})

export default connect(mapStateToProps, { getCurrentProfile, getCurrentHomestay })(Dashboard);
