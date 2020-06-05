import React, {  useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getHomestays } from '../../actions/homestay';

/* const initialState = {
    type: '',
    capacity: '',
    price: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    breakfast: '',
    pat: '',
    sortedhomestays: []
}; */


const HomeStayList = ({
    getHomestays,
    homestay: {
      homestays,
      capacity,
      sortedhomestays,
      loading
    }
  }) => {
  useEffect(() => {
    getHomestays();
  }, [getHomestays]);

  console.log('homestays', homestays);

  // homestay list-items
  const listItems = homestays.map((homestay) =>
    <li key={homestay._id}>
      {homestay.name}
    </li>
  );

  return (
    <div>
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
