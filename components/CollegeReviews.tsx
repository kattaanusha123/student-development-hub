import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ThumbsUp, ShieldCheck, AlertCircle, Loader2, Send } from 'lucide-react';
import { analyzeSentiment } from '../services/gemini';

const CollegeReviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [rating, setRating] = useState(5);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview || !collegeName) return;

    setIsAnalyzing(true);
    const sentiment = await analyzeSentiment(newReview);
    
    const review = {
      id: Math.random().toString(36).substr(2, 9),
      college: collegeName,
      rating,
      comment: newReview,
      sentiment
    };

    setReviews([review, ...reviews]);
    setNewReview('');
    setCollegeName('');
    setIsAnalyzing(false);
  };

  return (
    <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">College Reviews</h1>
        <p className="text-zinc-400">Reliable and transparent feedback from students, powered by AI sentiment analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Post Review Form */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">College Name</label>
                <input 
                  type="text" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="e.g. Stanford University"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button 
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`p-2 rounded-lg border ${rating >= num ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' : 'bg-zinc-950 border-zinc-800 text-zinc-600'}`}
                    >
                      <Star className={`w-5 h-5 ${rating >= num ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Your Review</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Tell us about the faculty, facilities, and campus life..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isAnalyzing || !newReview || !collegeName}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                Post Review
              </button>
              <p className="text-[10px] text-zinc-500 text-center">
                Your review will be analyzed by AI for sentiment and transparency.
              </p>
            </form>
          </div>
        </div>

        {/* Review List */}
        <div className="lg:col-span-2 space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{review.college}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-zinc-700'}`} />
                      ))}
                    </div>
                    <span className="text-zinc-500 text-sm">• Verified Student</span>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  review.sentiment === 'Positive' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                  review.sentiment === 'Negative' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' :
                  'bg-zinc-500/10 border-zinc-500/20 text-zinc-400'
                }`}>
                  {review.sentiment === 'Positive' ? <ShieldCheck className="w-3.5 h-3.5" /> : 
                   review.sentiment === 'Negative' ? <AlertCircle className="w-3.5 h-3.5" /> : 
                   <MessageSquare className="w-3.5 h-3.5" />}
                  {review.sentiment} Sentiment
                </div>
              </div>
              <p className="text-zinc-300 leading-relaxed mb-6 italic">"{review.comment}"</p>
              <div className="flex items-center gap-6 pt-6 border-t border-zinc-800">
                <button className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm">
                  <ThumbsUp className="w-4 h-4" /> Helpful (12)
                </button>
                <button className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm">
                  <MessageSquare className="w-4 h-4" /> Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollegeReviews;
