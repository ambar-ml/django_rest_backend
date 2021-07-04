
import React, { useEffect, useState } from 'react'
import { Link, useHistory,NavLink } from 'react-router-dom'
import { NavDropdown,Button } from 'react-bootstrap'
import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { IconButton } from '@material-ui/core'
import Logout from './Logout'
import Login from './Login'





function Nav() {
    const history=useHistory()
    const [count, updateCount] = useState(0)
    const [search, updateSearch] = useState()
    const[logout,updatelogout]=useState(false)
    const[loggedin,updateLoggedIn]=useState(false)
    const[usermail,updateUserEmail]=useState()
    
    





    const getCart = () => {
        if (localStorage.getItem('cart') == null) {
            var sum = 0
        }
        else {
            var items
            var sum = 0
            items = JSON.parse(localStorage.getItem('cart'))
            for (var item in items) {
                sum = sum + items[item]
            }

        }
        updateCount(sum)

        

    }

    useEffect(() => {
        getCart()
    
        

    })
    useEffect(()=>{
        let email=localStorage.getItem('user')
        let access_token=localStorage.getItem('access_token')
        if(access_token==null){
            updateLoggedIn(false)
        }
        else{
            updateLoggedIn(true)
        }
        updateUserEmail(email)
    },[])

   


    const logoutHandler=()=>{
        updatelogout(prevlogout=>true)
        

    }

    const searchHandler=()=>{
        history.push(`/search/${search}`)
    }
    
    const menHandler=(props)=>{
        
        
        history.push(`/men/${props}`)
    }

    const womenHandler=(props)=>{
        
    
        history.push(`/women/${props}`)
    }


    return (

        <div >

            <nav className="navbar navbar-expand navbar-dark bg-dark navbar-default navbar-static-top">
                <div className="container-fluid">
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link to="/" style={{ textDecoration: 'none' }} className="nav-link"> Home</Link>

                            </li>


                            <li className="nav-item">

                                <Link to="/Shop" style={{ textDecoration: 'none' }} className="nav-link"> Shop</Link>
                            </li>


                            


                            <li className="nav-item">
                                <Link to="/Contact" style={{ textDecoration: 'none' }} className="nav-link"> Contact Us </Link>
                            </li>

                            <NavDropdown title="Men"  id="basic-nav-dropdown" >
                                <NavDropdown.Item onClick={()=>menHandler('upper')} >Upper wear </NavDropdown.Item>
                                <NavDropdown.Item onClick={()=>menHandler('lower')} >Lower wear </NavDropdown.Item>
                               
                                <NavDropdown.Item onClick={()=>menHandler('shoes')} >Shoes </NavDropdown.Item>
                                </NavDropdown>
                            <NavDropdown title="Women" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={()=>womenHandler('upper')} >Upper wear </NavDropdown.Item>
                                <NavDropdown.Item onClick={()=>womenHandler('lower')} >Lower wear </NavDropdown.Item>
                               
                                <NavDropdown.Item onClick={()=>womenHandler('shoes')} >Shoes </NavDropdown.Item>
                            </NavDropdown>

                            
                            
                            <li className="nav-item">
                                <Link to="/checkout" style={{ textDecoration: 'none' }} className="nav-link"> Checkout </Link>
                            </li>

                             </ul>
                             <li>
                                 {loggedin?<Button variant="dark">Welcome-{usermail}</Button>:''}
                             </li>
                             <li>
                             {loggedin?<Button onClick={logoutHandler} variant="dark" >Log out</Button>:
                             <Link to="/login">
                                 <Button variant="dark">Log in</Button></Link>}</li>
                                
                             {logout?<Logout/>:""}
                                


                           <Link to={"/cart"}> <IconButton aria-label="cart">
                                <Badge color="secondary" badgeContent={[count]} >
                                    <ShoppingCartIcon style={{ color: "white" }} >

                                    </ShoppingCartIcon>

                                </Badge>
                            </IconButton></Link>

                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={e => updateSearch(e.target.value)} />
                                   <button className="btn btn-outline-success" type="submit" onClick={searchHandler}>Search</button>
                            </form>
                            
                    </div>
                    </div>
            </nav>
        </div>




            )
}

            export default Nav;