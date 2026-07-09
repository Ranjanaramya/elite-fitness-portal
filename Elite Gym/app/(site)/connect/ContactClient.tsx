'use client';

import { useState } from 'react';
import { submitEnquiry } from '@/lib/actions';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Standard Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    // Standard Phone Number Validation (Exactly 10 digits, e.g. 0771234567)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.trim())) {
      setError('Please enter a valid 10-digit phone number (e.g. 0771234567).');
      setIsSubmitting(false);
      return;
    }

    if (!subject) {
      setError('Please select an enquiry subject.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await submitEnquiry({ name, email, phone, subject, message });
      if (res.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        setError(res.error || 'Failed to submit enquiry.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Banner */}
      <section className="bg-slate-950 text-white py-20 text-center relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-space font-extrabold mb-4 tracking-tight">Connect</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Have questions about memberships or classes? Reach out and we will help you get started.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-5 gap-16 items-start">
            
            {/* Info Column */}
            <div className="md:col-span-2 space-y-10">
              <div>
                <span className="text-xs text-indigo-600 font-extrabold uppercase tracking-widest block mb-2">Get in touch</span>
                <h2 className="font-space text-3xl font-bold text-slate-900 tracking-tight">Center Contact Details</h2>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-space text-sm mb-1">Colombo Center Address</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">123 Fitness Avenue, Colombo 03, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-space text-sm mb-1">Direct Phone Helpline</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">+94 11 234 5678</p>
                    <p className="text-xs text-slate-500 leading-relaxed">+94 77 123 4567</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-space text-sm mb-1">Email Inquiries</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">hello@elitefitness.lk</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-space text-sm mb-1">Operating Hours</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Mon-Fri: 5:00 AM - 10:00 PM</p>
                    <p className="text-xs text-slate-500 leading-relaxed">Sat-Sun: 6:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="md:col-span-3 bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-space text-xl font-bold mb-6 text-slate-900">Send an Enquiry</h3>
              
              {success ? (
                <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 p-6 rounded-2xl flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5 text-indigo-600" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">Enquiry Submitted!</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Thank you for contacting us. Our operations team will respond to your inquiry via email or phone within the next 12 hours.
                    </p>
                    <button 
                      onClick={() => setSuccess(false)}
                      className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Your Name</label>
                      <input 
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Kasun"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-slate-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
                      <input 
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. kasun@example.com"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Phone Number</label>
                      <input 
                        id="contact-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="e.g. 0771234567"
                        pattern="\d{10}"
                        maxLength={10}
                        title="Phone number must be exactly 10 digits"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-slate-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Subject</label>
                      <select 
                        id="contact-subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-slate-900 font-semibold cursor-pointer"
                      >
                        <option value="" disabled>Select inquiry subject...</option>
                        <option value="Membership Packages Inquiry">Membership Packages Inquiry</option>
                        <option value="Personal Training Slots">Personal Training Slots</option>
                        <option value="Group Fitness Classes Schedule">Group Fitness Classes Schedule</option>
                        <option value="Corporate Partnerships">Corporate Partnerships</option>
                        <option value="General Feedback / Other">General Feedback / Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Message</label>
                    <textarea 
                      id="contact-message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      placeholder="Type your message here..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Sending...' : <><Send className="w-4 h-4" /> Send Enquiry</>}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
