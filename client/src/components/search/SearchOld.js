import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  { Spinner } from '../layout/Spinner';
import { searchProfile } from '../../actions/search';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Search = ({ searchProfile, search: { search, loading }, match }) => {
    
    const [formData, setFormData ] = useState({
      query: '',
      productcat : '',
      product: '',
      company: '',
      address: '',
      email: ''
      });
    
    const  { query, productcat, product, comapny, address, email} = formData;

    const searchHandler = async (event) => {
    
      setFormData({
       ...formData,
       query: event.target.value,
      });
      console.log('formData is ', formData);
    };

  const submitHandler = async(event) => {
    event.preventDefault();
    
  const searchData = formData.query;
  console.log('searchData in submit Handler', searchData);

        useEffect(() => {
            searchProfile(match.params.searchData);
        }, [searchProfile, match.params.searchData]);

    //searchProfile(formData);
  
 /*   try {
    const response = await axios.get('/api/search/search/${searchData}');
  
     console.log('repsonse: ', response.data);
    } catch(err) {
        console.log(err.response.data);
    }
    
   */ 
  }
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
                                        onChange={event => searchHandler(event)}
                                         />
                                        <button 
                                        type="submit" 
                                        onClick={event => submitHandler(event)}
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
                                {search.length > 0 ? (
                                  search.map(profile => (
                                        <div className="col-md-4 featured-responsive">
                                          
                                              <h1>NAME: Artisan</h1>
                                              <p>Company : {search.comapny}</p>
                                              <p>Products :{search.product} </p>
                                              <p>Product Category: {search.productcat}</p>
                                              <p>Address : {search.address}</p>
                                              <p>Email : {search.email}</p>
                           
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
  
  Search.propTypes = {
    searchProfile: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    search: state.profile
  });
  
  export default connect(
    mapStateToProps,
    { searchProfile }
  )(Search);
  