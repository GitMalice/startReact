import Heading from "./components/Heading";
import { Section } from "./components/Section";
import NavBar from "./components/NavBar";
import List from "./components/List";
import "bootstrap/dist/css/bootstrap.css";
import imagePath from "./assets/tux_logo.png";

function App() {
  return (
    <>
      <NavBar brandName="Go Linux PROJECT" imageSrcPath={imagePath} />
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
