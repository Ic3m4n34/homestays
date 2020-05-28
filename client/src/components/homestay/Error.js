import React from 'react'
import Hero from './Hero';
import Banner from './Banner';
import {Link} from 'react-router-dom';

export default function Error() {
  return <Hero>
    <Banner title="404" subtitle="Page Not Found">
    <Link to="/homestay" className='btn btn-primary'>
      return Home
    </Link>
    </Banner>

  </Hero>
}
