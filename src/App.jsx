import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TransformStatement from './components/TransformStatement';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionNavigator from './components/SectionNavigator';
import useNavigationMotions from './hooks/useNavigationMotions';

export default function App() {
  useNavigationMotions();

  return (
    <>
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo
      </a>
      <SectionNavigator />
      <Header />
      <main id="conteudo-principal">
        <Hero />
        <About />
        <Services />
        <TransformStatement />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
