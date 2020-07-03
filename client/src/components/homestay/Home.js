import React, {  useEffect, useState }  from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHomestays } from '../../actions/homestay';
// import  ProfileItem  from './ProfileItem';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Hero from './Hero';
import Banner from './Banner';
import { Link, useHistory } from 'react-router-dom';
import Services from './Services';
import SingleHomeStay from './SingleHomeStay';
import Title from './Title';

const  Home = ({ getHomestays, homestay: { homestays,featuredhomestays:featured,loading } }) => {
  const [searchPhraseName, setSearchPhraseName] = useState('');
  const [searchPhraseCity, setSearchPhraseCity] = useState('');
  const [filteredHomestays, setFilteredHomestays] = useState([]);
  const history = useHistory();

   // show gps loader
   const [showLoader, setShowLoader] = useState(false);

   // get current position
   const getCurrentPosition = (e) => {
     e.preventDefault();
     setShowLoader(true);
     navigator.geolocation.getCurrentPosition(async (position) => {
      await position;
      history.push(`/homestays/${position.coords.latitude},${position.coords.longitude}`);
      setShowLoader(false);
     });
   };

  useEffect(() => {
    getHomestays();
  }, [getHomestays]);

  useEffect(() => {
    setFilteredHomestays(featured);
  }, [featured]);


  const handleChange = (e) => {
    const value = e.target.value;
    const isSearchName = e.target.id === 'searchname';
    const isSearchCity = e.target.id === 'searchcity';

    if (isSearchName) {
      setSearchPhraseName(value);
    }

    if (isSearchCity) {
      setSearchPhraseCity(value)
    }
  };

  useEffect(() => {
    let tempHomestays = [...featured];

    if (searchPhraseName.length > 2) {
      tempHomestays = tempHomestays.filter(homestay => homestay.name.toLowerCase().includes(searchPhraseName.toLowerCase()));
    }

    setFilteredHomestays(tempHomestays);
  },[searchPhraseName])

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      history.push(`/homestays/${searchPhraseCity}`);
    }
  };

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
  <form className="form-group">
    <div className="homestay-list__search homestay-list__search--name" >
      <input
        className="homestay-list__search--input"
        id="searchname"
        type="text"
        placeholder="Search Homestay by name"
        onChange={(event) => handleChange(event)}
      />
    </div>
  </form>
  <div className="homestay-list__location-search">
    <form className="form-group">
      <button onClick={(event) => getCurrentPosition(event)} className="geolocation__lookup" id="gpslookup">
        Use GPS
        {
          showLoader ? <div className="gps-loader"></div> : ''
        }
      </button>
    </form>
      <div className="form-group">
      <div className="homestay-list__search homestay-list__search--city" >
        <input
          className="homestay-list__search--input"
          id="searchcity"
          type="text"
          placeholder="Search Homestay by city"
          onChange={(event) => handleChange(event)}
          onKeyPress={(event) => handleKeyPress(event)}
        />
      </div>
    </div>
  </div>
  <section className="featured-rooms">
             <div className='profiles'>
                 <Title title="featured-rooms" />
                 <div className="row">
                 {filteredHomestays.length > 0 ? (
                   filteredHomestays.map(homestay => (
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

