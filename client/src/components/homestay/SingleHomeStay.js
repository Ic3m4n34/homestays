import React from 'react'
import Hero from './Hero';
import Banner from './Banner';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const SingleHomeStay = ({
    homestay: {
      user: { _id },
      name,
      price,
      capacity,
      featured,
      description,
		  aminities,
		  extras,
		  file
    }
  }) => {
return (
  <article className = "room">
      <div className="img-container">
        <img  src={file[0] } alt="fileimage" />
       <div className="price-top">
         <h6>₹{price}</h6>  
         <p>per night</p>      
      </div>
      <Link to={`/homestay/${_id}`}  className='btn-primary room-link'>
      View Homestay </Link>
   </div>
   <p className="room-info">{name}</p>
   </article>
);
};

SingleHomeStay.propTypes = {
homestay: PropTypes.object.isRequired
};

export default SingleHomeStay;
