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
    }
  }) => {
  // state
  const [ filteredHomestays, setFilteredHomestays ] = useState([]);

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
  const [mapPosition, setMapPosition] = useState([40.730610, -73.935242]);
  const [userPosition, setUserPosition] = useState([40.730610, -73.935242]);

  // state end

  // get all unique values
  const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
  };

  useEffect(() => {
    if (homestays.length < 1) {
      getHomestays();
    } else {
      setFilteredHomestays(homestays);
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
    const name = e.target.name;
    const value = e.target.value;
    const isSearchName = e.target.id === 'searchname';
    const isSearchCity = e.target.id === 'searchcity';

    if (name === 'type') {
      setSelectedType(value);
    }
    if (name === 'capacity' && value !== 0) {
      setSelectedCapacity(parseInt(value));
    }
    if (isSearchName) {
      setSearchPhraseName(value);
    }
    if (isSearchCity) {
      setSearchPhraseCity(value);
    }
  }

  useEffect(() => {
    let tempHomestays = [...homestays];

    if (selectedType !== 'all') {
      tempHomestays = tempHomestays.filter(homestay => homestay.type === selectedType);
    }

    if (selectedCapacity !==  null) {
      tempHomestays = tempHomestays.filter(homestay => homestay.capacity === selectedCapacity);
    }

    if (searchPhraseName.length > 2) {
      tempHomestays = tempHomestays.filter(homestay => homestay.name.toLowerCase().includes(searchPhraseName.toLowerCase()));
    }

    if (searchPhraseCity.length > 2) {
      tempHomestays = tempHomestays.filter(homestay => homestay.city.toLowerCase().includes(searchPhraseCity.toLowerCase()));
    }

    setFilteredHomestays(tempHomestays);
  }, [selectedType, selectedCapacity, searchPhraseName, searchPhraseCity]);

  // homestay list-items
  const listItems = filteredHomestays.map((homestay) =>
    <li key={homestay._id}>
      {homestay.name}
      <span className="homestay-list__show-on-map" onClick={() => setMapPosition(homestay.homestayPosition)}>show on map</span>
    </li>
  );

  // get current position
  const getCurrentPosition = (e) => {
    e.preventDefault();
    setShowLoader(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setMapPosition([position.coords.latitude, position.coords.longitude])
      setUserPosition([position.coords.latitude, position.coords.longitude])
      setShowLoader(false);
    });
  };

  return (
    <div>
      <div className="filter-container">
        <form className="form-group">
          <button onClick={getCurrentPosition} className="geolocation__lookup">
            Use GPS
            {
              showLoader ? <div className="gps-loader"></div> : ''
            }
          </button>
        </form>
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
        <form className="form-group">
          <div className="homestay-list__search homestay-list__search--city" >
            <input
              className="homestay-list__search--input"
              id="searchcity"
              type="text"
              placeholder="Search Homestay by city"
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
