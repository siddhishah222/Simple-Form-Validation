import React, { Component } from 'react';
import './form.css';
import FormErrors from './FormErrors';

class Form extends Component{
     constructor(props){
         super(props);
         this.state={
             email:'',
             password:'',
             formErrors: {email: '', password:''},
             emailValid: false,
             passwordValid:false,
             formValid: false
         }
     }

     validateField(fieldName,value){
         let fieldValidationErrors= this.state.formErrors;
         let emailValid=this.state.emailValid;
         let passwordValid=this.state.passwordValid;

         switch(fieldName){
             case 'email':
                 emailValid=value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})/i);
                 fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                 break;
             case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password=passwordValid? '':'is too short';
                break;
             default:
                 break;
         }
         this.setState({formErrors:fieldValidationErrors,
                    emailValid:emailValid,
                    passwordValid:passwordValid
                    },this.validationForm);
     }
     validationForm(){
         this.setState({formValid:this.state.emailValid && this.state.passwordValid});
     }

     handleUserInput=(e)=>{
         const name= e.target.name;
         const value=e.target.value;
         this.setState({[name]: value}, ()=>{ this.validateField(name,value)})
     }

     errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
     }
     render(){
         return(
            <div>
            <FormErrors formErrors={this.state.formErrors} />
          
            <form className="form">
                <h2 className="h2">Create New Account</h2>
                  <div className="div">
                    <label htmlFor="FullName">Full Name</label>               
                     &nbsp;&nbsp; &nbsp; &nbsp;
                    <input type="text"  name="FullName"  onChange={this.handleUserInput}/> 
                  </div>

                  <br/>
                  <div className="div">
                    <label htmlFor="email">Email ID</label>
                    &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                    <input type="email" name="email" value={this.state.email} onChange={(event) => this.handleUserInput(event)}/>
                 </div>

                 <br/>
                 <div className="div">
                 <label htmlFor="password">Password</label>
                 &nbsp;&nbsp; &nbsp; &nbsp;
                 <input type="password" name="password" value={this.state.password} onChange={(event) => this.handleUserInput(event)}/>
                 </div>
                 <br/>
                 <button type="submit" className="button" disabled={!this.state.formValid}>
                    Sign up
                 </button>
            </form>  
            </div>
         )
     }
}

export default Form;