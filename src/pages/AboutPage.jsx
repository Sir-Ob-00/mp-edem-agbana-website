import { Helmet } from "react-helmet-async";
import About from "../components/about/About";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Hon. Edem Agbana</title>
        <meta
          name="description"
          content="Eric Edem Agbana is the current Member of Parliamnet for Ketu North, in the Volta Region of Ghana."
        />
      </Helmet>

      <About />
    </>
  );
}