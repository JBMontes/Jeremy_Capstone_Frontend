import React from 'react';
import "../Styles/HomePage.css"
import { useLoginDataProvider } from "../Components/LoginProvider"
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import MedicalHistoryFetch from '../Components/MedicalHistoryFetch';


const HomePage = () => {

    const { API, token, user } = useLoginDataProvider()
    const [showMedicineCabinet, setShowMedicineCabinet] = useState(false);
    const navigate = useNavigate();

    const tellTime = () => {
        let today = new Date()
        let readableDate = today.toDateString()
        return readableDate
    }


    const toggleMedicineCabinet = () => {
        setShowMedicineCabinet(!showMedicineCabinet);
    };

    const goToVillages = () => {
        navigate('/users/villages');
    };

    const goToEmergencyContacts = () => {
        navigate('/users/contacts');
    };

    const goToEditProfile = () => {
        navigate('/users/edit-profile')
    }

    return (
        <div className="homePageBody">
            <div>

                <h2 className="time">{tellTime()}</h2>
            </div>
            <div className="HomePage">

                <div className='userNameAndButton' >
                    <h2 className="userName">{user.username} </h2>

                    <p className="editPButton" onClick={goToEditProfile} title="Edit Profile">⚙️</p>

                </div>
                <div className="buttons">
                 
                    <Link to={`/users/emergency`} style={{ margin: '0', padding: '0' }}> <img className="SoSButton" src='../Help-button.svg' alt="Emergency Button" title="Emergency Button" />  </Link>
                    <button className="villagesButton" onClick={goToVillages}>VILLAGES</button>
                    <button className="emergencyContactButton" onClick={goToEmergencyContacts}>EMERGENCY CONTACTS</button>

                </div>
            </div>
        </div>
    );
};

export default HomePage;