import React from 'react';
import { useState, useEffect } from 'react';
import MedicalHistoryFetch from '../Components/MedicalHistoryFetch';
import { Link } from "react-router-dom";
import MedicalHistoryPage from './MedicalHistoryPage';
import {useLoginDataProvider} from '../Components/LoginProvider';
import "../Styles/MedHistoryFetch.css"

const MedHistoryFetch = () => {
    const { API, user, token } = useLoginDataProvider()
    const [medHistory, setMedHistory] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

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
            console.log("error:" , error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [API,token])


    return (
        <div className="medCab">
            <h2>Medicine Cabinet</h2>
    
            <div className="mCard">
                {loading ? (
                    <div>
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c4954169321565.5b7d0cbe74d11.gif" alt="loading" style={{ width: '500px', height: '500px', borderRadius: '80px'}} />{" "}
                    </div>
                ) : (
                    <>
                        {medHistory && medHistory.length > 0 && Array.isArray(medHistory) ? (
                            <div className="historyFetch">
                                <p> <MedicalHistoryFetch /> </p>
                                <Link to="/users/home"><button className="backB">Back</button></Link>
                            </div>
                        ) : (
                            <MedicalHistoryPage />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MedHistoryFetch;