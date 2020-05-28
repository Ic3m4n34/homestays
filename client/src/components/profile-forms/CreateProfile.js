import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';


const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData ] = useState({
    company: '',
    location: '',
    phone: '',
    address: '',
    email: '',
    product: '',
    productcat: '',
    twitter: '',
    facebook: '',
    youtube: '',
    linkedin: '',
	instagram: '',
	fileUpload: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const {
        company,
        location,
        phone,
        address,
        email,
        product,
        productcat,
        twitter,
        facebook,
        youtube,
        linkedin,
				instagram,
				fileUpload,
    } = formData;

	const maxSelectFile= (event) =>{
		let files = event.target.files // create file object
			if (files.length > 3) { 
			   const msg = 'Only 3 images can be uploaded at a time'
			   event.target.value = null // discard selected file
			   console.log(msg)
			  window.alert(msg)
			  return false;
	 
		  }
		return true;
	 
	 }
	 const checkMimeType=(event)=>{
		//getting file object
		let files = event.target.files 
		//define message container
		let err = ''
		// list allow mime type
	   const types = ['image/png', 'image/jpeg', 'image/gif']
		// loop access array
		for(var x = 0; x<files.length; x++) {
		 // compare file type find doesn't matach
			 if (types.every(type => files[x].type !== type)) {
			 // create error message and assign to container   
			 err += files[x].type+' is not a supported format\n';
		   }
		 };
	  
	   if (err !== '') { // if message not same old that mean has error 
			event.target.value = null // discard selected file
			window.alert(err)
			 return false; 
		}
	   return true;
	  
	  }
	const fileSelectedHandler = async (event) => {
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};

		const file = event.target.files;
		if (maxSelectFile(event) && checkMimeType(event)) {

		console.log('file', file);
		const data = new FormData(); 
		
		
		for(var i=0;i<file.length;i++) {
			data.append('fileUpload', file[i]);
		//	fileArray = URL.createObjectURL(file[i])	
			
		}
		console.log('data is ', data);
		const res = await axios.post('/api/upload/upload', data, config);

		console.log('resi', res);

		setFormData({
			...formData,
			fileUpload: res.data,
		});
	}
	};
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData,history);
    }
    return (
		
        <Fragment>
			<h1 className='large text-primary'>Create Your Profile</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Let's get some information to make your
				profile stand out
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={ e => onSubmit(e)}>
				<div className='form-group'>
                    <select name='productcat' value={productcat}
                    onChange={e => onChange(e)}
                    >
						<option value='0'>* Select your Craft Categeory</option>
						<option value='Copper Craft'>Copper Craft</option>
						<option value='Block Printing'>Block Printing</option>
						<option value='Thread Work'>Thread Work</option>
						<option value='Murals'>Murals</option>
						<option value='Aipan'>Aipan</option>
						<option value='Musical Instrument'>Musical Instrument</option>
						<option value='Bamboo'>Bamboo</option>
						<option value='Tharu Tribal Craft'>Tharu Tribal Craft</option>
					</select>
					<small className='form-text'>
						Give us an idea of your main occupation
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Company'
						name='company'
						value={company}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Could be your own company or one you work for
					</small>
				</div>

				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						City & state suggested (eg. Bashti,Rudarprayag,Uttarakhand)
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Phone Number'
						name='phone'
						value={phone}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Phone suggested (eg. 10 digits phone no)
					</small>
				</div>
                <div className='form-group'>
					<input
						type='text'
						placeholder='Address'
						name='address'
						value={address}
						onChange={e => onChange(e)}
					/>
				</div>
                <div className='form-group'>
					<input
						type='email'
						placeholder='Email'
						name='email'
						value={email}
						onChange={e => onChange(e)}
					/>
				</div>
                <div className='form-group'>
					<input
						type='text'
						placeholder='Product'
						name='product'
						value={product}
						onChange={e => onChange(e)}
					/>
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
							<img style={{ width: "40%", height:"40%" }} src={url} alt="fileArray" />
						))}	
				</div>
                <div className='my-2'>
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type='button'
						className='btn btn-light'
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
                {displaySocialInputs && (
					<Fragment>
                <div className='form-group social-input'>
							<i className='fab fa-twitter fa-2x' />
							<input
								type='text'
								placeholder='Twitter URL'
								name='twitter'
								value={twitter}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x' />
							<input
								type='text'
								placeholder='Facebook URL'
								name='facebook'
								value={facebook}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-youtube fa-2x' />
							<input
								type='text'
								placeholder='YouTube URL'
								name='youtube'
								value={youtube}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-linkedin fa-2x' />
							<input
								type='text'
								placeholder='Linkedin URL'
								name='linkedin'
								value={linkedin}
						    	onChange={e => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-instagram fa-2x' />
							<input
								type='text'
								placeholder='Instagram URL'
								name='instagram'
								value={instagram}
								onChange={e => onChange(e)}
							/>
						</div>
                 </Fragment>
                )}
            <input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
                Go Back
                    </Link>
			</form>
        </Fragment>
    )};


CreateProfile.propTypes = {
    createProfile : PropTypes.func.isRequired
}



export default connect(null, { createProfile }) (withRouter(CreateProfile));