import { Helmet } from "react-helmet-async";
import About from "../components/about/About";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Hon. Kofi Benteh Afful</title>
        <meta
          name="description"
          content="Biography, career, and parliamentary mandate of Hon. Kofi Benteh Afful, Member of Parliament for Sefwi Wiawso."
        />
      </Helmet>

      <About />
    </>
  );
}