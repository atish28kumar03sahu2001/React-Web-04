import React, {useState} from "react";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import {app} from "../Database/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import '../Styles/Signup.css';
const Login = ({setIsLoggedIn}) => {
    const [uemail, setUemail] = useState("");
    const [upassword, setUpassword] = useState("");
    const [ucpassword, setUcpassword] = useState("");
    const [PasswordVisible, SetPasswordVisible] = useState(false);
    const [CPasswordVisible, CSetPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const LogInHandler = (event) => {
        event.preventDefault();
        if (upassword !== ucpassword) {
            alert("Password Do Not Match!");
            return;
        }
        const AUTH = getAuth(app);
        signInWithEmailAndPassword(AUTH, uemail, upassword)
            .then(res => {
                console.log(res.user);
                setUemail("");
                setUpassword("");
                setUcpassword("");
                setIsLoggedIn(true);
                localStorage.setItem("UserMail", uemail);
                navigate("/MailBox");
            })
            .catch(error => console.log(error.message))
    }

    //Send Reset Password Email
    const HandleResetPassword = async () => {
        try {
            const AUTH = getAuth(app);
            await sendPasswordResetEmail(AUTH, uemail);
            alert(`Password Reset Mail Sent To The ${uemail}. Check Your Inbox`);
        } catch (error) {
            alert(error.message);
        }
    }
        
    const togglePasswordVisibility = () => {
        SetPasswordVisible(!PasswordVisible);
    }
    const ctogglePasswordVisibility = () => {
        CSetPasswordVisible(!CPasswordVisible);
    }
    return (
        <>
            <div className="SGHD">
                <h1 className="SGH1">User Log In Section!</h1>
            </div>
            <div className="SGFRMC">
                <form className="SGFRM" onSubmit={LogInHandler}>
                    <div className="FRMD">
                        <label className="LBL" htmlFor="useremail">User Email:</label>
                        <div className="IPD">
                            <input required className="IP" type="email" autoComplete="user-email" placeholder="User Email" onChange={e => setUemail(e.target.value)} />
                        </div>
                    </div>
                    <div className="FRMD">
                        <label className="LBL" htmlFor="userpassword">User Password:</label>
                        <div className="IPD">
                            <input required className="IP" type={PasswordVisible ? "text" : "password"} autoComplete="new-password" placeholder="User Password" onChange={e => setUpassword(e.target.value)} />
                            <FontAwesomeIcon icon={PasswordVisible ? faEye : faEyeSlash} size="sm" style={{ color: "#ffffff", cursor: "pointer" }} onClick={togglePasswordVisibility} />
                        </div>
                    </div>
                    <div className="FRMD">
                        <label className="LBL" htmlFor="confirmpassword">Confirm Password:</label>
                        <div className="IPD">
                            <input required className="IP" type={CPasswordVisible ? "text" : "password"} autoComplete="confirm-password" placeholder="Confirm Password" onChange={e => setUcpassword(e.target.value)} />
                            <FontAwesomeIcon icon={CPasswordVisible ? faEye : faEyeSlash} size="sm" style={{ color: "#ffffff", cursor: "pointer" }} onClick={ctogglePasswordVisibility} />
                        </div>
                    </div>
                    <div className="lgD">
                        <Link className="lgn" to="/Signup">
                            Don't Have Any Account!
                        </Link>
                    </div>
                    <div className="SGDB">
                        <button className="SGB1" type="button" onClick={HandleResetPassword}>Forget Password</button>
                    </div>
                    <div className="SGDB">
                        <button className="SGB LG" type="submit">Log In</button>
                    </div>
                </form>
            </div>
        </>
    );
}
export default Login;