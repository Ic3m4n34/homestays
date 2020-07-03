import React from 'react'
import Hero from './Hero';
import Banner from './Banner';
import { Link } from  'react-router-dom';
import HomestayContainer from './HomestayContainer';


const HomeStays = ({ match, location }) => {
  const queryCoordinates = match.params.userCoords.split(',').map(coord => parseFloat(coord));

  return (
  <>
    <Hero>
      <Banner title="Our Homestays">
        <Link to= "/" className="btn-primary">
          return Home
        </Link>
      </Banner>
    </Hero>
    <HomestayContainer queryCoordinates={queryCoordinates}></HomestayContainer>
  </>
  )
}

export default HomeStays
