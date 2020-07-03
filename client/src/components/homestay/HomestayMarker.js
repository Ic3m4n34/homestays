import React from 'react'

const HomestayMarker = ({ price }) => {
  console.log('price', price);
  return (
    <div className="homestay-marker">
      <span>{price}</span>
    </div>
  )
}

export default HomestayMarker;
