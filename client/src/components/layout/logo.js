import React, { Fragment } from 'react';
import logo from './logo.jpeg';

export const Logo = () => (
    <Fragment>
        <img 
        src={logo}
        style={{width: '150px',margin: 'auto', display: 'block'}}
        alt='Loading...'
      />  
    </Fragment>   
);
