import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"


function App() {
   const { authUser, checkAuth, isCheckingAuth } = useAuthStore() 

  useEffect(() => { 
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth && !authUser) return <div>Loading.......</div>

  return (
    <>
     
     <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/" element={<SettingsPage />} />
        <Route path="/" element={<ProfilePage />} />
         </Routes>
     </div>
    </>
  )
}

export default App
