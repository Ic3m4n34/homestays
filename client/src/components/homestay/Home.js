import React, {  useEffect }  from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  { Spinner } from '../layout/Spinner';
import { getHomestays } from '../../actions/homestay';
// import  ProfileItem  from './ProfileItem';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Hero from './Hero';
import Banner from './Banner';
import {Link} from 'react-router-dom';
import Services from './Services';
import SingleHomeStay from './SingleHomeStay';
import Title from './Title';

const  Home = ({ getHomestays, homestay: { homestays,featuredhomestays:featured,loading } }) => {
  useEffect(() => {
    getHomestays();  
  }, [getHomestays]);
    
  return (
    
  <>
  <Hero>
    <Banner title="Luxurious HomeStays in Devbhoomi Uttarakhand"
            subtitle="Deluxe stay start at R1500">
           <Link to='/homestays' className="btn btn-primary">
             Our Home Stays
           </Link>
              </Banner> 
  </Hero>
  <Services />
  <section className="featured-rooms">
             <div className='profiles'>
                 <Title title="featured-rooms" />
                 <div className="row">
                 {featured.length > 0 ? (
                   featured.map(homestay => (
                <div className="col-md-4 featured-responsive">
                <SingleHomeStay key={homestay._id} homestay={homestay} />
                </div>
                    ))
               ) : (
              <h4>No Featured homestays found...</h4>
                  )}
           </div>
       </div> 
      </section> 
  </>
)
}

Home.propTypes = {
  getHomestays: PropTypes.func.isRequired,
  homestay: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  homestay: state.homestay
});
export default connect(
  mapStateToProps,
  { getHomestays }
)(Home);

