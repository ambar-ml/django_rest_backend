import {Container,Form,Button,Col,Row} from 'react-bootstrap';
import {useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import Nav from './Nav'


function Order(){
    const[isLoggedIn,updateLoggedIn]=useState(false)
    const history=useHistory()

    useEffect(()=>{
        let user=localStorage.getItem('user')
        if(!user){
            history.push('/login')
        }
        
    })
    const login=()=>{
        history.push('/login')
    }

    return(
        <div>
            <Nav/>
            <h5>{isLoggedIn}</h5>
            <div className="container ">
                <Form className="my-5">
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control placeholder="First Name"/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control placeholder="Last Name"/>
                    </Form.Group>
                    
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeHolder="Address" type="address"></Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>City</Form.Label>
                        <Form.Control placeholder="City"/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>State</Form.Label>
                        <Form.Control placeholder="State"/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control placeHolder="Phone Number" type="Phone"></Form.Control>
                    </Form.Group>
                </Form.Row>
                
                <div className="text-center">
                <Button>Place</Button>
                </div>
            
                    

                </Form>
                



            </div>
            
        </div>
    )
}


export default Order;