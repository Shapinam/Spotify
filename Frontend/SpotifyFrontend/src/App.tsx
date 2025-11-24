import {Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import AuthCallbackPage from "./Pages/Auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./Pages/chat/ChatPage";
import AlbumPage from "./Pages/Album/AlbumPage";


function App() {

  return (
    <>
      <Routes>
        
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />

        </Route>
      </Routes>
    </>

  )
}


export default App;
