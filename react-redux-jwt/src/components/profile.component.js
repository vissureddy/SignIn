import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { checkemail } from "../actions/auth";
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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);    
    this.onChangeEmail = this.onChangeEmail.bind(this);    
    this.state = {      
      email: "",      
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          checkemail(this.state.email)
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

  render() {
    const { message } = this.props;
    console.log(message)
    
    if(message=='success'){
      return <Redirect to="/login" />;
    }if(message=='failure'){
      return <Redirect to="/register" />;
    }
    
    return (

      <div className="col-md-12">
        <div className="card bg-light text-dark">

          <h1><center>news scoop</center></h1>


          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>      

                <div className="form-group">
                  <label htmlFor="email">Log in or create an account</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    placeholder='Email address'
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-dark btn-block">Continue</button>
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
  const { isLoggedIn } = state.auth;
  const { message } = state.auth;
  
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Profile);
