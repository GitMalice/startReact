import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Heading from "./components/Heading";
// import { Section } from "./components/Section";
// import List from "./components/List";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import imagePath from "./assets/tux_logo.png";
import Apache from "./components/Apache";
import Home from "./components/Home";
import Gitlab from "./components/Gitlab";
import Backup from "./components/Backup";
import Glpi from "./components/Glpi";
import Samba from "./components/Samba";

function App() {
  let navItems = [
    { label: "Home", path: "/" },
    { label: "Apache", path: "/apache" },
    { label: "Backup", path: "/backup" },
    { label: "Gitlab", path: "/gitlab" },
    { label: "GLPI", path: "/glpi" },
    { label: "Samba", path: "/samba" },
  ];
  return (
    <>
      <Router>
        <NavBar
          brandName="Go Linux PROJECT"
          imageSrcPath={imagePath}
          navItems={navItems}
        />
        {/* <Heading title={"Hello"} />
        <Section title={"This is me"}>This is my section</Section>
        <List
          items={["menu1", "menu2", "menu3"]}
          render={(item: string) => <span className="menu">{item}</span>}
        /> */}
        <div className="viewer">
          <div className="content mx-3 mx-md-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apache" element={<Apache />} />
              <Route path="/backup" element={<Backup />} />
              <Route path="/gitlab" element={<Gitlab />} />
              <Route path="/glpi" element={<Glpi />} />
              <Route path="/samba" element={<Samba />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
