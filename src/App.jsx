import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import ValentineForm from "./pages/ValentineForm";
import LovePage from "./pages/LovePage";
import NotFound from "./pages/NotFound";
import LoveLetters from "./pages/LoveLetters";
import { Toaster } from 'react-hot-toast';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve stored values
    const savedId = localStorage.getItem("loveId");
    const savedName = localStorage.getItem("loveName");

    // Redirect if both exist
    if (savedId && savedName) {
      navigate(`/valentine/${savedName}/${savedId}`);
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<ValentineForm />} />
        <Route path="/letters/:id" element={<LoveLetters />} />
        <Route path="/valentine/:name/:id" element={<LovePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
