import {Component} from 'react'
import {Navigate} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Register extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    window.location.replace('/')

  
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onformSubmit = async event => {
    
    event.preventDefault()
  
    const {username, password,email} = this.state
    
    const userDetails = {username, password,email}
   
const url=`http://localhost:3008/register`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
 
    const data = await response.json()
 
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwtToken)
    } else {
      this.onSubmitFailure(data.message)
    }
  }

  onusernameChange = event => {
    this.setState({username: event.target.value})
  }

  onpasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onemailChange= event => {
    this.setState({email: event.target.value})
  }

  render() {
    const {username, password,email, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Navigate to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-card-container">
          <img
            alt="website login"
            className="login-page-image"
            src="https://res.cloudinary.com/du6aueulp/image/upload/v1699595893/z6j1ajzrllbhxrxxpuuv.png"
          />
          <div className="login-form-card">
           
            <h1 className="login-heading">Register</h1>
            <form onSubmit={this.onformSubmit} className="form-card">
              <div className="form-label-div">
                <label className="login-form-label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  onChange={this.onusernameChange}
                  value={username}
                  className="login-form-input"
                  type="text"
                  id="username"
                />
              </div>
              <div className="form-label-div">
                <label className="login-form-label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  onChange={this.onpasswordChange}
                  value={password}
                  className="login-form-input"
                  type="password"
                  id="password"
                />
             
              </div>
              <div className="form-label-div">
                <label className="login-form-label" htmlFor="email">
                  EMAIL
                </label>
                <input
                  onChange={this.onemailChange}
                  value={email}
                  className="login-form-input"
                  type="text"
                  id="email"
                />
             
              </div>
              <button type="submit" className="login-button">
                Register
              </button>

            </form>
            {showSubmitError ? (
                  <p className="errorMsg">{errorMsg}</p>
                ) : null}
              </div>
        </div>
      </div>
    )
  }
}

export default Register