import fire from "firebase";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import TextField from "../TextField";
import "./SignIn.scss";
import Background from "../../../assets/image/background.jpg";
const SignIn = () => {
  const history = useHistory();
  const initialValues = {
    email: "",
    password: "",
  };
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Required"),
    password: Yup.string()
      .max(12, "Must be 12 characters or less")
      .required("Required"),
  });
  const handleLoginAsUser = (email, password) => {
    if (email === "admin@gmail.com" && password === "123123") {
      alert(
        "You are not an Admin!PLease check your email and password again ."
      );
    } else {
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push("/product");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
            case "auth/user-disable":
            case "auth/user-notfound":
              setEmailError(error.message);
              break;
            case "auth/wrong-password":
              setPasswordError(error.message);
              break;
            default:
              break;
          }
        });
    }
  };
  const handleLoginAsAdmin = (email, password) => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/admin");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (isAdmin) {
            handleLoginAsAdmin(
              values.email === "admin@gmail.com" ? values.email : "",
              values.password === "123123" ? values.password : ""
            );
          } else {
            handleLoginAsUser(values.email, values.password);
          }
          resetForm();
          setSubmitting(false);
        }}
        validationSchema={validate}
      >
        {(formikProps) => {
          return (
            <>
              {/* {isAdmin ? (
                <>
                  <Form>
                    <h1>Admin</h1>
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
                    <p>
                      Are you an User ?
                      <span onClick={() => setIsAdmin(false)}>
                        {" "}
                        Click here{" "}
                      </span>
                    </p>
                    <button type="submit">Login</button>
                  </Form>
                </>
              ) : (
                <>
                  <Form>
                    <h1>User</h1>
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
                    <p>
                      Don't have an account?{" "}
                      <span>
                        <Link to="/register">Register</Link>
                      </span>
                    </p>
                    <p>
                      Are you an Admin ?
                      <span onClick={() => setIsAdmin(true)}> Click here </span>
                    </p>
                    <button type="submit">Login</button>
                  </Form>
                  
                </>
              )} */}
              <section>
                <div className="imgBx">
                  <img src={Background} alt="Background img" />
                </div>
                <div className="contentBx">
                  <div className="formBx">
                    {isAdmin ? (
                      <>
                        <Form>
                          <h2>Admin</h2>
                          <div className="inputBx">
                            <TextField
                              className="inputBox"
                              span="Email"
                              type="text"
                              name="email"
                              error={emailError}
                            />
                          </div>
                          <div className="inputBx">
                            <TextField
                              className="inputBox"
                              span="Password"
                              type="password"
                              name="password"
                              error={passwordError}
                            />
                          </div>
                          <div className="btnBx">
                            <p>
                              Are you an User ?
                              <span onClick={() => setIsAdmin(false)}>
                                {" "}
                                Click here{" "}
                              </span>
                            </p>
                          </div>
                          <div className="inputBx">
                            <input type="submit" value="Login" />
                          </div>
                        </Form>
                      </>
                    ) : (
                      <>
                        <Form>
                          <h2>User</h2>
                          <div className="inputBx">
                            <TextField
                              className="inputBox"
                              span="Email"
                              type="text"
                              name="email"
                              error={emailError}
                            />
                          </div>
                          <div className="inputBx">
                            <TextField
                              className="inputBox"
                              span="Password"
                              type="password"
                              name="password"
                              error={passwordError}
                            />
                          </div>
                          <div className="btnBx">
                            <p>
                              Are you an Admin ?
                              <span onClick={() => setIsAdmin(true)}>
                                {" "}
                                Click here{" "}
                              </span>
                            </p>
                          </div>
                          <div className="inputBx">
                            <input type="submit" value="Login" />
                          </div>
                          <div className="inputBx">
                            <p>
                              Don't have an account ?{" "}
                              <Link to="/register">Register</Link>{" "}
                            </p>
                          </div>
                        </Form>
                      </>
                    )}
                  </div>
                </div>
              </section>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default SignIn;
