import React from 'react';
import './index.css';

const SUBMIT_URL = 'https://www.greatfrontend.com/api/questions/contact-form'

const ContactForm = () => {

  const submitForm = async (event)=> {
    event.preventDefault();
    const form = event.target;
    try {
      if (form.action !== SUBMIT_URL) {
        alert('Incorrect form action value');
        return;
      }

      if (form.method.toLowerCase() !== 'post') {
        alert('Incorrect form method value');
        return 
      }
      const formData = new FormData(form);

      const response = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      })
      const text = await response.text();
      alert(text);

    } catch (error) {
      alert('Error submitting form!');
    }
  }

  return (
    <form
      onSubmit={submitForm}
      action="https://www.greatfrontend.com/api/questions/contact-form"
      method="post"
    >
      <div>
        <label htmlFor="name-input">name</label>
        <input type="text" name="name" id="name-input"/>
      </div>
      <div>
        <label htmlFor="email-input">email</label>
        <input type="email" name="email" id="email-input" />
      </div>
      <div>
        <label htmlFor="message-input">message</label>
        <textarea name="message" id="message-input" cols="30" rows="10"></textarea>
      </div>
      <div style={{display: 'flex', gap: '10px'}}>
        <button>send</button>
        <button type="reset">reset</button>
      </div>
    </form>
  );
};

export default ContactForm;