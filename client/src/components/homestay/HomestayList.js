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
  const [searchPhrase, setSearchPhrase] = useState('');

  // user position
  const [userPositon, setUserPositon] = useState([40.730610, -73.935242]);

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
    // const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;
    const isSearch = e.target.id === 'searchname';

    if (name === 'type') {
      setSelectedType(value);
    }
    if (name === 'capacity' && value !== 0) {
      setSelectedCapacity(parseInt(value));
    }
    if (isSearch) {
      setSearchPhrase(value);
    }
  }

  useEffect(() => {
    let tempHomestays = [...homestays];
    console.log('temp#####', tempHomestays);

    if (selectedType !== 'all') {
      tempHomestays = tempHomestays.filter(homestay => homestay.type === selectedType);
    }


    console.log('selectedCapacity', selectedCapacity !== null);
    if (selectedCapacity !==  null) {
      console.log('filter', selectedCapacity);
      tempHomestays = tempHomestays.filter(homestay => homestay.capacity === selectedCapacity);
    }

    if (searchPhrase.length > 2) {
      console.log('phrase', searchPhrase);
      console.log('temp', tempHomestays);
      tempHomestays = tempHomestays.filter(homestay => homestay.name.toLowerCase().includes(searchPhrase.toLowerCase()));
    }

    setFilteredHomestays(tempHomestays);
  }, [selectedType, selectedCapacity, searchPhrase]);

  // homestay list-items
  const listItems = filteredHomestays.map((homestay) =>
    <li key={homestay._id}>
      {homestay.name}
    </li>
  );

  // get current position
  const getCurrentPosition = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((position) => {
      setUserPositon([position.coords.latitude, position.coords.longitude])
    });
  };

  return (
    <div>
      <div className="filter-container">
        <form className="form-group">
          <button onClick={getCurrentPosition} className="geolocation__lookup">
            Use GPS
          </button>
        </form>
        <form className="form-group">
          <div className="homestay-list__search">
            <input
              id="searchname"
              type="text"
              placeholder="Search Homestay"
              onChange={(event) => handleChange(event)}
            />
          </div>
        </form>
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
          position={userPositon}
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
