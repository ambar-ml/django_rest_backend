import { useEffect,useState } from "react";
import { ListGroup,Badge,span,Button } from "react-bootstrap";
import Nav from './Nav'
import {Link} from 'react-router-dom';

function Cartdetails(){

    const [item,UpItem]=useState([])
    const [tot,upTotal]=useState(0)
    const [car,updateCar]=useState({})
    

    


    function getCart(){
        
        var cart=JSON.parse(localStorage.getItem('cart'));
        if(cart==null){
            localStorage.setItem('cart',JSON.stringify({}))
            cart=JSON.parse(localStorage.getItem('cart'))
        }
        updateCar(cart)
        const price=JSON.parse(localStorage.getItem('price'))
        
        const li=[]
        let total=0
        for (var it in cart){
            
            const ob={name:it,qty:cart[it],price:price[it]};
            total = total + (cart[it]*price[it])
            li.push(ob)
            
            

        }
        UpItem(li)
        upTotal(total)
        

    }
    
    
    useEffect(()=>{
        getCart()


    },[])

    const cartHandler=()=>{
        localStorage.setItem('cart',JSON.stringify({}))
        let cart = JSON.parse(localStorage.getItem('cart'))
        updateCar(cart)
    }

    const plusHandler=(qty,na)=>{
        
        
        let upQty=qty+1
        let cart=JSON.parse(localStorage.getItem("cart"))
        cart[na]=upQty
        localStorage.setItem('cart',JSON.stringify(cart))
        getCart()
        
        
       
    }

    const minusHandler=(qty,na)=>{
        
        
        let upQty=qty-1
        if (upQty==0){
            upQty=1
        }
        let cart=JSON.parse(localStorage.getItem("cart"))
        cart[na]=upQty
        localStorage.setItem('cart',JSON.stringify(cart))
        getCart()
        
        
       
    }
    

    const delHandler=(name)=>{
        let cart=JSON.parse(localStorage.getItem("cart"))
        delete cart[name]
        localStorage.setItem('cart',JSON.stringify(cart))
        getCart()


    }
    

    
    
    
    return (
        <div>
            <Nav/>
             {(Object.keys(car).length)>0? <div className="container my-5">
            <h2 style={{textAlign:'center'}} >Cart Items-</h2>
            <ListGroup className="container" >
                {item.map((data,index)=>{
                    return (
                        
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start flex-fill list-group-item-action">
                        <div style={{float:'right'}}>{data.name}
                        <div>
                        Price-{data.price}</div></div>
                      
                        <span> <Button className="btn-sm btn-dark" onClick={()=>minusHandler(data.qty,data.name)} >-
                        </Button>  {data.qty}  <Button className="btn-sm btn-dark" onClick={()=>plusHandler(data.qty,data.name)}>+</Button></span>
                             
                       <span> <Badge variant="dark">{data.qty}</Badge></span> 
                       <span><Button className="btn-danger btn-sm" onClick={()=>delHandler(data.name)}>
                        remove item</Button></span>  </ListGroup.Item>
                        
                    )
                })}
                
            <ListGroup.Item><h2>Total Cart Price<span style={{float:'right'}}>Rs-{tot} </span></h2></ListGroup.Item>
            
            </ListGroup>
            <div className="container text-center my-2">
            <Button onClick={cartHandler} >Clear Cart</Button>
            <Link to="/order"><Button className="mx-2">Place order </Button></Link>
            </div>
            
            </div>
            :
            <div className="container my-5">  
                    <h3 className="text-center">Please add items in your cart to see!</h3>
                    </div>}
            
            </div>

    );
}


export default Cartdetails