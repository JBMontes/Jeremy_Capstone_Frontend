import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/About.css'

const About = () => {
    return (
        <div className="aboutBody">
            <br/>
            <br/>
            <br/>
            <br/>
            <br />
            <div className="about">
                <h2>About Village</h2>
                <p>Introducing Village: the user-friendly app crafted for seamless communication and coordination within your inner circle of parents, friends, and cherished ones. Whether on desktop or mobile, this innovative platform offers an array of tools such as geolocation tracking, resource finders, and instant messaging. Village is your go-to solution for staying connected, safe, and well-organized within your family network. Our mission is simple: to enhance communication and elevate coordination among caregivers, resulting in optimal care and support for children, loved ones, and friends.</p>
            </div>

            <div className="howToUse">
                <h2>How to Use:</h2>
                <ul>
                    <li>Sign Up and Customize Your Village:
                        <p>Begin by signing up for Village and tailor your experience to suit your needs.</p>
                    </li>
                    <li>Emergency Situation:
                        <p>In times of emergency, simply press the red button on the profile page to access all safety features.</p>
                    </li>
                    <li>Emergency Page:
                        <p>Upon entering the Emergency Page, you'll find three buttons positioned above the map:</p>
                        <ul>
                            <div className='buttonOpt'>
                            <li>Fire Station</li>
                            <li>Police</li>
                            <li>Hospital</li>
                            </div>
                        </ul>
                        <p>Click on the relevant button to discover the nearest emergency service option. Once selected, click on the marker to receive the route and directions.</p>
                    </li>
                    <li>Distress Messaging:
                        <p>Village users have the option to send a distress message to their Village, make direct calls to emergency services, or both, using the buttons located below the map.</p>
                        <p>Speech-to-text functionality is available to expedite messaging if needed.</p>
                        <p>Once sent, the message, along with the user's current location and optional Medical Information, will be distributed to all members within the selected Village. Village members can then take appropriate action to ensure the safety and wellbeing of the user in distress.</p>
                    </li>
                </ul>
            </div>
            
           <footer> <Link to='/aboutDev'> <h2 className='h2Icon' >🧔🏿‍♂️    🧔🏻</h2></Link></footer>
        </div>
    );
};

export default About;