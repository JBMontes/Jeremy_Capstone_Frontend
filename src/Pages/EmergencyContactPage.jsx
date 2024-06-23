import React from 'react';
import EmergencyContactsForm from '../Components/EmergencyContactsForm';
import '../Styles/EmergencyContactPage.css'
import { useState } from 'react';
import { useLoginDataProvider } from "../Components/LoginProvider"

const EmergencyContactPage = () => {

    const { API, user } = useLoginDataProvider()
    const [showBlurb, setShowBlurb] = useState(false)
    const toggleBlurb = () => {
        setShowBlurb(!showBlurb);
    };
    return (
        <div className="emergencyContactPage">
          
            <h2>Emergency Contact Form <span onClick={toggleBlurb}>?</span></h2>

            {showBlurb && (
                <div className="blurb-EC">
                    <p>
                        Add your emergency contacts below. These contacts will be notified in case of an emergency.
                    </p>
                </div>
            )}
            <EmergencyContactsForm />

        </div>

    );
};

export default EmergencyContactPage;