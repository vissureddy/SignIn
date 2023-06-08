import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import validator from 'validator'

import { connect } from "react-redux";
import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username  must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword1 = (value) => {
 
  if (validator.isStrongPassword(value, {
    minLength: 8, minLowercase: 1,
    minUppercase: 1, minNumbers: 1, minSymbols: 1, pointsPerUnique:1
  })) {
    
  } else {
    
    return (
      <div className="alert alert-danger" role="alert">
        password is not strong
      </div>
    );
  }
}

const vpassword = (value) => {
  if (value.length < 8 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 8 and 40 characters.
      </div>
    );
  }
};

const confirmpassword = (value) => {  
  if (value!==value) {
    return (
      <div className="alert alert-danger" role="alert">
        password not matching
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmpassword = this.onChangeConfirmpassword.bind(this);
    this.onChangeLname = this.onChangeLname.bind(this);
    this.onChangePhnum = this.onChangePhnum.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      phnum:"",
      confirmpassword:"",
      fname:"",
      lname:"",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

   onChangeConfirmpassword(e) {
    this.setState({
      confirmpassword: e.target.value,
    });
  }
  onChangeLname(e) {
    this.setState({
      lname: e.target.value,
    });
  }
  onChangePhnum(e) {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (e.target.value =='' || re.test(e.target.value)) {
      this.setState({
        phnum: e.target.value,
      });
    }
    
  }

  handleRegister(e) {

    console.log(this.state.username)
    console.log(this.state.password)
    console.log(this.state.confirmpassword)
    if(this.state.password != this.state.confirmpassword){
      alert('password and confirm password are not matched');
    }
    
    if(this.state.password == this.state.confirmpassword){
      
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.state.username, this.state.email, this.state.password, this.state.lname, this.state.phnum)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }
  }

  render() {
    const { message } = this.props;

    return (

      <div className="col-md-12">
        <div className="card bg-light text-dark">

          <h1><center>User Registration </center></h1>


          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                

                <div className="form-group">
                  
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder='Email Address'
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>
                <div className="form-group">                 
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder='First Name'
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
                  <div className="form-group">
                   <Input
                    type="text"
                    className="form-control"
                    name="lname"
                    placeholder='Last Name'
                    onChange={this.onChangeLname}
                    value={this.state.lname} 
                  />
                </div>  
                <div className="form-group">                  
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword1]}
                  />
                </div>

                <div className="form-group">                  
                  <Input
                    type="password"
                    className="form-control"
                    name="confirmpassword"
                    placeholder='Confirm Password'
                    value={this.state.confirmpassword}   
                    onChange={this.onChangeConfirmpassword}           
                    validations={[required, confirmpassword]}
                  />
                </div>

                <div className="form-group">                  
                  <Input                    
                    type="number"
                    pattern="[0-9]*"
                    className="form-control"
                    name="phnum"
                    placeholder='Mobile Number'
                    onChange={this.onChangePhnum}
                    value={this.state.phnum}                  
                    
                  />
                </div>            
                
            <div className="form-group">
              <button className="btn btn-dark btn-block">Sign Up</button>
             </div> 
            </div>
            )}

            {message && (
              <div className="form-group">
                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
