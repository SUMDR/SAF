import {Component} from 'react'
import {Navigate} from 'react-router-dom'


import Cookies from 'js-cookie'

import './index.css'

import google from '../../../src/icons8-google-48.png'

class Login extends Component {
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
  
    const {username, password} = this.state
    const userDetails = {username, password}
const url=`http://localhost:3008/login`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
 
    const data = await response.json()
    console.log(data)
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

  onGoogleLogin = async () => {
    window.location.replace('http://localhost:3008/auth/google')
  };

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
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
           
            <h1 className="login-heading">Log In to Proceed Next...</h1>
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
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError ? (
                  <p className="errorMsg">{errorMsg}</p>
                ) : null}

            </form>
            <div className="google-container">
            <div className="or-divider">
  <div className="or-text">or</div>

</div>
<div className='google-image'>


<img src={google}  alt="google" className='google-logo'/>
<button  onClick={this.onGoogleLogin} className='login-button-google'>Log in with Google</button>
</div>


           </div>
           
            <p>New User ? <a href="/register">Register</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Login