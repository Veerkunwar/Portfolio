import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-base">
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Certificates />
        <Contact />
      </main>

      <Footer />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#101218",
            color: "#F5F5F7",
            border: "1px solid #1E2029",
            fontSize: "0.875rem",
          },
          success: { iconTheme: { primary: "#FF2E4D", secondary: "#101218" } },
          error: { iconTheme: { primary: "#EF4444", secondary: "#101218" } },
        }}
      />
    </div>
  );
}
