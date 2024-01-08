

import {Component}  from 'react'
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";
import AgriContext from './agriContext';
import Home from "./Components/Home";
import Login from './Components/Login';
import Cookies from 'js-cookie'
import Register from './Components/Register';

import Cart from './Components/Cart'



const sortbyOptions = [
  {
    optionId: "PRICE_HIGH",
    displayText: "Price (High-Low)",
  },
  {
    optionId: "PRICE_LOW",
    displayText: "Price (Low-High)",
  },
];

class App extends Component {
  state = {
    data: [],
    sortBy:"id",
    categories: [],
    order:"ASC",
    category: "",
    status:"INITIAL",
    userDetails:[],
    isUserLoggedIn:false,
    selectedCategory: "",
    searchInput: "",
    cart:[],
    activeOptionId: sortbyOptions[0].optionId,
  };

  inputChange = (value) => {
    this.setState({
      searchInput: value,
    });
  };

  onAddCart=async(id)=>{
 
    const {isUserLoggedIn,userDetails}=this.state;
    if(isUserLoggedIn)
    {

      const answer = await fetch(`http://localhost:3008/add-cart?id=${id}&user_id=${userDetails.id}&quantity=1`);

      this.getCartItems()
    
 
     
    }
    else{
     window.location.replace('/login')
    }
  }   

  onIncreaseQuantity=async(id)=>{
    const {isUserLoggedIn,userDetails}=this.state;
    if(isUserLoggedIn){
      console.log(id)
      const answer = await fetch(`http://localhost:3008/add-quantity?id=${id}&user_id=${userDetails.id}`);

      this.getCartItems()
  }
}

  onDecreaseQuantity=async(id)=>{
    const {isUserLoggedIn,userDetails}=this.state;
    console.log(id)
    if(isUserLoggedIn)
    {

      const answer = await fetch(`http://localhost:3008/remove-quantity?id=${id}&user_id=${userDetails.id}`);

      this.getCartItems()
  }
}
 

  componentDidMount() {
    
    const jwtToken=Cookies.get('jwt_token')

    if(jwtToken===undefined){
      this.getAllCategories();
    }
    else{
      this.getUserInfo()
    }
   
  }

  getUserInfo=async()=>{
    const jwtToken=Cookies.get('jwt_token')
  
    this.setState({status:"LOADING"})
    const url="http://localhost:3008/user-info"
    const options={
      method:"POST",
      headers:{
        Authorization:`Bearer ${jwtToken}`
      }
    
    }
    const answer = await  fetch(url,options)
    const data = await answer.json();
  
    if (answer.ok) {
      
      this.setState({ userDetails:data.data,isUserLoggedIn:true },()=>{ this.getCartItems()});
    }  
    else{
      this.setState({isUserLoggedIn:false})
    }


  }




  getCartItems=async()=>{
    const {userDetails}=this.state;

const answer= await fetch(`http://localhost:3008/cart?user_id=${userDetails.id}`)
const data=await answer.json()

this.setState({cart:data.data})

this.getAllCategories()

  }

  getAllCategories = async () => {
  
     this.setState({status:"LOADING"})
    const answer = await fetch(`http://localhost:3008/categories`);
    if (answer.ok) {
      const data = await answer.json();
      this.setState({ categories: data });
    }  

    

    this.getAllProducts();
  };


  
  onCategoryChange = (value) => {
    const { categories } = this.state;
    if (value !== "") {
      const element = categories.filter(
        (each) => each.name === value
      );
      this.setState(
        {
          selectedCategory: value,
          category: element[0].id,
        },
        () => {
          this.getAllProducts();
        }
      );
    } else {
      this.setState(
        {
          selectedCategory: value,
          category: "",
        },
        () => {
          this.getAllProducts();
        }
      );
    }
  };

  getAllProducts = async () => {
    const { sortBy, searchInput, order, category} = this.state;
  
    const answer = await fetch(
      `http://localhost:3008/items?sort_by=${sortBy}&order=${order}&search_q=${searchInput}&category_id=${category}`
    );
    if (answer.ok) {
      const data = await answer.json();
      this.setState({ data, status: "SUCCESS" });
    } else {
      this.setState({ status: "FAILURE" });
    }
  };

    sortChange = (value) => {
    if (value === "PRICE_HIGH") {
      this.setState(
        {
          activeOptionId: value,
          sortBy: "price",
          order: "DESC",
        },
        () => {
          this.getAllProducts();
        }
      );
    } else {
      this.setState(
        {
          activeOptionId: value,
          sortBy: "price",
          order: "ASC",
        },
        () => {
          this.getAllProducts();
        }
      );
    }
  };


  onRemoveCart=async(user_id,product_id)=>{
  
    const url =`http://localhost:3008/remove-cart?user_id=${user_id}&product_id=${product_id}`;
    
    const data = await fetch(url)

    this.getCartItems()

      
  }


  render(){

    const {data,categories,selectedCategory,searchInput,activeOptionId,userDetails,isUserLoggedIn,status,cart}=this.state;
   
    return(
      <AgriContext.Provider value={{data,categories,selectedCategory,cart,searchInput,activeOptionId,sortbyOptions,userDetails,isUserLoggedIn,status,inputChange: this.inputChange,getAllProducts:this.getAllProducts,onCategoryChange:this.onCategoryChange,sortChange:this.sortChange,onAddCart:this.onAddCart, onRemoveCart:this.onRemoveCart,onIncreaseQuantity:this.onIncreaseQuantity,onDecreaseQuantity:this.onDecreaseQuantity}}>
  <BrowserRouter>
    <Routes>
      <Route exact path="/" Component={Home} />
      <Route exact path='/login' Component={Login}/>
      <Route exact path='/register' Component={Register}/>
      <Route exact path='/cart' Component={Cart}/>
      
    </Routes>
  </BrowserRouter>
  </AgriContext.Provider>
)
}
  }
  

export default App;