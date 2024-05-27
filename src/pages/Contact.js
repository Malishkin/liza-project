import React from "react";

const Contact = () => {
  return (
    <section id="contact">
      <h2>Contact</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
};

export default Contact;
