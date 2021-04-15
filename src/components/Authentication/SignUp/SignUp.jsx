import fire from "firebase";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import TextField from "../TextField";

const SignUp = () => {
  const history = useHistory();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validate = Yup.object({
    firstName: Yup.string()
      .max(10, "Must be 10 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(10, "Must be 10 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Required"),
    password: Yup.string()
      .max(12, "Must be 12 characters or less")
      .required("Required"),
    confirmPassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    }),
  });
  const handleSignUp = (email, password) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/login");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setEmailError(error.message);
            break;
          case "auth/invalid-email":
            setEmailError(error.message);
            break;
          case "auth/weak-password":
            setPasswordError(error.message);
            break;
          default:
            break;
        }
      });
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSignUp(values.email, values.password);
          resetForm();
          setSubmitting(false);
        }}
        validationSchema={validate}
      >
        {(formikProps) => {
          return (
            <>
              <Form>
                <TextField
                  className="inputBox"
                  span="FirstName"
                  type="text"
                  name="firstName"
                />
                <TextField
                  className="inputBox"
                  span="LastName"
                  type="text"
                  name="lastName"
                />
                <TextField
                  className="inputBox"
                  span="Email"
                  type="text"
                  name="email"
                  error={emailError}
                />
                <TextField
                  className="inputBox"
                  span="Password"
                  type="password"
                  name="password"
                  error={passwordError}
                />
                <TextField
                  className="inputBox"
                  span="ConfirmPassword"
                  type="password"
                  name="confirmPassword"
                />
                <p>
                  Have you have an account ?{" "}
                  <span>
                    <Link to="/login">Login</Link>
                  </span>
                </p>
                <button type="submit">Register</button>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default SignUp;
