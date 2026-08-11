import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import Container from "../../components/Container/Container";

import css from "./AboutPage.module.css";
const AboutPage = () => {
  return (
    <div>
      <Navigation />
      <Container>
        <div className={css.content}>
          <main className={css.mainContent}>
            <h1>ABOUT PAGE</h1>
          </main>
        </div>
      </Container>
      <Footer />
    </div>
  );
};
export default AboutPage;
