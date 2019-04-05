import React, { Component } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      displayUserMsg: false,
    }
  }

  hideUserMsg = () => {
    this.setState({displayUserMsg: false});
  }

  displayUserMsg = () => {
    this.setState({displayUserMsg: true});
  }

  submit = (values, actions) => {
    console.log(values);
    console.log(actions);
    this.displayUserMsg();
  }

  render() {

    let initialValues = { 
      lastName: '',
      firstName: ''
    }

    let userMsg = (
      <div className="alert alert-success" role="alert">
        La modification a été enregistrée avec succès ! 
      </div> 
    )

    return (
      <div className="App">
        <h2>Test formulaire et messages utilisateurs</h2>
        { this.state.displayUserMsg && userMsg }

        <Formik
            onSubmit={ this.submit }
            initialValues={ initialValues }
            validateOnBlur={ false }
            validateOnChange={ false }
            >
            { ({
                handleSubmit,
                isSubmitting,
            }) => (
                
                <form onSubmit={ handleSubmit } className="bg-white border p-4">
                  
                  <div className="my-1 text-right">
                    <button type="submit" disabled={ isSubmitting } className="btn btn-primary">Enregistrer</button>
                  </div>

                  <Field onBlur={this.hideUserMsg} placeholder="firstName" label="firstName" name="firstName" type="text" component={ CustomInput } />
                  <ErrorMessage name="firstName" component={ CustomError } />

                  <Field placeholder="lastName" label="lastName" name="lastName" type="text" component={ CustomInput } />
                  <ErrorMessage name="lastName" component={ CustomError } />

                </form>                
            )}
        </Formik>

      </div>
    );
  }
}


const CustomInput = ({ field, form: { errors }, ...props }) => {
  let cssClassName;
  if (field.name == 'userId') {
    cssClassName = 'd-none';
  } else {
    cssClassName = 'form-group';
  }
  return (
    <div className={cssClassName}>
      <label>{ props.label }</label>
      <input 
        { ...field } 
        { ...props } 
        className={errors[field.name] ? "is-invalid form-control" : "form-control"}
      />
    </div>
  )
}

const CustomError = (props) => {
  return (
    <div className="text-danger mb-4">{ props.children }</div> 
  )
}

export default App;
