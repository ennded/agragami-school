import Hero from "../components/Hero.jsx";
import PrincipalMessage from "../components/PrincipalMessage.jsx";
import Notices from "../components/Notices.jsx";
import Intro from "../components/Intro.jsx";
import BasicDetails from "../components/BasicDetails.jsx";
import Achievements from "../components/Achievements.jsx";
import Testimonials from "../components/Testimonials.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <PrincipalMessage />
      <Notices />
      <Intro />
      <BasicDetails />
      <Achievements />
      <Testimonials />
    </>
  );
}
