import React, { memo, useState } from "react";
import "./style.scss";
import { ROUTERS } from "utils/router";
import { MdOutlineDisabledByDefault } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 


const Signin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleExitClick = () => {
    navigate(ROUTERS.USER.HOME);
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <button className="exit-button" onClick={handleExitClick}>
          <MdOutlineDisabledByDefault/>    
        </button>
        <h1>Đăng Nhập</h1>

        <form>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" placeholder="Enter your phone" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fas ${
                    passwordVisible ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
          </div>

          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>

        <div className="signup-link">
          Bạn chưa có tài khoản? <a href={ROUTERS.USER.SIGNUP}>Đăng kí</a>
        </div>
      </div>
    </div>
  );
};

export default memo(Signin);