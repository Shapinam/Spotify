import {Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import AuthCallbackPage from "./Pages/Auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./Pages/chat/ChatPage";
import AlbumPage from "./Pages/Album/AlbumPage";
import AdminPage from "./Pages/admin/AdminPage";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Routes>
        
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />


        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />

        </Route>
      </Routes>
      <Toaster />
    </>

  )
}


export default App;
