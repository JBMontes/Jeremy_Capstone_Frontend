import React, { useState, useEffect } from 'react';
import { useLoginDataProvider } from "../Components/LoginProvider";
import EditMedicalHistory from "./EditMedicalHistory";
import '../Styles/MedicalHistoryFetch.css'

const MedicalHistoryFetch = ({ setShowMedicineCabinet }) => {
    const { API, token } = useLoginDataProvider();
    const [medHistory, setMedHistory] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const handleEditClick = () => {
        setEditMode(true);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            setError("");


            const response = await fetch(`${API}/users/medical`, {
                headers: {
                    "Authorization": token
                }
            });

            const data = await response.json();

            if (response.ok) {
                setMedHistory(data);
            } else {
                throw new Error(data.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [API, token])


    const handleEditCancel = () => {
        setEditMode(false);
    };

    const renderContent = () => {

        return (
            <div className='medicalBody'>
                {!editMode && medHistory.length > 0 && medHistory && (
                    <>
                        {medHistory.map((person) => (
                            <div key={person.medical_id} className="personCard">
                                <h2>Medication: {person.medication}</h2>
                                <h2>Allergies: {person.allergies}</h2>
                                <h2>Blood Type: {person.blood_type}</h2>
                                <h2>Medical History: {person.medical_history}</h2>
                                <div>
                                    <img onClick={handleEditClick} className="editButtonMed" src='../DarkButton.svg' alt="Edit Emergency Contact" />
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {editMode && (
                    <EditMedicalHistory
                        medHistory={medHistory}
                        setEditMode={setEditMode}
                        handleEditCancel={handleEditCancel}
                        setShowMedicineCabinet={setShowMedicineCabinet}
                    />
                )}
            </div>
        );
    }
    return <div className="Med">{renderContent()}</div>
};

export default MedicalHistoryFetch;