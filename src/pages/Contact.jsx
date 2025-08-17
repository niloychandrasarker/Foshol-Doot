import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically handle sending the form data to your backend or email service
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6 text-green-700">Contact Us</h1>
      <p className="mb-6 text-gray-700">
        Have questions, feedback, or want to collaborate? Fill out the form
        below and our team will get back to you soon.
      </p>
      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-6">
          Thank you for reaching out! We will contact you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      )}
      <div className="mt-10 text-gray-600 text-sm">
        <p>
          Email:{" "}
          <a
            href="mailto:info@fosholdoot.com"
            className="text-green-700 underline"
          >
            info@fosholdoot.com
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+880123456789" className="text-green-700 underline">
            +880 1234-56789
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
