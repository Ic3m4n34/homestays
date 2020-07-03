import React, {  useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getHomestays } from '../../actions/homestay';
import HomestayMap from './HomestayMap';

const HomeStayList = ({
    getHomestays,
    homestay: {
      homestays,
      sortedhomestays,
      loading
    },
    queryCoordinates,
  }) => {
  // state
  const [filteredHomestays, setFilteredHomestays] = useState([]);
  const [locationFilteredHomestays, setLocationFilteredHomestays] = useState([]);

  // selected room type
  let [selectedType, setSelectedType] = useState('all');

  // room types
  const [types, setTypes] = useState([]);

  // selected capacity
  const [selectedCapacity, setSelectedCapacity] = useState(null);

  // capacities
  let [capacities, setCapacities] = useState(null);

  // set search phrase
  const [searchPhraseName, setSearchPhraseName] = useState('');
  const [searchPhraseCity, setSearchPhraseCity] = useState('');

  // show loader
  const [showLoader, setShowLoader] = useState(false);

  // user position
  const [mapPosition, setMapPosition] = useState(queryCoordinates);
  const [userPosition, setUserPosition] = useState(queryCoordinates);

  // state end

  // get all unique values
  const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
  };

  useEffect(() => {
    if (homestays.length < 1) {
      getHomestays();
    } else {
      const locationFilteredHomestays = homestays.filter(homestay => getDistanceFromLatLonInKm(userPosition[0], userPosition[1], homestay.homestayPosition[0], homestay.homestayPosition[1]) < 20);

      setLocationFilteredHomestays(locationFilteredHomestays);
    }
    // get types + add all + map to jsx and state
    let uniqueTypes = getUnique(homestays, 'type');
    uniqueTypes = ['all', ...uniqueTypes];

    const mappedUniqueTypes = uniqueTypes.map((item, i) => {
      return (
      <option value={item} key={i}>{item}</option>
      );
    });

    setTypes(mappedUniqueTypes);

    // get capacities
    capacities = getUnique(homestays, 'capacity');
    capacities = [0, ...capacities];

    capacities = capacities.map((item, i) => {
      if (item === 0) {
        return (
          <option value={0} key={i}>Select Capacity</option>
        );
      }
      return (
        <option value={item} key={i}>{item}</option>
      );
    });

    setCapacities(capacities);

  }, [homestays]);

  const handleChange = (e) => {
    e.preventDefault();
    // const id = e.target.id;
    const name = e.target.name;
    const value = e.target.value;
    const isSearchName = e.target.id === 'searchname';
    // const isSearchCity = e.target.id === 'searchcity';

    if (name === 'type') {
      setSelectedType(value);
    }
    if (name === 'capacity' && value !== 0) {
      setSelectedCapacity(parseInt(value));
    }
    if (isSearchName) {
      setSearchPhraseName(value);
    }
    /* if (isSearchCity) {
      setSearchPhraseCity(value);
    } */
    /* if (id === 'gpslookup') {
      setSearchPhraseCity('');
      getCurrentPosition();
    } */
  }

  useEffect(() => {
    let tempHomestays = [...locationFilteredHomestays];
    console.log('temp', tempHomestays);

    /* if (userPosition) {
      console.log('up', userPosition);
      tempHomestays = tempHomestays.filter(homestay => getDistanceFromLatLonInKm(userPosition[0], userPosition[1], homestay.homestayPosition[0], homestay.homestayPosition[1]) < 20);
      console.log('temp', tempHomestays);
    }

    if (searchPhraseCity.length > 2) {
      tempHomestays = [...homestays];
      tempHomestays = tempHomestays.filter(homestay => homestay.city.toLowerCase().includes(searchPhraseCity.toLowerCase()));
    } */

    if (selectedType !== 'all') {
      tempHomestays = tempHomestays.filter(homestay => homestay.type === selectedType);
    }

    if (selectedCapacity !==  null) {
      tempHomestays = tempHomestays.filter(homestay => homestay.capacity === selectedCapacity);
    }

    if (searchPhraseName.length > 2) {
      tempHomestays = tempHomestays.filter(homestay => homestay.name.toLowerCase().includes(searchPhraseName.toLowerCase()));
    }

    setFilteredHomestays(tempHomestays);
  }, [selectedType, selectedCapacity, searchPhraseName, locationFilteredHomestays]);

  // homestay list-items
  const listItems = filteredHomestays.map((homestay) =>
    <li key={homestay._id}>
      {homestay.name}
      <span className="homestay-list__show-on-map" onClick={() => setMapPosition(homestay.homestayPosition)}>show on map</span>
    </li>
  );

  // get current position
  const getCurrentPosition = () => {
    setShowLoader(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setMapPosition([position.coords.latitude, position.coords.longitude])
      setUserPosition([position.coords.latitude, position.coords.longitude])
      setShowLoader(false);
    });
  };

  // calculate distance
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  return (
    <div>
      <div className="filter-container">
        <div className="homestay-list__location-search">
          <form className="form-group">
            <button onClick={(event) => handleChange(event)} className="geolocation__lookup" id="gpslookup">
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
                value={searchPhraseCity}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>
        </div>
        <div className="homestay-list__searchboxes">
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
        </div>
        <form className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={selectedType}
            className="form-control"
            onChange={handleChange}
          >
            {types}
          </select>
        </form>
        <form className="form-group">
          <label htmlFor="type">capacity</label>
          <select
            name="capacity"
            id="capacity"
            value={selectedCapacity}
            className="form-control"
            onChange={handleChange}
          >
            {capacities}
          </select>
        </form>
      </div>
      <div className="homestay-list__map-list-container">
        <ul className="homestay-list">{listItems}</ul>
        <HomestayMap
          position={mapPosition}
          userPosition={userPosition}
          homestaysOnMap={filteredHomestays}
        />
      </div>
    </div>
  );
};

HomeStayList.propTypes = {
  getHomestays: PropTypes.func.isRequired,
  homestay: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  homestay: state.homestay
});
export default connect(
  mapStateToProps, {
    getHomestays
  }
)(HomeStayList);
