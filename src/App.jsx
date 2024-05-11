import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FriesNavbar from "./Components/FriesNavbar.jsx";
import "./App.css";
import { useLoginDataProvider } from "./Components/LoginProvider";
import LandingPage from "./Pages/LandingPage.jsx";
import SignupPage from "./Pages/SignupPage";
import EmergencyContactsPage from "./Pages/EmergencyContactPage";
import MedicalHistoryPage from "./Pages/MedicalHistoryPage";
import HomePage from "./Pages/HomePage.jsx";
import ProtectedRoute from "./Components/ProtecteRoutes.jsx";
import ContactsFetchPage from "./Pages/ContactsFetchPage.jsx";
import EditContactForm from "./Pages/EditContactForm.jsx";
import NewContactForm from "./Pages/NewContactForm.jsx";
import MedHistoryFetch from "./Pages/MedHistoryFetch.jsx";
import VillagesPage from "./Pages/VillagesPage.jsx";
import AddVillages from "./Pages/AddVillages.jsx";
import GetVillage from "./Components/GetVillage.jsx";
import StateEmergency from "./Pages/StateEmergency.jsx";
import LoginSignup from "./Components/LoginSignup.jsx";
import LandingHomePage from "./Pages/LandingHomePage.jsx";
import About from "./Pages/About.jsx";
import EditProfilePage from "./Pages/EditProfilePage.jsx";
import AboutDev from "./Pages/AboutDev.jsx";
// import ColorChange from "./Components/ColorChange.jsx";

function App() {
  const { setUser, setToken, user, token } = useLoginDataProvider();

  return (
    <>
      <Router>
        <FriesNavbar />
        {/* <ColorChange /> */}

        <Routes>
          <Route path="/" element={<LandingHomePage />} />

          <Route path="/about" element={<About/>} />

          <Route path="/aboutDev" element={<AboutDev/>} />

          
          <Route
            path="users/sign-up"
            element={<SignupPage setUser={setUser} setToken={setToken} />}
          />
          <Route
            path="users/sign-up/:user_id/contacts"
            element={<EmergencyContactsPage />}
          />
          <Route
            path="users/sign-up/:user_id/medical"
            element={<MedicalHistoryPage />}
          />
          <Route
            path="users/login"
            element={<LoginSignup setUser={setUser} setToken={setToken} />}
          />

          <Route
            path="users/home"
            element={
              <ProtectedRoute
                element={HomePage}
                isAuthenticated={!!user && !!token}
                user={user}
                token={token}
              />
            }
          />

          <Route
            path="users/edit-profile"
            element={
              <ProtectedRoute
                element={EditProfilePage}
                isAuthenticated={!!user && !!token}
                user={user}
                token={token}
              />
            }
          />

          <Route
            path="users/contacts"
            element={
              <ProtectedRoute
                element={ContactsFetchPage}
                isAuthenticated={!!user && !!token}
                user={user}
                token={token}
              />
            }
          />

          <Route
            path="users/contacts/edit/:contact_id"
            element={
              <ProtectedRoute
                element={EditContactForm}
                isAuthenticated={!!user && !!token}
                user={user}
                token={token}
              />
            }
          />

          <Route
            path="users/contacts/new"
            element={
              <ProtectedRoute
                element={NewContactForm}
                isAuthenticated={!!user && !!token}
                user={user}
                token={token}
              />
            }
          />

          <Route path="users/medical"
            element={
              <ProtectedRoute
                element={MedHistoryFetch}
                isAuthenticated={!!user && !!token}
                user={user}
                token={token}
              />
            }
          />

          <Route
            path="users/villages"
            element={
              <ProtectedRoute
                element={VillagesPage}
                isAuthenticated={!!user && !!token}
                user={user}
                token={token}
              />
            }
          />

          <Route
            path="users/villages/new"
            element={
              <ProtectedRoute
                element={AddVillages}
                isAuthenticated={!!user && !!token}
                user={user}
                token={token}
              />
            }
          />

          <Route
            path="users/villages/village/:village_id"
            element={
              <ProtectedRoute
                element={GetVillage}
                isAuthenticated={!!user && !!token}
                user={user}
                token={token}
              />
            }
          />

          <Route
            path="users/emergency"
            element={
              <ProtectedRoute
                element={StateEmergency}
                isAuthenticated={!!user && !!token}
                user={user}
                token={token}
              />
            }
          />

        </Routes>
      </Router>
    </>
  );
}

export default App;
