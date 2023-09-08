import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";

const initialState = { email: "", password: "" };
export default function Signin() {
  // const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSignin = (e) => {
    e.preventDefault();
    let { email, password } = state;

    // setIsProcessing(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        window.notify("user Signin successfuly", "success");
        // ...
        // setIsProcessing(false);
      })
      .catch((error) => {
        window.notify("something went worng", "error");
      });
    setState(initialState);
  };

  return (
    <div className="formDiv">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4 ">
            <form>
              <div className="card py-4 px-2">
                <h2 className="text-center text-white pb-3">Sign In</h2>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="mb-3 text-center">
                      <Link to={"/auth/ForgetPass"} id="ForgetPass">
                        Forget Password
                      </Link>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="mb-3 text-center">
                      <button
                        className="btn btn-dark text-white w-50 my-3"
                        onClick={handleSignin}
                        // loading={isProcessing}
                      >
                        Sign In
                      </button>
                      <div>
                        Don't have an account?{" "}
                        <Link to="/auth/signup" id="sign">
                          Sign Up
                        </Link>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
