import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ValentineForm from "./pages/ValentineForm";
import LovePage from "./pages/LovePage"; // Page with /:name/:id route
import NotFound from "./pages/NotFound"; // 404 page
import { Toaster } from 'react-hot-toast';
import LoveLetters from "./pages/LoveLetters";
function App() {
  return (
    <div>
      <Routes>
        {/* Default form page */}
        <Route path="/" element={<ValentineForm />} />
        <Route path="/letters/:id" element={<LoveLetters />} />

        {/* Two-step dynamic route: /:name/:id */}
        <Route path="/valentine/:name/:id" element={<LovePage />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      </div>
  );
}

export default App;
