import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BackgroundImage = styled.div`
  background: url('bg.jpg');
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;

  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
  }
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  text-align: center;
  padding: 60px 32px;
  width: 370px;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);
`;

const Header = styled.header`
  color: white;
  font-size: 33px;
  font-weight: 600;
  margin: 0 0 35px 0;
  font-family: 'Montserrat', sans-serif;
`;

const Field = styled.div`
  position: relative;
  height: 45px;
  width: 100%;
  display: flex;
  background: rgba(255, 255, 255, 0.94);
  margin-top: ${(props) => (props.space ? "16px" : "0")};
`;

const Icon = styled.span`
  color: #222;
  width: 40px;
  line-height: 45px;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #222;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
`;

const ShowButton = styled.span`
  position: absolute;
  right: 13px;
  font-size: 16px;
  color: #222;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  display: ${(props) => (props.show ? "block" : "none")};

  i {
    font-size: 16px;
  }
`;

const PasswordLink = styled.div`
  text-align: left;
  margin: 10px 0;

  a {
    color: white;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SubmitButton = styled(Input)`
  background: #3498db;
  border: 1px solid #2691d9;
  color: white;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;

  &:hover {
    background: #2691d9;
  }
`;

const LoginText = styled.div`
  color: white;
  margin: 20px 0;
  font-family: 'Poppins', sans-serif;
`;

const SocialLinks = styled.div`
  display: flex;
  margin: 0 0 20px 0;
`;

const SocialButton = styled.div`
  width: 100%;
  height: 45px;
  line-height: 45px;
  margin-left: ${(props) => (props.first ? "0" : "10px")};
  background: ${(props) => (props.type === "facebook" ? "#4267B2" : "#E1306C")};
  border: 1px solid ${(props) => (props.type === "facebook" ? "#3e61a8" : "#df2060")};
  cursor: pointer;
  color: white;
  text-align: center;

  &:hover {
    background: ${(props) => (props.type === "facebook" ? "#3e61a8" : "#df2060")};
  }

  i {
    font-size: 17px;

    span {
      margin-left: 8px;
      font-weight: 500;
      letter-spacing: 1px;
      font-size: 16px;
      font-family: 'Poppins', sans-serif;
    }
  }
`;

const SignupText = styled.div`
  margin-top: 10px;
  font-size: 15px;
  color: white;
  font-family: 'Poppins', sans-serif;

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const App = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const navigate = useNavigate();
  
    const toggleForm = () => setIsLogin(!isLogin);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const url = isLogin ? "http://localhost:9876/api/auth/login" : "http://localhost:9876/api/auth/signup";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;
  
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        localStorage.setItem("user", JSON.stringify(result)); 
        if(result.auth){
          navigate("/board");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    return (
      <BackgroundImage>
        <Content>
          <Header>{isLogin ? "Login Form" : "Signup Form"}</Header>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <Field>
                <Icon className="fa fa-user" />
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                />
              </Field>
            )}
            <Field space>
              <Icon className="fa fa-envelope" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
            </Field>
            <Field space>
              <Icon className="fa fa-lock" />
              <Input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
              <ShowButton
                show
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <i className={passwordVisible ? "fa fa-eye-slash" : "fa fa-eye"} />
              </ShowButton>
            </Field>
            {!isLogin && (
              <Field space>
                <Icon className="fa fa-lock" />
                <Input
                  type={passwordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm Password"
                />
              </Field>
            )}
            <Field>
              <SubmitButton type="submit" value={isLogin ? "LOGIN" : "SIGNUP"} />
            </Field>
          </form>
          <SignupText>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a href="#" onClick={toggleForm}>
              {isLogin ? "Signup Now" : "Login Now"}
            </a>
          </SignupText>
        </Content>
      </BackgroundImage>
    );
  };
  
  export default App;