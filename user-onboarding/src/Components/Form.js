import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

// form validation
const formSchema = yup.object().shape({
  name: yup.string().required("Please enter your name."),
  email: yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password should be 8 characters minimum."),
  checkbox: yup
    .boolean()
    .oneOf([true], "Please agree to Terms and Conditions."),
});

export default function Form() {
  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    checkbox: "",
  });

  // error states
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    checkbox: "",
  });

  // button state
  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setError({
          ...error,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        setError({
          ...error,
          [event.target.name]: err.errors,
        });
      });
  };

  // set post state
  const [post, setPost] = useState([]);

  // onSubmit function
  const formSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => {
        setPost(response.data); // get just the form data from the REST api
        // console.log("YOU WIN!", post);
        setFormState({
          // reset form if successful
          name: "",
          email: "",
          password: "",
          checkbox: "",
        });
      })
      .catch((err) => console.log(err.response));
  };

  // onChange function
  const inputChange = (event) => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    };

    validateChange(event);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <div>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={inputChange}
          />
          {error.name.length > 0 ? <p className="error">{error.name}</p> : null}
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="text"
            name="email"
            value={formState.email}
            onChange={inputChange}
          />
          {error.email.length > 0 ? (
            <p className="error">{error.email}</p>
          ) : null}
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            minlength="8"
            value={formState.password}
            onChange={inputChange}
          />
          {error.password.length < 8 ? (
            <p className="error">{error.password}</p>
          ) : null}
        </label>
      </div>
      <div>
        <label htmlFor="checkbox">Terms and Conditions</label>
        <input
          type="checkbox"
          id="checkbox"
          name="checkbox"
          checked={formState.checkbox}
          onChange={inputChange}
        />
      </div>
      <pre>{JSON.stringify(post, null, 2)}</pre> {/* displays form data */}
      <button disabled={buttonDisabled}>Submit</button>
    </form>
  );
}
