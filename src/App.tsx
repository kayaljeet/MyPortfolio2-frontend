import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Layout>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <ScrollToTop />
        </Layout>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;