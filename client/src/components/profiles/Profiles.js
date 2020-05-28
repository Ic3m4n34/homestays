import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  { Spinner } from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import  ProfileItem  from './ProfileItem';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
      getProfiles();
    }, [getProfiles]);

    return (
      <Fragment>
        {loading ? ( <Spinner />) : 
        (  <Fragment>
            <section className="slider d-flex align-items-center">        
             <div className="container">
               <div className="row d-flex justify-content-center">       
                      <div className="col-md-12">
                        <div className="slider-title_box">
                           <div className="row">
                             <div className="col-md-12">
                                   <div className="slider-content_wrap">
                                        <h1>Discover great places in Himalayas</h1>
                                          <h5>Let's uncover the best places to shop and visit near you!</h5>                                                </div>
                                    </div>
                                </div>     
                            </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-10">
                                <form className="form-wrap mt-4">
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <input type="text" placeholder="What are your looking for?" className="btn-group1" />
                                        <input 
                                        type="text" 
                                        name="query" 
                                        placeholder="New york" 
                                        className="btn-group2"
                                        
                                         />
                                        <button 
                                        type="submit" 
                                        
                                        className="btn-form"><span 
                                        className="icon-magnifier search-icon">
                                        </span>SEARCH<i 
                                        className="pe-7s-angle-right">
                                        </i>
                                        </button>
                                    </div>
                                </form>
                                <div className="slider-link">
                                    <a href="www.samaun.com">Browse Popular</a><span>or</span> <a href="www.samaun.com">Recently Added</a>
                                </div>
                            </div>
                        </div>                          
                        </div>
                </div>  
              </div>         
        </section>          
            <h1 className='large text-primary'>Artisans</h1>
                <section className="main-block light-bg">
                     <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                                <div className="styled-heading">
                                    <h3>Featured Artists of the month</h3>
                                </div>
                            </div>
                        </div>      
                            <div className='profiles'>
                                <div className="row">
                                {profiles.length > 0 ? (
                                  profiles.map(profile => (
                                    <div className="col-md-4 featured-responsive">
                                    <ProfileItem key={profile._id} profile={profile} />
                                </div>
                                     ))
                                     ) : (
                                     <h4>No profiles found...</h4>
                                   )}
                        </div>
                      </div>  
                    </div>  
                </section>
                 
    <footer className="main-block dark-bg">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="copyright">
                            
                            <p>Copyright &copy; 2020 Listing. All rights reserved </p>
                            
                            <ul>
                                <li><a href="www.facebook.com"><span className="fab fa-facebook fa-1x"></span></a></li>
                                <li><a href="www.twitter.com"><span className="fab fa-twitter fa-1x"></span></a></li>
                                <li><a href="www.instagram.com"><span className="fab fa-instagram fa-1x"></span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
                                             

          </Fragment>
        )}
      </Fragment>
    );
  };
  
  Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile
  });
  
  export default connect(
    mapStateToProps,
    { getProfiles }
  )(Profiles);
  