import React, {  useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getHomestays } from '../../actions/homestay';

const initialState = {
    type: '',
    capacity: '',
    price: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    breakfast: '',
    pat: '',
    searchPhrase: '',
    // sortedhomestays: [],
};

const HomeStayList = ({
    getHomestays,
    homestay: {
      homestays,
      capacity,
      sortedhomestays,
      loading
    }
  }) => {
  const [ filteredHomestays, filterHomestays ] = useState([]);
  const setFilteredHomestays = (homestays) => {
    filterHomestays(homestays);
  }

  useEffect(() => {
    if (homestays.length < 1) getHomestays();
    setFilteredHomestays(homestays);
  }, [homestays]);


  // homestay list-items
  const listItems = filteredHomestays.map((homestay) =>
    <li key={homestay._id}>
      {homestay.name}
    </li>
  );

  // search
  const searchHomestay = (phrase) => {
      const filteredHomestays = homestays.filter(homestay => homestay.name.toLowerCase().includes(phrase.toLowerCase()));
      setFilteredHomestays(filteredHomestays);
  }

  return (
    <div>
      <div className="homestay-list__search">
        <input
          type="text"
          placeholder="Search Homestay"
          onChange={event => searchHomestay(event.target.value)} />
      </div>
      <ul className="homestay-list">
        {listItems}
      </ul>
    </div>
  )
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
