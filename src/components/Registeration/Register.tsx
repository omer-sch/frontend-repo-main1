import { useState, useRef } from 'react';
import avatar from '../../assets/ava.png';
import './Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { uploadPhoto } from '../../services/file-service';
import { registerUser, GoogleSignin, IUser } from '../../services/user-service';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory hook
import { hasRefreshToken } from '../../services/token-service'; // 

function Register() {
  const [ImgSrc, setImg] = useState<File>();
  const [isImageSelected, setIsImageSelected] = useState(false); // State to track if an image is selected
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory(); // Initialize useHistory hook

  const onImgSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    if (event.target.files && event.target.files.length > 0) {
      const newUrl = event.target.files[0];
      setImg(newUrl);
      setIsImageSelected(true);
    }
  };

  const onRegister = async () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (!nameInputRef.current?.value || !emailInputRef.current?.value || !passwordInputRef.current?.value) {
      alert("Please fill all fields.");
      return;
    }

    if (!isImageSelected) {
      alert("Please select an image.");
      return;
    }

    const url = await uploadPhoto(ImgSrc!);
    console.log("upload returned: " + url);

    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (name && (name.length < 2 || name.length > 30 || !name.includes(' '))) {
      setNameError("Name must have 2 until 30 characters and contain space");
      console.log(nameError)
      return;
    }

    if (email && !email.includes('@')) {
      setEmailError("Invalid email");
      console.log(emailError)

      return;
    }

    if (password && (password.length < 4 || password.length > 20)) {
      console.log(passwordError)

      setPasswordError("Password must have 4 until 20 characters");
      return;
    }

    const user: IUser = {
      name: name!,
      email: email!,
      password: password!,
      imgUrl: url
    };

    try {
      const refreshToken = hasRefreshToken();
    
      await registerUser(user)
        .then(res => {
          if (res) {
            const userId = res._id; 
            const access = res.accessToken;
            console.log("User registered with ID:", userId);
            console.log("User registered with access token:", access);
            console.log("User registered with refresh token:", refreshToken);
    
            localStorage.setItem('userId', userId as string);
            localStorage.setItem('ACCESS_TOKEN_KEY', access as string);
            localStorage.setItem('REFRESH_TOKEN_KEY', JSON.stringify(refreshToken));
    
            user._id = userId;
          } else {
            console.error("Error registering user: Response is undefined");
          }
        })
        .catch(err => {
          console.error("Error registering user:", err);
        });
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/login');
    } catch (e) {
      console.log("Registration error", e);
    }
  };

  const selectImg = () => {
    console.log('Select Img');
    fileInputRef.current?.click();
  };

  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    try {
      const res = await GoogleSignin(credentialResponse);
      console.log(res);
  
      if (res) {
        const { _id, accessToken } = res;
        const refreshToken = hasRefreshToken();
  
        console.log("User registered with ID:", _id);
        console.log("User registered with access token:", accessToken);
        console.log("User registered with refresh token:", refreshToken);
  
        localStorage.setItem('userId', res._id ?? '');
  
        const user: IUser = {
          _id,
          name: res.name,
          email: res.email,
          password: res.password,
          imgUrl: res.imgUrl // Assuming you have imgUrl in the response
        };
  
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect user to the desired page
        history.push('/');
      } else {
        console.error("Error registering user: Response is undefined");
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  // const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
  //   console.log(credentialResponse);
  //   try {
  //     const res = await GoogleSignin(credentialResponse);
  //     console.log(res);
  //     history.push('/');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const onGoogleLoginFailure = () => {
    console.log("Google login Failed");
  };


  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <div className="d-flex justify-content-center position-relative">
        <input ref={fileInputRef} id="avatar" type="file" className="avatar-input" onChange={onImgSelected} />
        {ImgSrc ? (<img src={URL.createObjectURL(ImgSrc)} alt="avatar" className="avatar-preview" />) : (
          <img src={avatar} alt="avatar" className="avatar-preview" />)}
        <button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
          <FontAwesomeIcon icon={faImage} className='fa-xl' />
        </button>
      </div>
      {!isImageSelected && <p className="text-white">Please select an image</p>}

      <input ref={nameInputRef} type="text" className="register-input" placeholder="Full Name" />
      {nameInputRef.current?.value && (nameInputRef.current.value.length < 2 || nameInputRef.current.value.length > 30 || !nameInputRef.current.value.includes(' ')) && (
        <p className="text-white">Name must have 2 until 30 characters and contain space</p>)}
      <input ref={emailInputRef} type="email" className="register-input" placeholder="Email" />
      {emailInputRef.current?.value && !emailInputRef.current.value.includes('@') && ( <p className="text-white">Invalid email</p>)}
      <input ref={passwordInputRef} type="password" className="register-input" placeholder="Password" />
      {passwordInputRef.current?.value && (passwordInputRef.current.value.length < 4 || passwordInputRef.current.value.length > 20) && ( <p className="text-white">Password must have 4 until 20 characters</p>)}
      <button type="submit" className="register-button" onClick={onRegister}>Register</button>

      <div className='google'>
        <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />
        
      </div>
      <Link to="/login" className='link'>Already have an account? Login here.</Link>

    </div>
  );
}

export default Register;
