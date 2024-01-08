import { Component } from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle,MdOutlineLogout } from "react-icons/md";
import {FaSearch,FaCartArrowDown} from 'react-icons/fa'
import Cookies from 'js-cookie'
import "./index.css";
import AgriContext from "../../agriContext";
import logo from '../../../src/Original.png'

class Header extends Component {
  
  logout=()=>{
    Cookies.remove('jwt_token')
    window.location.replace('/')
  }

  render() {
    return(
      <AgriContext.Consumer>
        {value=>{
const {data,categories,selectedCategory,searchInput,activeOptionId,sortbyOptions,isUserLoggedIn,userDetails,status,inputChange,getAllProducts,onCategoryChange,sortChange,onAddCart,cart}=value;
console.log(isUserLoggedIn)
const ongetAllProducts=()=>{
  getAllProducts()
}
const onInputChange=(event)=>{
  inputChange(event.target.value)
}

return(
  <nav className="nav-bar-container">
    <img src={logo} className="logo"/>
 <div className="input-container">
          <input
            type="search"
            value={searchInput}
            onChange={onInputChange}
            className="product-input"
            placeholder="Search for a product"
          />
          <button
            className="search-button"
            type="button"
            label="hi"
            onClick={ongetAllProducts}
          >
            <FaSearch className="search-icon" />
          </button>
        </div>
    <ul className="nav-bar">
      
     

      <li className="nav-items">
        <p>Hello {isUserLoggedIn ? userDetails.username : "User"}</p>
      </li>
      <li className="nav-items">
        <Link className="Link" to="/cart">
          <div className="cart-img">
            <p className="cart-number">{cart.length}</p>
          </div>
       </Link>
      </li>
     
      <li className="nav-items">
        <Link className="Link" to="/login">
         {isUserLoggedIn && userDetails.profile_img!==null ? <img src={userDetails.profile_img} className="profile" alt="profile"/> :  <MdAccountCircle className="login-logo" />}
        </Link>
      </li>
     {isUserLoggedIn  &&  <li className="nav-items">
     <button onClick={this.logout} className="search-button">
     <MdOutlineLogout  className="login-logo" />
     </button>
      </li>}
   
    </ul>
  </nav>
)
        }}
      </AgriContext.Consumer>
    )
  }
}

export default Header;
