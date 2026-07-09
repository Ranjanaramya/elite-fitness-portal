'use client';

import { useState, useEffect } from 'react';
import { addReview, editReview, deleteReview } from '@/lib/actions';
import { Review } from '@/lib/types';
import { Star, Edit2, Trash2, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ReviewsClient({
  initialReviews
}: {
  initialReviews: Review[];
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!comment) {
      setError('Please type a comment.');
      return;
    }

    setLoading(true);

    try {
      const res = await addReview({ rating, comment });
      if (res.success) {
        setSuccess('Review submitted! It will appear on the homepage once approved by Admin.');
        setComment('');
        setRating(5);
        
        // Add locally as pending
        const newRev: Review = {
          id: 'rev_' + Math.random().toString(36).substr(2, 9),
          userId: 'user',
          userName: 'You',
          rating,
          comment,
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        setReviews(prev => [newRev, ...prev]);
      } else {
        setError(res.error || 'Failed to submit review.');
      }
    } catch (e) {
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (r: Review) => {
    setEditingId(r.id);
    setEditRating(r.rating);
    setEditComment(r.comment);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await editReview(editingId, { rating: editRating, comment: editComment });
      if (res.success) {
        setSuccess('Review updated and sent for Admin verification.');
        
        // Update local state
        setReviews(prev => prev.map(r => r.id === editingId ? { ...r, rating: editRating, comment: editComment, status: 'pending' } : r));
        setEditingId(null);
      } else {
        setError(res.error || 'Failed to update review.');
      }
    } catch (e) {
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setError('');
    setSuccess('');
    try {
      const res = await deleteReview(id);
      if (res.success) {
        setReviews(prev => prev.filter(r => r.id !== id));
        setSuccess('Review deleted.');
      } else {
        setError(res.error || 'Failed to delete review.');
      }
    } catch (e) {
      setError('An error occurred.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
      
      {/* Review Submission Form */}
      <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-space text-xl font-bold mb-6 text-slate-900">
            {editingId ? 'Edit Review' : 'Submit Gym Review'}
          </h3>
          
          {success && (
            <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 p-4 rounded-xl text-xs font-semibold mb-6">
              ✓ {success}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-xs font-semibold mb-6">
              {error}
            </div>
          )}

          {editingId ? (
            <form onSubmit={handleSaveEdit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditRating(star)}
                      aria-label={`Rate ${star} Star${star > 1 ? 's' : ''}`}
                      className="text-slate-300 hover:text-indigo-500 transition-colors focus:outline-none cursor-pointer"
                    >
                      <Star className={`w-8 h-8 ${star <= editRating ? 'fill-indigo-500 text-indigo-500' : 'text-slate-200'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="edit-comment" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Comment</label>
                <textarea
                  id="edit-comment"
                  required
                  rows={4}
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm font-medium"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-md text-xs cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 py-3.5 border border-slate-200 bg-white text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAdd} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      aria-label={`Rate ${star} Star${star > 1 ? 's' : ''}`}
                      className="text-slate-300 hover:text-indigo-500 transition-colors focus:outline-none cursor-pointer"
                    >
                      <Star className={`w-8 h-8 ${star <= rating ? 'fill-indigo-500 text-indigo-500' : 'text-slate-200'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="submit-comment" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Your Comment</label>
                <textarea
                  id="submit-comment"
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your experience..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-md text-sm cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      </div>

      {/* List of previously submitted reviews */}
      <div className="lg:col-span-2 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-space text-xl font-bold mb-6 text-slate-900">Your Gym Reviews History</h3>
          
          {reviews.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-sm flex flex-col items-center">
              <MessageSquare className="w-10 h-10 text-slate-350 mb-4" />
              <p>You haven't submitted any reviews yet. Leave a testimonial to share your progress!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {reviews.map((r) => (
                <div 
                  key={r.id} 
                  className="p-5 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col justify-between gap-4 text-xs"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(r.rating)].map((_, si) => (
                          <Star key={si} className="w-4 h-4 fill-indigo-500 text-indigo-500" />
                        ))}
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed">"{r.comment}"</p>
                      <span className="text-[9px] text-slate-400 mt-2 block">Submitted on {mounted ? new Date(r.createdAt).toLocaleDateString() : ''}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartEdit(r)}
                        className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                        title="Edit Review"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-red-650 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-2 border-t border-slate-200/60">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Status:</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${r.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : r.status === 'rejected' ? 'bg-red-100 text-red-750' : 'bg-amber-100 text-amber-700'}`}>
                      {r.status === 'approved' ? 'Approved & Featured' : r.status === 'rejected' ? 'Declined' : 'Pending Verification'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
