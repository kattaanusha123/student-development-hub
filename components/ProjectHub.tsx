import React, { useState, useEffect } from 'react';
import { Search, Plus, Lightbulb, Heart, MessageCircle, Sparkles, X, Loader2 } from 'lucide-react';
import { getProjectRecommendations } from '../services/gemini';

const ProjectHub: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiRecs, setAiRecs] = useState<any[]>([]);
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.skills.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleGetAiRecs = async () => {
    setIsAiLoading(true);
    const recs = await getProjectRecommendations(
      skills.split(',').map(s => s.trim()),
      interests.split(',').map(i => i.trim())
    );
    setAiRecs(recs);
    setIsAiLoading(false);
  };

  return (
    <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Project Hub</h1>
          <p className="text-zinc-400">Explore existing projects or share your own innovation.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAiModal(true)}
            className="flex items-center gap-2 bg-blue-600/10 text-blue-500 border border-blue-500/20 px-4 py-2 rounded-xl hover:bg-blue-600/20 transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            <span>AI Recommendations</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Post Project</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search by title, description, or skills..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col hover:border-zinc-700 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded uppercase tracking-wider">
                {project.category}
              </span>
              <div className="flex items-center gap-3 text-zinc-500 text-sm">
                <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {project.likes}</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {project.feedback.length}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
            <p className="text-zinc-400 text-sm mb-4 flex-grow line-clamp-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.skills.map((skill: string) => (
                <span key={skill} className="text-[10px] font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded uppercase">
                  {skill}
                </span>
              ))}
            </div>
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                  {project.student[0]}
                </div>
                <span className="text-xs text-zinc-500">{project.student}</span>
              </div>
              <button className="text-xs text-blue-500 font-bold hover:underline">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="text-blue-500 w-6 h-6" />
                <h2 className="text-xl font-bold text-white">AI Project Recommendations</h2>
              </div>
              <button onClick={() => setShowAiModal(false)} className="text-zinc-500 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Your Skills (comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Python, React, IoT"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Your Interests (comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Healthcare, Sustainability, Gaming"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleGetAiRecs}
                  disabled={isAiLoading || !skills || !interests}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lightbulb className="w-5 h-5" />}
                  Generate Ideas
                </button>
              </div>

              {aiRecs.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-bold text-white">Suggested Projects</h3>
                  {aiRecs.map((rec, i) => (
                    <div key={i} className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                      <h4 className="font-bold text-blue-400 mb-2">{rec.title}</h4>
                      <p className="text-sm text-zinc-400 mb-3">{rec.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {rec.technologies.map((t: string) => (
                          <span key={t} className="text-[10px] font-bold text-zinc-500 bg-zinc-900 px-2 py-1 rounded uppercase tracking-wider">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal (Simplified) */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Post New Project</h2>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-500 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Project Title</label>
                <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
                <textarea rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Category</label>
                  <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                    <option>AI & ML</option>
                    <option>Web Dev</option>
                    <option>IoT</option>
                    <option>Sustainability</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Skills (comma separated)</label>
                  <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors mt-4">
                Submit Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectHub;
