import { Component } from "react";

import { Oval } from "react-loader-spinner";

import { FaSearch, FaRupeeSign } from "react-icons/fa";

import Header from "../Header";
import "./index.css";

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

class Products extends Component {
  state = {
    data: [],
    status: "INITIAL",
    categories: [],
    sortBy: "id",
    order: "ASC",
    category: "",
    selectedCategory: "",
    searchInput: "",
    activeOptionId: sortbyOptions[0].optionId,
  };

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories = async () => {
    this.setState({ status: "LOADING" });
    const answer = await fetch(`http://localhost:3002/categories`);
    if (answer.ok) {
      const data = await answer.json();
      this.setState({ categories: data });
    }
    this.getAllProducts();
  };

  getAllProducts = async () => {
    const { sortBy, searchInput, order, category } = this.state;

    const answer = await fetch(
      `http://localhost:3002/items?sort_by=${sortBy}&order=${order}&search_q=${searchInput}&category_id=${category}`
    );
    if (answer.ok) {
      const data = await answer.json();
      this.setState({ data, status: "SUCCESS" });
    } else {
      this.setState({ status: "FAILURE" });
    }
  };

  onCategoryChange = (event) => {
    const { categories } = this.state;
    if (event.target.value !== "") {
      const element = categories.filter(
        (each) => each.name === event.target.value
      );
      this.setState(
        {
          selectedCategory: event.target.value,
          category: element[0].id,
        },
        () => {
          this.getAllProducts();
        }
      );
    } else {
      this.setState(
        {
          selectedCategory: event.target.value,
          category: "",
        },
        () => {
          this.getAllProducts();
        }
      );
    }
  };

  onInputChange = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  sortChange = (event) => {
    if (event.target.value === "PRICE_HIGH") {
      this.setState(
        {
          activeOptionId: event.target.value,
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
          activeOptionId: event.target.value,
          sortBy: "price",
          order: "ASC",
        },
        () => {
          this.getAllProducts();
        }
      );
    }
  };

  renderLoading = () => (
    <div className="loader">
      <Oval
        height="50"
        width="50"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );

  renderOptionsMenu = () => {
    const {
      categories,

      activeOptionId,
      selectedCategory,
      searchInput,
    } = this.state;

    return (
      <div className="Category-container">
        <form>
          <label htmlFor="category" className="category-label">
            Select Category :
          </label>
          <select
            onChange={this.onCategoryChange}
            value={selectedCategory}
            className="category"
            id="category"
          >
            <option value="">All</option>
            {categories.map((each) => (
              <option value={each.name}>{each.name}</option>
            ))}
          </select>
          <label htmlFor="category-option" className="category-label">
            Sort By :
          </label>
          <select
            onChange={this.sortChange}
            className="category-options"
            id="category-options"
            value={activeOptionId}
          >
            {sortbyOptions.map((each) => (
              <option value={each.optionId}>{each.displayText}</option>
            ))}
          </select>
        </form>
        <div className="input-container">
          <input
            type="search"
            value={searchInput}
            onChange={this.onInputChange}
            className="products-input"
            placeholder="Search for a product"
          />
          <button
            className="search-button"
            type="button"
            label="hi"
            onClick={this.getAllProducts}
          >
            <FaSearch className="search-icon" />
          </button>
        </div>
      </div>
    );
  };

  renderSuccess = () => {
    const { data } = this.state;

    return (
      <>
        <div className="products-container">
          {this.renderOptionsMenu()}
          <ul className="products-card">
            {data.map((each) => (
              <li className="product-item">
                <img
                  src={each.image_url}
                  alt={each.name}
                  className="product-image"
                />
                <div className="products-detail-container">
                  <p className="item">{each.name}</p>
                  <p className="items">
                    <FaRupeeSign className="rupees-icon" /> {each.price}/-
                    <span className="off">15 % off</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };
  
  renderProducts = () => {
    const { status } = this.state;

    switch (status) {
      case "LOADING":
        return this.renderLoading();
      case "SUCCESS":
        return this.renderSuccess();
      case "FAILURE":
        return this.renderFailure();

      default:
        return null;
    }
  };

  render() {
    return (
      <div>
        <Header />
        {this.renderProducts()}
      </div>
    );
  }
}

export default Products;
