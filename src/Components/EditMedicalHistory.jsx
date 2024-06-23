import React, { useState, useEffect } from 'react';
import { useLoginDataProvider } from "../Components/LoginProvider";
import '../Styles/EditMedicalHistory.css'

const EditMedicalHistory = ({ medHistory, setEditMode, handleEditCancel, setShowMedicineCabinet }) => {
    const { API, token } = useLoginDataProvider();
    const { medical_id } = medHistory[0]; 
    const [medicalHistory, setMedicalHistory] = useState({
        blood_type: medHistory[0].blood_type,
        allergies: medHistory[0].allergies,
        medication: medHistory[0].medication,
        medical_history: medHistory[0].medical_history,
    });

    const handleTextChange = (event) => {
        setMedicalHistory({ ...medicalHistory, [event.target.id]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${API}/users/medical/${medical_id}`, {
            method: "PUT",
            body: JSON.stringify(medicalHistory),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log( res);
            setEditMode(false); 
            setShowMedicineCabinet(false)
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="medicalHistoryForm">
            <form onSubmit={handleSubmit} className="newForm">
                <label htmlFor="allergies">Are you allergic to anything?</label>
                <input
                    id="allergies"
                    value={medicalHistory.allergies}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="ex. Bananas"
                    required
                />
     
     <label htmlFor="medication">Are you taking any medication? </label>
                <input
                    id="medication"
                    value={medicalHistory.medication}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="ex. Albuterol"
                    required
                />

                <label htmlFor="medical_history">Any Past Medical History?</label>
                <input
                    id="medical_history"
                    value={medicalHistory.medical_history}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="ex. Asthma, COPD"
                    required
                />
                <label htmlFor="blood_type">What's Your Blood Type?</label>
                <input
                    id="blood_type"
                    value={medicalHistory.blood_type}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="ex. A+"
                    required
                />
                <div className="submitButton">
                    <button type="submit">Submit</button>
                    <button onClick={handleEditCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditMedicalHistory;
