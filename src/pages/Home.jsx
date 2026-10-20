import Hero from "../components/Hero.jsx";
import Notices from "../components/Notices.jsx";
import Intro from "../components/Intro.jsx";
import BasicDetails from "../components/BasicDetails.jsx";
import Achievements from "../components/Achievements.jsx";
import Testimonials from "../components/Testimonials.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <Notices />
      <Intro />
      <BasicDetails />
      <Achievements />
      <Testimonials />
    </>
  );
}
