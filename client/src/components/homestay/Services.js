import React, { Component } from 'react'
import Title from './Title';
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from "react-icons/fa";

export default class Services extends Component {
    state={
        services:[
          {  
            icon:<FaCocktail/>,
            tittle:"free cocktails",
            info: 'Anim ea deserunt ea do aliqua velit.Veniam voluptate sunt ex veniam duis ut'
        },
        {  
            icon:<FaHiking/>,
            tittle:"Explore Hikes",
            info: 'Anim ea deserunt ea do aliqua velit.Veniam voluptate sunt ex veniam duis ut'
        },
        {  
            icon:<FaShuttleVan/>,
            tittle:"free transfers",
            info: 'Anim ea deserunt ea do aliqua velit.Veniam voluptate sunt ex veniam duis ut'
        },
        {  
            icon:<FaBeer/>,
            tittle:"free beers",
            info: 'Anim ea deserunt ea do aliqua velit.Veniam voluptate sunt ex veniam duis ut'
        }
        ]
    }

  render() {
    return (
        <section className="services">
            <Title title="services" />
            <div className="services-center">
                {this.state.services.map((item,index) => {
                 return <article key={index} className="service">
                 <span>{item.icon}</span>
                 <h6>{item.tittle}</h6>
                 <p>{item.info}</p>    
                 </article>   
                })}

            </div>
        </section>
      
    );
  }
}

