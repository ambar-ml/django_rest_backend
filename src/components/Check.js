import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";



function Check() {

    let data = { username: 'akash', password: 'Ronaldo-07' };

    


    useEffect(() => {
        
        axios.post('http://127.0.0.1:8000/accounts/',data,{withCredentials:true} ).then((res) => {
            console.log(res.headers)
            
        })

        
    })


    

    
    
    


    return (
        <div>
            hello
    {console.log(Cookies.get('XSRF-TOKEN'))}
            </div>
    )
}


export default Check;