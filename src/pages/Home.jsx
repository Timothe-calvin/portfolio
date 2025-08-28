import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="home-landing" style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 32 }}>
			<img src="/Selfie.jpg" alt="Profile" style={{ width: 120, height: 120, borderRadius: "50%", marginBottom: 24, objectFit: "cover", border: "3px solid #ccc" }} />
			<h1 style={{ fontSize: 36, marginBottom: 8 }}>Hi, I'm <span style={{ color: '#0078d4' }}>Timothe Calvin</span></h1>
			<h2 style={{ fontWeight: 400, color: '#555', marginBottom: 16 }}>Front End Developer & Lifelong Learner</h2>
			<p style={{ maxWidth: 600, textAlign: "center", marginBottom: 24 }}>
				Welcome to my portfolio! I specialize in building responsive, user-friendly web applications using modern technologies like React, Vite, and Tailwind CSS. With a strong foundation in both front end and back end development, I am passionate about creating impactful digital experiences and continuously growing my skills.
			</p>
			<div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
			</div>
			<section style={{ maxWidth: 700, margin: "0 auto", background: "#f9f9f9", color: "#000", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px #0001", WebkitTextFillColor: '#000' }}>
				<h3 style={{ marginBottom: 8 }}>About Me</h3>
				<p style={{ marginBottom: 8 }}>
					<b>Professional Summary:</b> Versatile and reliable professional with 3+ years of experience in customer support, food service, and sales. Certified in IT Fundamentals, with hands-on experience in modern web technologies and frameworks. Strong problem-solving skills, adaptability, and a commitment to learning and growth in technical roles.
				</p>
				<p style={{ marginBottom: 8 }}>
					<b>Technical Skills:</b> HTML5, CSS3, JavaScript, TypeScript, React, Vite, Bootstrap, Tailwind CSS, Git, GitHub, VS Code, RESTful APIs, DOM Manipulation
				</p>
				<p style={{ marginBottom: 8 }}>
					<b>Certifications:</b> IT Fundamentals Certificate (Goodwill Vocational School, 2020), Git and GitHub (IBM Coursera), HTML, CSS, JavaScript - Intro to Software (IBM Coursera), Persevere Front End Web Development
				</p>
				<p>
					<b>Technical Experience:</b> Front End Development (Persevere, April 2025 - August 2025), Back End Development (Persevere, Current)
				</p>
			</section>
		</div>
	);
}
