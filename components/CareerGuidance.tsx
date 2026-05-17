import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, ExternalLink, Search, Filter, TrendingUp, BookOpen } from 'lucide-react';

const CareerGuidance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'skills'>('jobs');

  const jobs = [
    {
      id: 1,
      title: "Junior AI Researcher",
      company: "DeepMind (Internship)",
      location: "Remote / London",
      salary: "$4,000 - $6,000 / mo",
      tags: ["Machine Learning", "Python", "PyTorch"],
      match: "95%"
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "TechFlow Solutions",
      location: "San Francisco, CA",
      salary: "$110k - $140k",
      tags: ["React", "Node.js", "TypeScript"],
      match: "88%"
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "Analytics Corp",
      location: "New York, NY",
      salary: "$35 / hr",
      tags: ["SQL", "Data Viz", "Statistics"],
      match: "82%"
    }
  ];

  const skillPaths = [
    {
      title: "AI Engineer",
      demand: "Very High",
      skills: ["Linear Algebra", "Neural Networks", "NLP", "Computer Vision"],
      resources: ["Coursera: Deep Learning Specialization", "Fast.ai", "Kaggle"]
    },
    {
      title: "Cloud Architect",
      demand: "High",
      skills: ["AWS/Azure", "Docker", "Kubernetes", "Terraform"],
      resources: ["AWS Certified Solutions Architect", "Google Cloud Training"]
    }
  ];

  return (
    <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">Career & Skill Guidance</h1>
        <p className="text-zinc-400">Personalized recommendations for internships, jobs, and skill development.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-zinc-800">
        <button 
          onClick={() => setActiveTab('jobs')}
          className={`pb-4 px-2 font-bold transition-all ${activeTab === 'jobs' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Internships & Jobs
        </button>
        <button 
          onClick={() => setActiveTab('skills')}
          className={`pb-4 px-2 font-bold transition-all ${activeTab === 'skills' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Skill Development
        </button>
      </div>

      {activeTab === 'jobs' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Job Type</label>
                  <div className="space-y-2">
                    {['Internship', 'Full-time', 'Contract'].map(type => (
                      <label key={type} className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer hover:text-white">
                        <input type="checkbox" className="rounded border-zinc-800 bg-zinc-950 text-blue-600 focus:ring-blue-500" />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Location</label>
                  <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>Remote</option>
                    <option>On-site</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search roles, companies, or keywords..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            {jobs.map((job) => (
              <div key={job.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center">
                      <Briefcase className="text-blue-500 w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{job.title}</h3>
                      <div className="text-zinc-400 text-sm flex items-center gap-3">
                        <span>{job.company}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <div className="text-white font-bold">{job.salary}</div>
                      <div className="text-emerald-500 text-xs font-bold">{job.match} Match</div>
                    </div>
                    <button className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-lg transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-zinc-400 bg-zinc-950 border border-zinc-800 px-2 py-1 rounded uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillPaths.map((path) => (
            <div key={path.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <TrendingUp className="text-blue-500 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{path.title}</h3>
                </div>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded uppercase">
                  {path.demand} Demand
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-zinc-500 uppercase mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Core Skills to Learn
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map(skill => (
                      <span key={skill} className="text-sm text-zinc-300 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-zinc-500 uppercase mb-3">Recommended Resources</h4>
                  <ul className="space-y-2">
                    {path.resources.map(res => (
                      <li key={res} className="flex items-center gap-2 text-sm text-blue-500 hover:underline cursor-pointer">
                        <ExternalLink className="w-3 h-3" /> {res}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerGuidance;
