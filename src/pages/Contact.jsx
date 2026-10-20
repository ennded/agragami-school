import PageBanner from "../components/PageBanner.jsx";
import { useContent } from "../content.jsx";

export default function Contact() {
  const { school, infoAccordion } = useContent();
  const hours = infoAccordion.filter((a) => (a.title || "").toLowerCase().includes("hours"));

  return (
    <>
      <PageBanner light="Contact" bold="us" />
      <div className="container contact">
        <div className="contact__cards">
          <div className="stat__card">
            <h4>Address</h4>
            <p>
              {school.name}, {school.place}
            </p>
          </div>
          <div className="stat__card">
            <h4>Phone no</h4>
            {school.phones.map((p) => (
              <p key={p}>
                <a href={`tel:${p}`}>{p}</a>
              </p>
            ))}
          </div>
          <div className="stat__card">
            <h4>Email-id</h4>
            <p>
              <a href={`mailto:${school.email}`}>{school.email}</a>
            </p>
          </div>
          {hours.map((h) => (
            <div className="stat__card" key={h.title}>
              <h4>{h.title}</h4>
              <p>{h.body}</p>
            </div>
          ))}
        </div>

        <div className="contact__map">
          {school.mapEmbed ? (
            <iframe
              src={school.mapEmbed}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School location"
            />
          ) : (
            <p className="contact__map-placeholder">
              Map not configured. The admin can add a Google Maps embed link under School details.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
