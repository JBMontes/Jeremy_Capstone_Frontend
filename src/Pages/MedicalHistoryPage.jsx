import React from 'react';
import MedicalHistoryForm from '../Components/MedicalHistoryForm';
import { useState } from 'react';
import { useLoginDataProvider } from "../Components/LoginProvider"
import { useNavigate } from 'react-router-dom';

const MedicalHistoryPage = () => {

    const { user } = useLoginDataProvider()
    const [showBlurb, setShowBlurb] = useState(false)
    const toggleBlurb = () => {
        setShowBlurb(!showBlurb);
    };
    
    const navigate = useNavigate();
    const handleSkip = () => {
        navigate('/users/home');
      };

    return (
        <div>

            <h2>Medical Questionnaire <span onClick={toggleBlurb}>?</span></h2>

            {showBlurb && (
                <div className="blurb">
                    <p>

                        While it's not required,
                        this optional medical form can be extremely helpful in the event of an emergency to have
                        your medical information on hand for medical personnel.
                    </p>
                </div>
            )}
            <MedicalHistoryForm />
            <button onClick={handleSkip} className="skip">Skip</button>
        </div>
    );
};

export default MedicalHistoryPage;