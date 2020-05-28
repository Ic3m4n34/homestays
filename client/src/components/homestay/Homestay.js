import React, { Fragment, useEffect, useLayoutEffect }from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Spinner} from '../layout/Spinner';
import { getHomestayById } from '../../actions/homestay';
import defaultBcg from '../../img/images/defaultBcg.jpeg';
import Hero from '../../components/homestay/Hero';
import Banner from '../../components/homestay/Banner';

const Homestay = ({ getHomestayById, homestay: { homestay,loading}, auth,match }) => {
    useEffect(()=> {
        getHomestayById(match.params.id);
    }, [getHomestayById, match.params.id]);

    return (
      <>     
          <Hero>
              <Banner title= "Homestays in Uttarakhand">
              <Link to ='/Homestays' className = 'btn btn-light'>
                    Back to All Homestays
                    </Link>
              </Banner>
          </Hero>  
        <Fragment>
            { homestay === null || loading ? <Spinner /> :<Fragment>     
            <section className="single-room">
                <div className="single-room-images">
                    {homestay.file.map((item, index)=> (
                        <img key={index} src={'/' + item} alt={homestay.name} />
                    ))}
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>Details</h3>
                        <p>{homestay.description}</p>
                    </article>  
                    <article className="info">
                        <h3>Info</h3> 
                        <h6>price: INR {homestay.price}</h6>
                        <h6>capacity: {" "}
                        {homestay.capacity>1 ? `${homestay.capacity} people`:
                        `${homestay.capacity} person`}
                        </h6>
                        <h6>Pets Allowed</h6>
                        <h6>Free Breakfast Included</h6>
                        </article> 
                </div>   
                <div className="room-extras">
                    <article className="extras">
                       <h3>Extras</h3> 
                        <h6>{homestay.extras}</h6>
                    </article>
                </div>
          </section>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === homestay.user._id
            && (<Link to='/edit-homestay' className='btn btn-dark' >
            Edit Homestay
            </Link>)
            }
                </Fragment>
                }

        </Fragment>
    </>
    )    
}

Homestay.propTypes = {
    getHomestayById: PropTypes.func.isRequired,
    homestay: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    homestay: state.homestay,
    auth: state.auth
})

export default connect(mapStateToProps, { getHomestayById })(Homestay)
