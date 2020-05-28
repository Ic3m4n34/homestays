import React from 'react'
import Hero from './Hero';
import Banner from './Banner';
import { Link } from  'react-router-dom';
import HomestayContainer from './HomestayContainer';


const HomeStays = () => {
  return (
  <>  
    <Hero>
      <Banner title="Our Homestays">
        <Link to= "/" className="btn-primary">
          return Home
        </Link>
      </Banner>
    </Hero>
    <HomestayContainer></HomestayContainer>
  </>  
  )
}

export default HomeStays
