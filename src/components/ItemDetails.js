import React, { useState, useEffect, createRef } from 'react';
import axios from 'axios';
import Products from './Prods'
import { Link } from 'react-router-dom'
import Nav from './Nav'

import { Carousel, Card, Button, ButtonGroup, ButtonToolbar, Container, Row, Col } from 'react-bootstrap'

function ItemDetail({ match }) {


    const [count, updateCount] = useState(1)
    const [data, setData] = useState([])
    const [up, upData] = useState(0)

    console.log(match)

    //Fetch data
    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/prodapi/${match.params.id}`, { withCredentials: true }).then(res => {

            setData(res.data)
            console.log(match.params.id)
        })
            .catch(err => {


            })

    }, [])

    //Fetch Cart
    useEffect(() => {
        getCart()

    }, [])

    const clickHandler = () => {
        if (count == 1) {
            updateCount(count)
        }
        else if (count > 1) {
            updateCount(prevcount => prevcount - 1)
        }
    }

    const cartHandler = () => {
        saveCart();
        savePrice();
        upData(prevup => prevup + count)
    }

    

    const getCart = () => {
        if (localStorage.getItem('cart') == null) {
            localStorage.setItem('cart', JSON.stringify({}))


        }

        if (localStorage.getItem('price') == null) {
            localStorage.setItem('price', JSON.stringify({}))
        }



    }

    const saveCart = () => {
        var items = JSON.parse(localStorage.getItem('cart'))
        if (items[data.prod_name] == null) {
            items[data.prod_name] = count
        }
        else {
            items[data.prod_name] = items[data.prod_name] + count
        }

        localStorage.setItem('cart', JSON.stringify(items));

    }


    const savePrice = () => {
        const mrp = JSON.parse(localStorage.getItem('price'))
        console.log(mrp)
        if (mrp[data.prod_name] == null) {
            mrp[data.prod_name] = data.price
        }

        localStorage.setItem('price', JSON.stringify(mrp))
    }




    return (
        <div>
            <Nav />
            <Container className="my-4">
                <Card className="mb-3">
                    <Row className="no-gutters">
                        <Col className="md-4 ">
                            <Card.Img src={data.image} />
                        </Col>
                        <Col className="md-8">
                            <Card.Body>
                                <Card.Title>{data.prod_name} </Card.Title>
                                <Card.Text>{data.desc}</Card.Text>
                                <Button onClick={clickHandler} >-</Button>

                                {count}



                                <Button onClick={() => updateCount(prevcount => prevcount + 1)} >+</Button>



                                <Button onClick={() => cartHandler()} >Add to Cart</Button>
                            </Card.Body>
                        </Col>


                    </Row>

                </Card>
            </Container>














        </div>





    )



}

export default ItemDetail;