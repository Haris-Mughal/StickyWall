import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../../config/firebase";

const initialState = { email: "" };
export default function Signin() {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  // const handleSignin = (e) => {
  //   e.preventDefault();
  //   const { email } = state;
  //   // signInWithEmailAndPassword( email )
  //     .then(() => {
  //       // Signed in

  //       window.notify("user Signin successfuly", "success");
  //       // ...
  //     })
  //     .catch((error) => {
  //       window.notify("something want worng", "error");
  //     });
  //   setState(initialState);
  // };

  return (
    <div className="formDiv">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4 ">
            <form>
              <div className="card py-4 px-2">
                <h2 className="text-center text-white pb-3">Forget Password</h2>
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
                    <div className="mb-3 text-center">
                      <Link to={"/auth/Signin"} id="RememberPass">
                        Remember Password
                      </Link>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3  text-center ">
                      <button
                        className="btn btn-dark text-white w-50 my-3"
                        // onClick={handleSignin}
                      >
                        Submit
                      </button>
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
