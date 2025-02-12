import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ValentineForm from "./pages/ValentineForm";
import LovePage from "./pages/LovePage"; // Page with /:name/:id route
import NotFound from "./pages/NotFound"; // 404 page

function App() {
  return (
      <Routes>
        {/* Default form page */}
        <Route path="/" element={<ValentineForm />} />

        {/* Two-step dynamic route: /:name/:id */}
        <Route path="/:name/:id" element={<LovePage />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
