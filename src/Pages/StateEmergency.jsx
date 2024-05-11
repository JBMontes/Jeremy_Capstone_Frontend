import React, { useState, useEffect } from 'react';
import FetchLocation from "../Components/FetchLocation.jsx";
import UserLocation from '../Components/UserLocation.jsx';
import '../Styles/StateEmergency.css'
import { useLoginDataProvider } from '../Components/LoginProvider';
import SpeechToText from '../Components/SpeechToText.jsx';
import MedicalConfirmationModal from '../Components/MedicalConfirmationModal.jsx';

const StateEmergency = ({ setTranscription }) => {
    const [villages, setVillages] = useState([]);
    const { user, API, token, userAddress, userLocation } = useLoginDataProvider();
    const [selectedVillage, setSelectedVillage] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [emergencyText, setEmergencyText] = useState('');
    const [villageUsers, setVillageUsers] = useState([]);
    const [selectedVillageId, setSelectedVillageId] = useState("");
    const [allNumbers, setAllNumbers] = useState([]);
    const [medHistory, setMedHistory] = useState([]);
    const [includeMedicalCabinet, setIncludeMedicalCabinet] = useState(false);
    const [is911VillageClicked, setIs911VillageClicked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonsHidden, setButtonsHidden] = useState(false);

    
    const handleMessageClick = () => {
        setIsModalOpen(true);
        setButtonsHidden(true);
    };

    const handleConfirmModal = () => {
        setIncludeMedicalCabinet(true);
        setIsModalOpen(false);
        setButtonsHidden(true);
    };

    const handleCloseModal = () => {
        setIncludeMedicalCabinet(false);
        setIsModalOpen(false);
        setButtonsHidden(true);
    };

    const cancelButton = () => {
        setIncludeMedicalCabinet(false);
        setShowDropdown(false);
        setIs911VillageClicked(false);
        showAlert(`Emergency Text successfully cancelled.`);
        setButtonsHidden(false);
    }

    const hideButtons = () => {
        setButtonsHidden(true);
    };
    
    //Grabs all the villages the user is associated with
    useEffect(() => {
        fetch(`${API}/users/villages`, {
            headers: {
                "Authorization": token
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setVillages(res);
            })
            .catch((error) => console.error("Error fetching villages:", error));
    }, [API, token]);

    //stores the village_id when a village is selected
    const handleVillageSelect = (e) => {
        const selectedVillageName = e.target.value;
        setSelectedVillage(selectedVillageName);

        const selectedVillageObject = villages.find(village => village.village_name === selectedVillageName);

        if (selectedVillageObject) {
            setSelectedVillageId(selectedVillageObject.village_id);
        }
    };

    const handleVillageClick = () => {
        setShowDropdown(!showDropdown);
    };

    const sendSMS = async (numbers, message) => {
        try {
            const response = await fetch(`${API}/sendSMS`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ to: numbers, message: message })
            });
            if (response.ok) {
                console.log('SMS sent successfully');
            } else {
                console.error('Failed to send SMS');
            }
        } catch (error) {
            console.error('Error sending SMS:', error);
        }
    };

    const sanitizeHTML = (html) => {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.textContent || temp.innerText;
    };

    //Send message and also checks whether to include medical information
    const handleEmergencySend = async () => {
        let message = emergencyText;
        if (includeMedicalCabinet) {
            message += '\n\n' + medicalTextMessage + '\n\n' + (userLocation ? `<a href="https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}">${userAddress}</a>` : '');
        } else {
            message += '\n\n' + (userLocation ? `<a href="https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}">${userAddress}</a>` : '')
        }

        message = sanitizeHTML(message);

        // Check if selectedVillage array has more than one element
        if (is911VillageClicked && selectedVillage) {
            try {
                console.log("Sending emergency text:", message);
                console.log('Emergency SMS sent successfully');
                
                showAlert(`Emergency Text sent successfully to ${selectedVillage}`);
                //   **uncomment to send message**
                await sendSMS(allNumbers, message);  

                dial911();

                setShowDropdown(false);

                setIs911VillageClicked(false);

                setButtonsHidden(false);



            } catch (error) {
                console.error('Failed to send emergency SMS:', error);
                showAlert('Failed to send emergency text');
            }
        } else if (selectedVillage) {
            try {
                console.log("Sending emergency text:", message);
                console.log('Emergency SMS sent successfully');
                showAlert(`Emergency Text sent successfully to ${selectedVillage}`);
                //comment out
                await sendSMS(allNumbers, message);  
                setShowDropdown(false);
                setButtonsHidden(false);

            } catch (error) {
                console.error('Failed to send emergency SMS:', error);
                showAlert('Failed to send emergency text');
            }
        } else {
            // Show alert that selectedVillage should have one element
            showAlert('Please select a village.');
        }
    };

    const showAlert = (message) => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert';
        alertElement.textContent = message;

        document.body.appendChild(alertElement);

        setTimeout(() => {
            alertElement.remove();
        }, 3000);
    };

    // Calls 911 for 911 + Village
    const dial911 = () => {
        const confirmDial = confirm('Dial 911?');

        if (confirmDial) {
            window.location.href = 'tel:911';
        }
    };

    //Grabs all the users in the selected village
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}/users/village-users/${selectedVillageId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': token
                    },
                });
                const data = await response.json();

                if (Array.isArray(data)) {
                    const usersWithInfo = await Promise.all(data.map(async (user) => {
                        const userInfoResponse = await fetch(`${API}/users/${user.user_id}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': token
                            },
                        });
                        const userInfo = await userInfoResponse.json();
                        return { ...user, userInfo };
                    }));
                    setVillageUsers(usersWithInfo);
                } else {
                    // console.error("Data is not an array:", data);
                    // Handle the error or set an empty array based on your needs
                    setVillageUsers([]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [selectedVillageId, API, token]);

    //allNumbers holds the array of numbers when sending village message
    useEffect(() => {
        const numbers = villageUsers.map(user => user.userInfo.phone_number);
        setAllNumbers(numbers);
    }, [villageUsers]);

    //Medicine cabinet for the user in case of emergency
    useEffect(() => {
        fetch(`${API}/users/medical`, {
            headers: {
                "Authorization": token
            }
        })
            .then((res) => res.json())
            .then((res) => setMedHistory(res))
            .catch((error) => console.error('Error fetching medical history:', error));
    }, [API, token]);

    let medicalCard = medHistory.map((user) => [
        user.allergies,
        user.blood_type,
        user.medical_history,
        user.medication,
    ]);

    const formattedMedicalInfo = medicalCard.map((info, index) => {
        const [allergies, bloodType, medicalHistory, medication] = info;
        return `
              - Allergies: ${allergies}
              - Blood Type: ${bloodType}
              - Medical History: ${medicalHistory}
              - Current Medication: ${medication}`;
    });

    //Medical Cabinet Detail String Form
    const medicalTextMessage = `Medical Information:
          ${formattedMedicalInfo.join('\n')}`;

    return (
        <div className="stateEmergencyBody">
            
            <div className='userLocationBody'>

            <UserLocation />
            </div>

            <MedicalConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmModal}
                handleVillageClick={handleVillageClick}
            />

            {showDropdown && (
                <div>
                    <select
                        value={selectedVillage}
                        onChange={handleVillageSelect}
                        className="villageDropdown"
                    >
                        <option value="">Select a Village</option>
                        {villages.map(village => (
                            <option key={village.village_id} value={village.village_name}>
                                {village.village_name}
                            </option>
                        ))}
                    </select>

                    <div className="textBox">
                        <SpeechToText
                            onTextChange={setEmergencyText}
                            handleEmergencySend={handleEmergencySend}
                            cancelButton={cancelButton}
                             />
                    </div>

                </div>
            )}
            <div className='EPcontactBody'>

           
            <div className='contactHeader' style={{ display: buttonsHidden ? 'none' : 'block' }}><h3>Contact</h3></div>

<div className="emergencyButtons" style={{ display: buttonsHidden ? 'none' : 'flex' }}>
    
                <div className='buttonDiv'>
                <a href="tel:911">
                    <h5 className='EPBottomButton'>  911 </h5>
                    </a>
                    <a href="tel:911">
                        <img className="emergencyServices" src="/blueStar.svg" alt="Emergency Services" />
                    </a>
                </div>

                <div className='buttonDiv' onClick={() => { handleMessageClick(); setIs911VillageClicked(true); hideButtons(); }}>
                    <h5 className='EPBottomButton' onClick={() => { handleMessageClick(); setIs911VillageClicked(true); hideButtons(); }}>  911 + Village </h5>
                    <img className="emergencyServices" src="/arrows.svg" alt="Emergency Services" />
                </div>

                <div className='buttonDiv' onClick={() => { handleMessageClick(); hideButtons(); }}>
                    <h5 className='EPBottomButton' onClick={() => { handleMessageClick(); hideButtons(); }}>  Village </h5>
                    <img className="emergencyServices" src="/community.svg" alt="Emergency Services" />
                </div>
            </div>

        </div>
        </div>
    );
};

export default StateEmergency;

