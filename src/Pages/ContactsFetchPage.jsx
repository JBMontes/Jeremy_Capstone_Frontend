import React from 'react';
import EmergencyContactsFetch from '../Components/EmergencyContactsFetch';
import '../Styles/ContactsFetchPage.css'
import { Link } from 'react-router-dom';

const ContactsFetchPage = () => {
    return (
        <div>
            <h1>Emergency Contacts</h1>
            <div className="cCard">
                <h2> <EmergencyContactsFetch /> </h2>

                <div className="emButtons">

                <Link to="/users/contacts/new">   <img className="addUserButton" src="/contact-add.svg" alt="Add Emergency Contact" /> </Link>

                    <Link to="/users/home"><button className='backButton'>Back</button></Link>

                </div>
            </div>
        </div>
    );
};

export default ContactsFetchPage;