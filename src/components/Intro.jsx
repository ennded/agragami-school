import { useEffect, useState } from "react";
import { useContent } from "../content.jsx";

export default function Intro() {
  const { rotatingWins, achievementsIntro } = useContent();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => v + 1), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="intro">
      <div className="container">
        <h2 className="intro__headline">
          Agragamians have brought home{" "}
          <span className="intro__rotator" key={i}>
            {rotatingWins[i % rotatingWins.length]}
          </span>
          .
        </h2>
        <p className="intro__lead">{achievementsIntro}</p>
        <hr className="fade-rule" />
      </div>
    </section>
  );
}
