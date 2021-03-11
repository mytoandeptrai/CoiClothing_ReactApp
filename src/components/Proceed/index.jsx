import React from "react";
import "../../css/Proceed.scss";
import Fade from "react-reveal/Fade";
const Proceed = ({ setIsProceed }) => {
  return (
    <Fade right cascade={true}>
      <div className="cart">
        <form>
          <ul className="form-container">
            <li>
              <h1>
                Please fill up your information into the form below here !
              </h1>
            </li>
            <li>
              <label htmlFor="">Email</label>
              <input name="email" type="email" required />
            </li>
            <li>
              <label htmlFor="">Name</label>
              <input name="name" type="text" required />
            </li>
            <li>
              <label htmlFor="">Address</label>
              <input name="address" type="text" required />
            </li>
            <li>
              <div className="form__container--btn">
                <button className="button primary" type="submit">
                  Checkout
                </button>
                <button
                  className="button primary"
                  onClick={() => setIsProceed(false)}
                >
                  Comeback your Cart
                </button>
              </div>
            </li>
          </ul>
        </form>
      </div>
    </Fade>
  );
};

export default Proceed;
