import React from 'react'
import HomestayFilter from './HomestayFilter';
import HomestayList from './HomestayList';

const HomeStays = ({ searchQuery }) => {
  return (
    <div>
      Hello from HomeStays container
      <HomestayFilter />
      <HomestayList searchQuery={searchQuery} />
    </div>
  )
}

export default HomeStays
