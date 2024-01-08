import { Component } from "react";

import {Oval} from 'react-loader-spinner'
import { LiaStarSolid } from "react-icons/lia"
import { FaRupeeSign } from "react-icons/fa";
import { RiStarSLine } from "react-icons/ri";
import Header from "../Header";
import AgriContext from "../../agriContext";
import "./index.css";

class Home extends Component {

renderLoading=()=>

  <div className="Loader">
    <Oval height="50" width="50" color="#005f40"/>
  </div>



renderOptionsMenu = (data,categories,selectedCategory,searchInput,activeOptionId,sortbyOptions,isUserLoggedIn,userDetails,status,inputChange,getAllProducts,onCategoryChange,sortChange,onAddCart) => {

  const onCategory=(event)=>{
  onCategoryChange(event.target.value)
 }
const onSort=(event)=>{
     sortChange(event.target.value)
}

  return (
    <div>
      <form  className="Category-container">
      <div>
      <label htmlFor="category" className="category-label">
          Select Category :
        </label>
        <select
          onChange={onCategory}
          value={selectedCategory}
          className="category"
          id="category"
        >
          <option value="">All</option>
          {categories.map((each) => (
            <option value={each.name}>{each.name}</option>
          ))}
        </select>
      </div>
      
        <select
          onChange={onSort}
          className="category-options"
          id="category-options"
          value={activeOptionId}
        >
          {sortbyOptions.map((each) => (
            <option value={each.optionId}>{each.displayText}</option>
          ))}
        </select>
      </form>
   
    </div>
  );
};

renderSuccess = (data,categories,selectedCategory,searchInput,activeOptionId,sortbyOptions,isUserLoggedIn,userDetails,status,inputChange,getAllProducts,onCategoryChange,sortChange,onAddCart) => {
 
  const onaddCart=(id)=>{
   onAddCart(id)
  }

  return (
    <>
      <div className="products-container">
{this.renderOptionsMenu(data,categories,selectedCategory,searchInput,activeOptionId,sortbyOptions,isUserLoggedIn,userDetails,status,inputChange,getAllProducts,onCategoryChange,sortChange,onAddCart)}
         <ul className="products-card">
          {data.map((each) => (
            <li className="product-item">
              <img
                src={each.image_url}
                alt={each.name}
                className="product-image"
              />
               <p className="item">{each.name}</p>
              <div className="products-detail-container">
               
                <p className="items">
                  <FaRupeeSign className="rupees-icon" /> {each.price}/-
                  <span className="off">15 % off</span>
                </p>
                <LiaStarSolid className="stars"/>
                <LiaStarSolid className="stars"/>
                <LiaStarSolid className="stars"/>
                <RiStarSLine className="stars"/>
                <RiStarSLine className="stars"/>
          
              </div>
              <div className="buttons">
             <button  onClick={()=>{onaddCart(each.id)}} type="button" className="cart-button" >
                  Add to Cart
                </button>
                <button type="button" className="buy-now-button">Buy Now</button>
             </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};


  


  renderHome=(data,categories,selectedCategory,searchInput,activeOptionId,sortbyOptions,isUserLoggedIn,userDetails,status,inputChange,getAllProducts,onCategoryChange,sortChange,onAddCart)=>{
    switch (status) {
      case "LOADING":
        
        return this.renderLoading()
      case "SUCCESS":
        
        return this.renderSuccess(data,categories,selectedCategory,searchInput,activeOptionId,sortbyOptions,isUserLoggedIn,userDetails,status,inputChange,getAllProducts,onCategoryChange,sortChange,onAddCart)
      case "FAILURE":
        
        return this.renderLoading()
    
      default:
          return null;
    }
  }

  render() {
    return (
     <AgriContext.Consumer>

     {value=>{
      const {data,categories,selectedCategory,searchInput,activeOptionId,sortbyOptions,isUserLoggedIn,userDetails,status,inputChange,getAllProducts,onCategoryChange,sortChange,onAddCart}=value;
return(
  <div>
    <Header/>
    {this.renderHome(data,categories,selectedCategory,searchInput,activeOptionId,sortbyOptions,isUserLoggedIn,userDetails,status,inputChange,getAllProducts,onCategoryChange,sortChange,onAddCart)}
  } 
 
  </div>
)
     }}
     </AgriContext.Consumer>
    );
  }
}

export default Home;
