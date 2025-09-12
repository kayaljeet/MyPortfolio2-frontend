import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { usePersonalData } from '../../hooks/usePersonalData';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const { data: personalData } = usePersonalData();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
  };

  return (
    <section id="contact" ref={ref} className={`py-20 px-4 sm:px-6 lg:px-8 content-shift ${
      inView ? 'shifted' : ''
    } ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950/50 via-slate-900/30 to-slate-950/50' 
        : 'bg-gradient-to-br from-white/70 via-gray-50/50 to-white/70'
    }`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className={`${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              Get In Touch
            </span>
          </h2>
          <div className={`w-24 h-1 mx-auto ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-400 to-pink-400'
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`} />
          <p className={`mt-6 text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            I'm always interested in new opportunities and exciting projects. 
            Let's connect and discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              
              <div className="space-y-4">
                {personalData?.contact?.email && (
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4"
                  >
                    <div className={`p-3 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-purple-900/50 text-purple-400'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {personalData.contact.email}
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {personalData?.contact?.phone && (
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4"
                  >
                    <div className={`p-3 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-purple-900/50 text-purple-400'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {personalData.contact.phone}
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {personalData?.contact?.location && (
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4"
                  >
                    <div className={`p-3 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-purple-900/50 text-purple-400'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {personalData.contact.location}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {personalData?.socialLinks && Object.entries(personalData.socialLinks).map(([platform, url]) => {
                  const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                  if (!IconComponent) return null;
                  
                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-slate-800 hover:bg-purple-900/50 text-gray-400 hover:text-purple-400'
                          : 'bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 shadow-md'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
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
                  className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
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
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-slate-800 border border-purple-500/20 text-white placeholder-gray-400 focus:ring-purple-400 focus:border-purple-400'
                      : 'bg-white border border-blue-200 text-gray-900 placeholder-gray-500 focus:ring-blue-400 focus:border-blue-400'
                  }`}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
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
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-slate-800 border border-purple-500/20 text-white placeholder-gray-400 focus:ring-purple-400 focus:border-purple-400'
                      : 'bg-white border border-blue-200 text-gray-900 placeholder-gray-500 focus:ring-blue-400 focus:border-blue-400'
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                    theme === 'dark'
                      ? 'bg-slate-800 border border-purple-500/20 text-white placeholder-gray-400 focus:ring-purple-400 focus:border-purple-400'
                      : 'bg-white border border-blue-200 text-gray-900 placeholder-gray-500 focus:ring-blue-400 focus:border-blue-400'
                  }`}
                  placeholder="Tell me about your project or just say hi!"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-medium transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25'
                }`}
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;