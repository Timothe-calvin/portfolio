import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FireplaceBackground from "./components/FireplaceBackground";
import NightSkyBackground from "./components/NightSkyBackground";
import Footer from "./components/Footer";
import SnowCursor from "./components/SnowCursor";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import "./App.css";

function App() {
  return (
    <>
      <FireplaceBackground />
      <NightSkyBackground />
      <SnowCursor />
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
