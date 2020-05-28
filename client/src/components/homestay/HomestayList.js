import React,{ Fragment, useEffect, useState }  from 'react';
import {getHomestays } from '../../actions/homestay';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SingleHomeStay from './SingleHomeStay';
import Title from './Title';
import {Spinner} from '../layout/Spinner';

const initialState = {
    type: '',
    capacity: '',
    price: '', 
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    breakfast: '',
    pat: '',
    sortedhomestays:[]
};  
const  HomestayList = ({ getHomestays, homestay: { homestays,capacity,sortedhomestays,loading } }) => {
        useEffect(() => {
          getHomestays();  
        }, [getHomestays]);
      
const [formData, setFormData] = useState(initialState);

capacity = parseInt(capacity);  

useEffect(() => {
    if (!homestays) getHomestays();
    if (!loading) {
      const homestayData = { ...initialState };
      for (const key in homestays) {
        if (key in homestayData) homestayData[key] = homestays[key];
      }
      setFormData(homestayData);
       console.log('homestayData in begining', homestayData);
    }
  }, [loading, getHomestays, homestays]);
 
// define the Unique function
const getUnique = (item,value)=> {
    return [...new Set(item.map(item => item[value]))]
  } 
// get Unique Types   
let types = getUnique(homestays,'type');
// add all
if(types !==  ''){
types = ['all',...types];
}
// map to jsx
types= types.map((item,index)=> {
    return <option value={item} key={index}>{item}</option>
})
//get unique capacity
let cap = getUnique(homestays,'capacity');

//add all
if(cap !== ''){
    cap = [1,...cap];
}
//map to jsx
cap = cap.map((item,index) => {
    return <option value={item} key={index}>{item}</option>
})

const handleChange  = async (event) =>  { 
    const target= event.target
    const value = event.type === 'checkbok' ?
    target.checked : target.value
    const name = event.target.name
    
    setFormData({
       // ...homestays,
       sortedhomestays : [],
       [name]: value
//}, filterStays())
    })   
};  
useEffect(() => {
    let tempHomestays = [...homestays];
    // filter by capacity
    if(capacity !== 1){
        tempHomestays = tempHomestays.filter(stay => stay.capacity >= formData.capacity)
    }

    //filter by type
    if(formData.type !== 'all') {
     tempHomestays = tempHomestays.filter(stay => stay.type === formData.type )
    }     

      for(var i=0;i<tempHomestays.length;i++) {      
          console.log('am in sortedhome stay loop', tempHomestays.length)                  
        sortedhomestays.push(tempHomestays[i])
        }
        console.log('tempHomestays', tempHomestays);
     //   setFormData(sortedhomestays);
     // setFormData ([...sortedhomestays, ...tempHomestays ]);
      //  setFormData({...formData,[sortedhomestays]: [tempHomestays]  }); 
},[formData]);
 

    return (
       
    <Fragment>
       <section className="filter-container">
           <Title title="search homestays" />
           <form className="filter-form">
             {/*select type */}  
            <div className="form-group">
                <label htmlFor="type">room type</label>
                <select 
                name="type" 
                id="type" 
                value={homestays.type}
                className="form-control"
                onChange={handleChange}  
                >
                {types}  
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="capacity">Guests</label>
                <select 
                name="capacity" 
                id="capacity" 
                value={homestays.capacity}
                className="form-control"
                onChange={handleChange}  
                >
                {cap}  
                </select>
            </div>
           </form>
       </section>
       {/* !sortedhomestays || loading ? <Spinner /> :<>   */   
       <section className="featured-rooms">
        <div className='profiles'>
            <div className="row">
                 {sortedhomestays.length > 0 ? (
                   sortedhomestays.map(stay => (
                <div className="col-md-4 featured-responsive">
                <SingleHomeStay key={stay._id} homestay={stay} />
                </div>
                    ))
               ) : (
              <h4>Unfortunately No homestays found for your search</h4>
                  )}
           </div>    
       </div> 
      </section> 
 
}
</Fragment>  
)
}     
      HomestayList.propTypes = {
        getHomestays: PropTypes.func.isRequired,
        homestay: PropTypes.object.isRequired
      };
      
      const mapStateToProps = state => ({
        homestay: state.homestay
      });
      export default connect(
        mapStateToProps,
        { getHomestays }
      )(HomestayList);
      
      
