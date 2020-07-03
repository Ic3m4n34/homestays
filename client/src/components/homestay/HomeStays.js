import React from 'react'
import Hero from './Hero';
import Banner from './Banner';
import { Link } from  'react-router-dom';
import HomestayContainer from './HomestayContainer';


const HomeStays = ({ match }) => {
  let searchQuery = {};

  if (match.params.searchQuery) {
    if (match.params.searchQuery.includes(',')) {
      searchQuery.queryCoordinates = match.params.searchQuery.split(',').map(coord => parseFloat(coord));
    } else {
      searchQuery.cityName = match.params.searchQuery;
    }
  }

  return (
  <>
    <Hero>
      <Banner title="Our Homestays">
        <Link to= "/" className="btn-primary">
          return Home
        </Link>
      </Banner>
    </Hero>
    <HomestayContainer searchQuery={searchQuery}></HomestayContainer>
  </>
  )
}

export default HomeStays
