import {useEffect,useState} from 'react';
import axios from 'axios';
import {Row,Col,Container,Card,Button,CardColumns} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Nav from './Nav';




function Search({match}){

    const [data,updateData]=useState([])
    
    useEffect(()=>{
         axios.get(`http://127.0.0.1:8000/search/?search=${match.params.search}`).then(res=>{
             updateData(res.data)

         })
    },[])
    

    
    return(
        <div>
            <Nav/>
            {data.length>0?  <Container>
                       
                       <CardColumns className="my-5">
                        {data.map((data,index)=>{
                            return(
                                
                                <Card key={index} style={{width:'18rem'}}  border={'dark'}>
                                    <Card.Img variant="top" src={data.image} />
                                    <Card.Body>
                                        <Card.Title>{data.prod_name} RS-{data.price}</Card.Title>
                                        <Card.Text>
                                            {data.desc}
                                        </Card.Text>
                                      <Link to={`/shop/${data.id}`}>  <Button variant="primary">View Product</Button></Link>
                                    </Card.Body>
                                </Card>
                                
                            )
                        })};
    
    
    
                        </CardColumns>
                        </Container> :<Container className="my-5"> <h5 className="text-center">No matching results found</h5> </Container>}
                  

               </div>
    )
}



export default Search