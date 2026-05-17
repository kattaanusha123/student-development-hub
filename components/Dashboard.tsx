import React, { useState, useEffect } from 'react';
import { TrendingUp, Rocket, Users, Award, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [trending, setTrending] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/trending')
      .then(res => res.json())
      .then(data => setTrending(data));
  }, []);

  const stats = [
    { label: 'Active Projects', value: '1,240', icon: Rocket, color: 'text-blue-500' },
    { label: 'Student Innovators', value: '8,500', icon: Users, color: 'text-emerald-500' },
    { label: 'Success Stories', value: '450', icon: Award, color: 'text-amber-500' },
  ];

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
          Welcome to StudentHub<span className="text-blue-500">AI</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Your centralized space to innovate, explore, and grow your career. 
          Turn your ideas into meaningful projects with the power of AI.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-2">
                <div className={`${stat.color} bg-zinc-950 p-3 rounded-xl border border-zinc-800`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-zinc-400 font-medium">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trending Technologies */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-blue-500 w-6 h-6" />
                <h2 className="text-xl font-bold text-white">Trending Technologies</h2>
              </div>
              <Link to="/career" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                View Career Insights <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {trending.map((tech) => (
                <div key={tech.name} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
                  <div>
                    <div className="font-semibold text-white">{tech.name}</div>
                    <div className="text-sm text-zinc-500">Demand: {tech.demand}</div>
                  </div>
                  <div className="text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-sm">
                    {tech.growth}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects Preview */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Featured Projects</h2>
              <Link to="/projects" className="text-sm text-blue-500 hover:underline">Browse All</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                <div className="text-blue-500 text-xs font-bold uppercase mb-1">AI & Robotics</div>
                <div className="font-semibold text-white mb-2">Smart Waste Sorter</div>
                <p className="text-sm text-zinc-400 line-clamp-2">Automated recycling system using computer vision.</p>
              </div>
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                <div className="text-emerald-500 text-xs font-bold uppercase mb-1">Sustainability</div>
                <div className="font-semibold text-white mb-2">Solar Tracker IoT</div>
                <p className="text-sm text-zinc-400 line-clamp-2">Optimizing solar panel efficiency with real-time tracking.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: AI Quick Tips */}
        <div className="space-y-6">
          <div className="bg-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">AI Project Assistant</h3>
            <p className="text-blue-100 mb-6 text-sm leading-relaxed">
              Stuck on an idea? Our AI can suggest innovative projects based on your skills and interests.
            </p>
            <Link 
              to="/projects" 
              className="block w-full text-center bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Get Recommendations
            </Link>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-xs text-zinc-500 font-bold">MAR</span>
                  <span className="text-lg text-white font-bold leading-none">12</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">AI Hackathon 2026</div>
                  <div className="text-xs text-zinc-500">Virtual Event</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-xs text-zinc-500 font-bold">MAR</span>
                  <span className="text-lg text-white font-bold leading-none">18</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Career Fair: Tech</div>
                  <div className="text-xs text-zinc-500">Campus Auditorium</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
