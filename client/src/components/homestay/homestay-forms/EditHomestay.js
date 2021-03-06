import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import axios from 'axios';
import { createHomestay, getCurrentHomestay } from '../../../actions/homestay'; 

const initialState = {
    name: '',
    price: '',
    type:'',
    capacity: '',
    featured: '',
    description:'',
    aminities:'',
    extras:[],
    fileUpload: ''
    };

const EditHomestay = ({ 
    homestay: { homestay, loading },
    createHomestay,
    getCurrentHomestay,
     history
}) => {
    
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (!homestay) getCurrentHomestay();
        if (!loading) {
          const homestayData = { ...initialState };
          for (const key in homestay) {
            if (key in homestayData) homestayData[key] = homestay[key];
          }
          setFormData(homestayData);
        }
      }, [loading, getCurrentHomestay, homestay]);
    
    const {
        name,
		price,
		type,
        capacity,
        featured,
        description,
		aminities,
		extras,
		fileUpload
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
    const onSubmit = e => {
        e.preventDefault();
        createHomestay(formData,history, true);
    };       
    const fileSelectedHandler = async (event) => {
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		const file = event.target.files;
		console.log('file', file);
		const data = new FormData();
		for(var i=0;i<file.length;i++) {
			data.append('fileUpload', file[i]);			
		}
		// data.append('fileUpload', file)

		console.log('data is ', data);
		const res = await axios.post('/api/upload/upload', data, config);

		console.log('resi', res);

		setFormData({
			...formData,
			fileUpload: res.data,
		});
	};
    return (
        <Fragment>
			<h1 className='large text-primary'>Edit Your Homestay</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Add some changes to your homestay
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={ e => onSubmit(e)}>
			<div className='form-group'>
					<input
						type='text'
						placeholder='Name of your humble abode'
						name='name'
						value={name}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Could be your own home or a cluster of homes you manage
					</small>
				</div>
				<div className='form-group' >
					<select name='type' value='type'
					onChange={e => onChange(e)}
                    >
						<option value='0'>* Select your Homestay Type</option>
						<option value='one star'>one Star</option>
						<option value='two star'>Two star</option>
						<option value='three star'>Three Star</option>
						<option value='Four star'>Four Star</option>
						<option value='Five Star'>Five Star</option>
					</select>
					<small className='form-text'>
						Tell us how your property is rated
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Capacity'
						name='capacity'
						value={capacity}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Maximum no of people can stay on the property
					</small>
				</div>	
				<div className='form-group'>
					<input
						type='text'
						placeholder='Tarrif'
						name='price'
						value={price}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Prices are for each night on twin sharing basis
					</small>
				</div>	
				<div className='form-group'>
					<select
						type='text'
						placeholder='Featured'
						name='featured'
						value={featured}
						onChange={e => onChange(e)}
					>
						<option value='0'>* Select your option</option>
						<option value='Yes'>Yes</option>
						<option value='No'>No</option>
					</select>	
					<small className='form-text'>
						Is this property part of Featured properties?
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Description'
						name='description'
						value={description}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Add few lines for your homestay
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Aminities'
						name='aminities'
						value={aminities}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						like heater,kitchen,washine machine etc.
					</small>
				</div>	
				<div className='form-group'>
					<input
						type='text'
						placeholder='Extras'
						name='extras'
						value={extras}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						special features like pet friendly,metro connected etc.
					</small>
				</div>
				<div className='form-group'>
					<input
						type='file'
						name='fileUpload'
						placeholder="File Upload"
						encType='multipart/form-data'
						onChange={event => fileSelectedHandler(event)}
						multiple
					/>
				</div>
				<div className='form-group'>
				{(fileUpload || []).map(url => (
							<img  src={url} alt="fileArray" />
						))}	
				</div>
            <input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
                Go Back
                    </Link>
			</form>
        </Fragment>
    )};


const mapStateToProps = state => ({
    homestay: state.homestay
    })

export default connect(mapStateToProps, { createHomestay, getCurrentHomestay })(withRouter(EditHomestay));