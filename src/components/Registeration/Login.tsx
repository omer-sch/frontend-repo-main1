import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import './Login.css';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { loginUser } from '../../services/user-service'; // Import loginUser function

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory(); // Initialize useHistory hook

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
  
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
  
    if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters long.");
      return;
    }
  
    try {
      await loginUser({email, password});
  
      history.push('/');
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password. Please try again.");

    }
  };

  const validateEmail = (email: string) => {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  };

  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log("Google login successful:", credentialResponse);
  };

  const onGoogleLoginFailure = () => {
    console.log("Google login failed");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <input
        ref={emailInputRef}
        type="email"
        className="login-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailInputRef.current?.value && !emailInputRef.current.value.includes('@') &&
       ( <p className="text-white">Invalid email</p>)}
             {emailError && <p className="error-message">{emailError}</p>}
      <input
        ref={passwordInputRef}
        type="password"
        className="login-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordInputRef.current?.value && passwordInputRef.current.value.length < 3 && passwordInputRef.current.value.length > 20 && 
      (<p className="text-white">Password must be between 3 to 20 letters</p>)}
      {passwordError && <p className="error-message">{passwordError}</p>}
      <button type="button" className="login-button" onClick={handleLogin}>Login</button>
      <div className='google'>
        <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />
      </div>
      <Link to="/register" className="register-link">Don't have an account? Register here.</Link>
    </div>
  );
  
}

// function setCookie(name: string, value: string, days: number) {
//   let expires = "";
//   if (days) {
//       const date = new Date();
//       date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//       expires = "; expires=" + date.toUTCString();
//   }
//   document.cookie = name + "=" + (value || "") + expires + "; path=/";
// }

// function getCookie(name: string) {
//   const nameEQ = name + "=";
//   const ca = document.cookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) === ' ') c = c.substring(1, c.length);
//       if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }


// setCookie('user_id', 'your_user_id_here', 30); // Set a cookie named 'user_id' with the user's identifier, which expires in 30 days


// const userId = getCookie('user_id');
// if (userId) {
//   console.log('User is logged in automatically with user ID:', userId);
// }

export default Login;
