import React from 'react'
import HomestayFilter from './HomestayFilter';
import HomestayList from './HomestayList';

const HomeStays = ({ queryCoordinates }) => {
  return (
    <div>
      Hello from HomeStays container
      <HomestayFilter />
      <HomestayList queryCoordinates={queryCoordinates} />
    </div>
  )
}

export default HomeStays
