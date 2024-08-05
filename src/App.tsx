import Heading from "./components/Heading";
import { Section } from "./components/Section";
import NavBar from "./components/NavBar";
import List from "./components/List";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import imagePath from "./assets/tux_logo.png";
import "./App.css";

function App() {
  let items = ["Home", "Tuto1", "Tuto2"];
  return (
    <>
      <NavBar
        brandName="Go Linux PROJECT"
        imageSrcPath={imagePath}
        navItems={items}
      />
      <Heading title={"Hello"} />
      <Section title={"This is me"}>This is my section</Section>
      <List
        items={["menu1", "menu2", "menu3"]}
        render={(item: string) => <span className="menu">{item}</span>}
      />
    </>
  );
}

export default App;
