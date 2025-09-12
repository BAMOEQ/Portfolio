import React, { useState } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Clear status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'brandonmorales1226@gmail.com',
      link: 'mailto:brandonmorales1226@gmail.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+1 (845)-453-7229',
      link: 'tel:+1(845)-453-7229'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'New York, NY',
      link: null
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'Connect with me',
      link: 'https://linkedin.com/in/brandonamorales'
    }
  ];

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>I'd love to hear from you. Send me a message and I'll respond as soon as possible.</p>
      </div>

      <div className="contact-content">
        {/* Contact Information */}
        <div className="contact-info">
          <h2>Let's Connect</h2>
          <p className="contact-intro">
            Whether you have a project in mind, want to collaborate, or just want to say hello, 
            feel free to reach out through any of the channels below.
          </p>
          
          <div className="contact-methods">
            {contactInfo.map((item, index) => (
              <div key={index} className="contact-method">
                <div className="contact-icon">{item.icon}</div>
                <div className="contact-details">
                  <h3>{item.title}</h3>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="social-links">
            <h3>Follow Me</h3>
            <div className="social-icons">
              <a href="https://github.com/BAMOEQ" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>🐙</span> GitHub
              </a>
              <a href="https://linkedin.com/in/brandonamorales/" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>💼</span> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Tell me about your project, question, or just say hello..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? '📤 Sending...' : '🚀 Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="status-message success">
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="status-message error">
                ❌ Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;