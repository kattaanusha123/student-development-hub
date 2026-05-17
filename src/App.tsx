import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProjectHub from './components/ProjectHub';
import CareerGuidance from './components/CareerGuidance';
import CollegeReviews from './components/CollegeReviews';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-blue-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-emerald-600/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[25%] h-[25%] bg-indigo-600/5 blur-[80px] rounded-full"></div>
      </div>

      <Navbar />
      
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectHub />} />
          <Route path="/career" element={<CareerGuidance />} />
          <Route path="/colleges" element={<CollegeReviews />} />
        </Routes>
      </main>

      <Chatbot />

      {/* Footer (Desktop only) */}
      <footer className="hidden sm:block py-12 border-t border-zinc-900 bg-zinc-950/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl text-zinc-100">StudentHub<span className="text-blue-500">AI</span></span>
            </div>
            <div className="flex gap-8 text-sm text-zinc-500">
              <a href="#" className="hover:text-zinc-300 transition-colors">About Us</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Contact</a>
            </div>
            <div className="text-sm text-zinc-600">
              © 2026 StudentHub AI. Empowering the next generation of innovators.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
