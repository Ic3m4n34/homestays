import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const ProfileItem =  ({
    profile: {
        _id, 
         name, 
         avatar ,
        product,
        company,
        address,    
        phone,
        productcat
    }
}) => {  
    return (      
                <div className="featured-place-wrap">
                    <img src={ avatar } className="img-fluid" alt='#'></img>                       
                        <div className="featured-title-box">
                                <h3> {name} </h3>
                            <ul>
                                <li>
                                <span><i className="fa fa-gavel" aria-hidden="true"></i></span>
                                    <p>{ product }</p>
                                </li>
                                <li>
                                <span><i className="fa fa-gift" aria-hidden="true"></i></span>
                                    <p>{ productcat }</p>
                                </li>
                                <li>
                                <span><i className="fa fa-gavel" aria-hidden="true"></i></span>
                                    <p>{ company }</p>
                                </li>
                                <li>
                                <span><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                                    <p>{ address }</p>
                                </li>
                                <li><span><i className="fa fa-phone" aria-hidden="true"></i></span>
                                    <p>{ phone }</p>
                                </li>

                        </ul>
                        <Link to={`/profile/${_id}`} className='btn btn-primary'>
                            View Profile
                         </Link>
                            <div className="bottom-icons">
                                <span> <i className="fa fa-heart-o" aria-hidden="true"></i></span>
                                <span> <i className="fa fa-bookmark-o" aria-hidden="true"></i></span>
                            </div>  
                </div> 
            </div>
       
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;

