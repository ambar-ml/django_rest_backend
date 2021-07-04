
import {useState} from 'react';
import {Button,Dropdown,Form,Col} from 'react-bootstrap'
import axios from 'axios'
import Nav from './Nav'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'




function Contact(){

   
    const [firstName,updateFirstName]=useState("")
    const [lastName,updateLastName]=useState("")
    const [countr,updateCountry]=useState("")
    const [emailid,updateEmail]=useState("")
    const [quest,updateQuestion]=useState("")
    
    const[open,setopen]=useState(false)
    


    const buttonHandler=(e)=>{
      e.preventDefault()
      const data={first_name:firstName,last_name:lastName,email:emailid,country:countr,question:quest}
      axios.post("http://127.0.0.1:8000/contactusapi/",data).then((res)=>{
      console.log(res.data)
      
      setopen(true)
    })

    }


    const handleClose=()=>{
      setopen(false)
    }
    return(
        <div>
           <Nav/>
           
          <div className="container">
          <h1>Contact Us</h1>
          <Form className="my-5">
          
  <Form.Row>
    <Form.Group as={Col} >
      <Form.Label>First Name</Form.Label>
      <Form.Control type="name" placeholder="First Name" onChange={e=>updateFirstName(e.target.value)} />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Last Name</Form.Label>
      <Form.Control  placeholder="Last Name" onChange={e=>updateLastName(e.target.value)} />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridEmail">
    <Form.Label>Email Address</Form.Label>
    <Form.Control placeholder="abc@xyz.com" onChange={e=>updateEmail(e.target.value)} />
    <Form.Text className="text-muted"> We will never share your email with anyone else.</Form.Text>
  </Form.Group>

  
  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Country</Form.Label>
      <Form.Control onChange={e=>updateCountry(e.target.value)} />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Ask Us</Form.Label>
    <Form.Control as="textarea" rows={3} onChange={e=>updateQuestion(e.target.value)} />
  </Form.Group>
  
  <Button variant="primary" type="submit" onClick={buttonHandler}>
    Submit
  </Button>
</Form>
<div className="container">
<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success">
    Submit Successful, We will connect ASAP.
  </Alert>
</Snackbar>
</div>

            </div>
            </div>
    )
}

export default Contact;