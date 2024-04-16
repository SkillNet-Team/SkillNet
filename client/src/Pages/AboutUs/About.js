import React from 'react';
import Footer from '../../Footer/Footer';
import './About.css';


const AboutUs = () => {
    return (
        <>
            <div className="about-container">
                <div className="image-container">
                    <img src="https://media.licdn.com/dms/image/D4D08AQEj7JIaMX7hUQ/croft-frontend-shrinkToFit1024/0/1661543067460?e=2147483647&v=beta&t=DA6c3lCXvOPJzyJphyfuUnxCxC1cwNZdASx0TyG7pd8"></img>
                <div className="text-overlay" alt="About Us" className="background-image" />
                    <div className="text-overlay">
                        <h1>About Us</h1>
                        <p>We're Here to help you learn new skills and help you share your gifts with others</p>
                    </div>
                </div>
                <div className="mission-section">
                    <h2>Our Mission</h2>
                    <p>SkillNet tackles the common problem of limited access and high costs associated with learning new skills. This innovative platform allows individuals to easily learn and teach new skills by connecting with others in their local community. Whether one wants to acquire a new skill or share expertise, SkillNet provides a simple and cost-effective solution. By facilitating skill exchange, SkillNet transforms traditional learning barriers into collaborative opportunities, making it easier for people to grow and develop through shared knowledge and experiences.</p>
                    
                    <p>SkillNet targets individuals who are eager to learn new skills or hobbies and are open to share their expertise with others. The primary users include lifelong learners, hobbyists, and those seeking a cost-effective way to acquire new skills. Whether one is a beginner looking to acquire a new skill or an expert wanting to teach and connect with others, SkillNet provides a user-friendly and collaborative space for individuals of all proficiency levels and backgrounds.</p>
                </div>
            </div>
            <div><Footer></Footer></div>

        </>
    );
};

export default AboutUs;
