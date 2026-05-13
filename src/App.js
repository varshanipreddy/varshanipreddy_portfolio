import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Awards from "./components/Awards/Awards"
import Footer from "./components/Footer";
import Education from "./components/Education/Education";
import Work from "./components/Work/Work"
import Skills from "./components/Skills/Skills";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import PortfolioChatbot from "./components/Chatbot/PortfolioChatbot";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/work" element={<Work />} />
          <Route path="/resume" element={<Navigate to="/" replace />} />
          <Route path="/contact" element={<Navigate to="/" replace />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/Skills" element={<Skills />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/certificates" element={<Navigate to="/skills" replace />} />
          <Route path="/Certificates" element={<Navigate to="/skills" replace />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
        <Footer />
        <PortfolioChatbot />
      </div>
    </Router>
  );
}

export default App;
