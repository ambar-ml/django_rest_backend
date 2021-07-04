import {React,useEffect} from 'react';
import axios from 'axios'


  


function About(){

    const options = {
        method: 'GET',
        url: 'https://google-maps-geocoding.p.rapidapi.com/geocode/json',
        params: {address: '164 Townsend St., San Francisco, CA', language: 'en'},
        headers: {
          'x-rapidapi-key': 'f2bc31b62amsh8011d8817a19863p1559c3jsn3daefbc2157e',
          'x-rapidapi-host': 'google-maps-geocoding.p.rapidapi.com'
        }
      };
      
      useEffect(()=>{
        axios.request(options).then(function (response) {
            
        }).catch(function (error) {
            
        });
    
      })
    return(
        <div>
            <h1>About </h1>
            </div>
    )
}

export default About;