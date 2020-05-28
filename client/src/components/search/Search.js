import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchProfile } from '../../actions/search';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const Search = ({ searchProfile, search: {search, loading} }) => { 
    const [formData, setFormData ] = useState({
         _id: '', 
        name: '',
        avatar: '',
        query: '',
        productcat : '',
        product: '',
        company: '',
        address: '',
        email: ''
        });
    
      const  { _id, name, avatar, query, productcat, product, comapny, address, email} = formData;
  // funtcion to get the search query
      const searchHandler = async (event) => {
        setFormData({
         ...formData,
         query: event.target.value,
        });
        console.log('formData is ', formData);
      };
// funtcion to send the search query to backend using Redux
      const submitHandler = async(event) => {
        event.preventDefault();
        const searchData = formData.query;
        console.log('searchData in submit Handler', searchData);
        searchProfile(searchData);
      }
    return (
      <Fragment>
            <section className="slider d-flex align-items-center">        
             <div className="container">
               <div className="row d-flex justify-content-center">       
                      <div className="col-md-12">
                        <div className="slider-title_box">
                           <div className="row">
                             <div className="col-md-12">
                                   <div className="slider-content_wrap">
                                        <h1>You Are on Search Page </h1>
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
            <h1 className='large text-primary'>Search results</h1>
                <section className="main-block light-bg">
                     <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                                <div className="styled-heading">
                                    <h3>Results of your search query</h3>
                                </div>
                            </div>
                        </div>      
                <div className='profiles'>
                        {search.length > 0 ? (
                                  search.map(search => (   
                            <div className="featured-place-wrap">
                            <img src={search.avatar} className="img-fluid" alt=''></img>                       
                                <div className="featured-title-box">
                                        <h3> {search.name} </h3>
                                    <ul>
                                        <li>
                                        <span><i className="fa fa-gavel" aria-hidden="true"></i></span>
                                            <p>{ search.product }</p>
                                        </li>
                                        <li>
                                        <span><i className="fa fa-gift" aria-hidden="true"></i></span>
                                            <p>{ search.productcat }</p>
                                        </li>
                                        <li>
                                        <span><i className="fa fa-gavel" aria-hidden="true"></i></span>
                                            <p>{ search.company }</p>
                                        </li>
                                        <li>
                                        <span><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                                            <p>{ search.address }</p>
                                        </li>
                                        <li><span><i className="fa fa-phone" aria-hidden="true"></i></span>
                                            <p>{ search.phone }</p>
                                        </li>

                                </ul>
                                <Link to={`search/search/${_id}`} className='btn btn-primary'>
                                    View Profile
                                </Link>
                                    <div className="bottom-icons">
                                        <span> <i className="fa fa-heart-o" aria-hidden="true"></i></span>
                                        <span> <i className="fa fa-bookmark-o" aria-hidden="true"></i></span>
                                    </div>  
                        </div> 
                    </div>
                                  ))   
                                    ) : (
                                    <h4>No search results were found...</h4>
                                    )}
                              
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
    );
   };
  
     Search.propTypes = {
        searchProfile: PropTypes.func.isRequired,
        search: PropTypes.object.isRequired
        };     
    const mapStateToProps = state => ({
        search: state.search
        });    
    export default connect(
            mapStateToProps,
                { searchProfile }
            )(Search);
   
  