import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="content-page contact-page">
      <div className="contact-layout">
        <div>
          <p className="eyebrow">We're here to help</p>
          <h1>Let's talk beauty.</h1>
          <p className="content-page__lead">Have a question about an order, a product or your next beauty routine? Send our team a message.</p>
          <div className="contact-details"><div><strong>Customer care</strong><span>Order and product enquiries</span></div><div><strong>Location</strong><span>Dhaka, Bangladesh</span></div></div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <label>Your name<input required name="name" placeholder="Enter your name" /></label>
          <label>Email address<input required type="email" name="email" placeholder="Enter your email" /></label>
          <label>How can we help?<textarea required name="message" rows="5" placeholder="Write your message..." /></label>
          <button type="submit" className="button button--rose">Send message</button>
          {submitted && <p className="form-note">Thanks for reaching out. This demo form is ready to be connected to your email service.</p>}
        </form>
      </div>
    </div>
  );
}
