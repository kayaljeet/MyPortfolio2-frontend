import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import { usePersonalData } from '../../hooks/usePersonalData';

const Contact: React.FC = () => {
  const { data: personalData } = usePersonalData();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
  };

  return (
    <section id="contact" ref={ref} className="py-20 px-6 sm:px-8 lg:pl-48 lg:pr-16 bg-black grain-texture">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20"
        >
          <div className="inline-block px-4 py-2 mb-6 text-sm font-medium uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-400">
            Let's Connect
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tighter">
            <span className="text-white">Get In </span>
            <span className="text-brand-neon">Touch</span>
          </h2>

          <p className="text-base sm:text-lg max-w-2xl text-neutral-400 leading-relaxed">
            I'm always interested in new opportunities and exciting projects.
            Let's connect and discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 sm:space-y-12"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              {personalData?.contact?.email && (
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4"
                >
                  <div className="p-3 bg-neutral-900 border border-neutral-800 text-brand-neon">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm uppercase tracking-wider mb-1">Email</p>
                    <p className="text-neutral-400 text-sm sm:text-base break-all">{personalData.contact.email}</p>
                  </div>
                </motion.div>
              )}

              {personalData?.contact?.phone && (
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4"
                >
                  <div className="p-3 bg-neutral-900 border border-neutral-800 text-brand-neon">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-neutral-400 text-sm sm:text-base">{personalData.contact.phone}</p>
                  </div>
                </motion.div>
              )}

              {personalData?.contact?.location && (
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4"
                >
                  <div className="p-3 bg-neutral-900 border border-neutral-800 text-brand-neon">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm uppercase tracking-wider mb-1">Location</p>
                    <p className="text-neutral-400 text-sm sm:text-base">{personalData.contact.location}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Follow Me</h4>
              <div className="flex gap-4">
                {personalData?.socialLinks && Object.entries(personalData.socialLinks).map(([platform, url]) => {
                  const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                  if (!IconComponent) return null;

                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 sm:p-4 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-brand-neon hover:border-neutral-700 transition-all duration-300"
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-wider"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 sm:py-4 bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:border-brand-neon transition-all duration-300 text-sm sm:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-wider"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 sm:py-4 bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:border-brand-neon transition-all duration-300 text-sm sm:text-base"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-neutral-400 uppercase tracking-wider"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 sm:py-4 bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:border-brand-neon transition-all duration-300 resize-none text-sm sm:text-base"
                  placeholder="Tell me about your project or just say hi!"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'submitting'}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 sm:py-5 font-medium transition-all duration-300 bg-transparent border-2 border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-black tracking-wide text-sm sm:text-base ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                <Send className={`w-5 h-5 ${status === 'submitting' ? 'animate-pulse' : ''}`} />
                <span>
                  {status === 'submitting' ? 'Sending...' :
                    status === 'success' ? 'Message Sent!' :
                      status === 'error' ? 'Failed to Send' :
                        'Send Message'}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;