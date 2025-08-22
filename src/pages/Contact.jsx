import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE,
      import.meta.env.VITE_EMAILJS_TEMPLATE,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(
      () => setStatus("Message sent!"),
      () => setStatus("Failed to send message.")
    );

    e.target.reset();
  };

  return (
    <div className="contact">
      <h2>Contact Me</h2>
      <form ref={form} onSubmit={sendEmail}>
        {/* Hidden recipient for EmailJS if needed */}
        <input type="hidden" name="to_email" value={import.meta.env.VITE_EMAIL} />

        <label>Name</label>
        <input type="text" name="user_name" required />

        <label>Email</label>
        <input type="email" name="user_email" required />

        <label>Message</label>
        <textarea name="message" required />

        <button type="submit">Send</button>
      </form>

      {status && <p className="status">{status}</p>}

      <div className="contact-info">
        <p>Email: {import.meta.env.VITE_EMAIL}</p>
        <p>GitHub: <a href={import.meta.env.VITE_GITHUB} target="_blank" rel="noreferrer">{import.meta.env.VITE_GITHUB}</a></p>
        <p>Website: <a href={import.meta.env.VITE_WEBSITE} target="_blank" rel="noreferrer">{import.meta.env.VITE_WEBSITE}</a></p>
      </div>
    </div>
  );
}
