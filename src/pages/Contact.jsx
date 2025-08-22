import "./Contact.css";

export default function Contact() {
  const email = import.meta.env.VITE_EMAIL;
  const github = import.meta.env.VITE_GITHUB;
  const website = import.meta.env.VITE_WEBSITE;

  return (
    <div className="contact">
      <h2>Contact Me</h2>
      <form className="contact-form">
        <label>
          Name:
          <input type="text" placeholder="Your name" required />
        </label>
        <label>
          Email:
          <input type="email" placeholder="Your email" required />
        </label>
        <label>
          Message:
          <textarea placeholder="What are you looking for?" required></textarea>
        </label>
        <button type="submit">Send Inquiry</button>
      </form>

      <div className="contact-info">
        <h3>My Info</h3>
        <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
        <p>GitHub: <a href={github} target="_blank" rel="noreferrer">{github}</a></p>
        <p>Website: <a href={website} target="_blank" rel="noreferrer">{website}</a></p>
      </div>
    </div>
  );
}
