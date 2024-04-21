import React, {useState} from "react";
import {getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail} from "firebase/auth";
import {app} from "../Database/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import '../Styles/Signup.css';
const Signup = () => {
    const [uemail, setUemail] = useState("");
    const [upassword, setUpassword] = useState("");
    const [ucpassword, setUcpassword] = useState("");
    const [PasswordVisible, SetPasswordVisible] = useState(false);
    const [CPasswordVisible, CSetPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const SignUpHandler = async (event) => {
        event.preventDefault();
        if (upassword !== ucpassword) {
            alert("Password Do Not Match!");
            return;
        }
        const AUTH = getAuth(app);
        try {
            const methods = await fetchSignInMethodsForEmail(AUTH, uemail);
            if (methods.length > 0) {
                alert(`${uemail} Is Already Exist`);
                return;
            }
            const res = await createUserWithEmailAndPassword(AUTH, uemail, upassword);
            console.log(res.user);
            alert(`${uemail} Created Successfully!`);
            setUemail(""); setUpassword(""); setUcpassword("");
            navigate("/Login");
        } catch (error) {
            console.log(error.message);
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
                <h1 className="SGH1">User Sign Up Section!</h1>
            </div>
            <div className="SGFRMC">
                <form className="SGFRM" onSubmit={SignUpHandler}>
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
                        <Link className="lgn" to="/Login">
                            Already Have Account!
                        </Link>
                    </div>
                    <div className="SGDB">
                        <button className="SGB SU" type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    );
}
export default Signup;