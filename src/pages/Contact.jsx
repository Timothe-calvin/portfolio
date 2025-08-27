import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [example, setExample] = useState({
    name: "Jane Doe",
    email: "jane@email.com",
    phone: "555-123-4567",
    message:
      "I wanted to have you work on a project or to ask about how your process works.",
  });

  const handleExampleChange = (e) => {
    setExample({ ...example, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
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
    <div className="contact contact-flex">
      <div className="contact-example">
        <h3>Example</h3>
        <div className="example-fields">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={example.name}
            onChange={handleExampleChange}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={example.email}
            onChange={handleExampleChange}
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={example.phone}
            onChange={handleExampleChange}
          />
        </div>
        <div className="example-message">
          <label>Example Message</label>
          <textarea
            value={`Hi, I am ${example.name}. My email and phone number is ${example.email} and ${example.phone}.\n${example.message}`}
            readOnly
            rows={5}
          />
        </div>
      </div>
      <div className="contact-form-box">
        <h2>Contact Me</h2>
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="user_name" required />

          <label>Email</label>
          <input type="email" name="user_email" required />

          <label>Phone</label>
          <input type="text" name="user_phone" />

          <label>Message</label>
          <textarea name="message" required />

          <button type="submit">Send</button>
        </form>
        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}
