import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CommunityFeed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [communities, setCommunities] = useState<any[]>([]);
  const [isComposing, setIsComposing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [expandedPostData, setExpandedPostData] = useState<any>(null);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    fetchPosts();
    fetchCommunities();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const fetchCommunities = async () => {
    try {
      const res = await axios.get('/api/communities');
      setCommunities(res.data);
      if (res.data.length > 0) setSelectedCommunity(res.data[0].id);
    } catch (err) {
      console.error('Error fetching communities:', err);
    }
  };

  const fetchPostDetails = async (id: string) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      setExpandedPostData(res.data);
    } catch (err) {
      console.error('Error fetching post details:', err);
    }
  };

  const handleExpandPost = (id: string) => {
    if (expandedPostId === id) {
       setExpandedPostId(null);
       setExpandedPostData(null);
    } else {
       setExpandedPostId(id);
       setExpandedPostData(null); // Clear previous
       fetchPostDetails(id);
    }
  };

  const handleUpvote = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await axios.post(`/api/posts/${postId}/upvote`, { userId: user.id });
      fetchPosts();
      if (expandedPostId === postId) fetchPostDetails(postId);
    } catch (err: any) {
      if (err.response?.status === 400) {
        alert("You already upvoted this post!");
      } else {
        console.error(err);
      }
    }
  };

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !selectedCommunity) return;

    try {
      await axios.post('/api/posts', {
        title: newTitle,
        content: newContent,
        authorId: user.id,
        communityId: selectedCommunity,
        tags: 'user-post'
      });
      setNewTitle('');
      setNewContent('');
      setIsComposing(false);
      fetchPosts();
      
      user.xp = (user.xp || 0) + 5;
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      console.error(err);
    }
  };

  const submitAnswer = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      await axios.post(`/api/posts/${postId}/answers`, {
        content: newAnswer,
        authorId: user.id
      });
      setNewAnswer('');
      fetchPostDetails(postId); // Refresh the expanded post to show new answer
      fetchPosts(); // Refresh feed to update answer count
      
      user.xp = (user.xp || 0) + 3;
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto py-xl animate-slide-up">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-lg">
        <div>
          <h2 className="font-display text-display text-primary mb-xs">Community Feed</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Insights, debates, and knowledge sharing from elite peers.</p>
        </div>
        <button onClick={() => setIsComposing(!isComposing)} className="bg-primary text-black font-label-md px-md py-2 rounded-lg flex items-center gap-xs hover:opacity-90 transition-opacity uppercase tracking-widest">
          <span className="material-symbols-outlined text-[18px]">{isComposing ? 'close' : 'add'}</span>
          {isComposing ? 'Cancel' : 'New Post'}
        </button>
      </div>

      {isComposing && (
        <form onSubmit={submitPost} className="bg-surface/60 backdrop-blur-xl border border-surface-container-high rounded-xl p-md mb-lg ambient-glow relative overflow-hidden">
          <h3 className="font-headline-md text-primary mb-md border-b border-surface-container-high pb-sm">Compose Transmission</h3>
          <div className="space-y-sm relative z-10">
            <select 
              value={selectedCommunity} 
              onChange={e => setSelectedCommunity(e.target.value)}
              className="w-full bg-[#000000]/40 border border-[#27272A]/50 rounded-lg p-3 font-body-md text-primary outline-none focus:border-primary/50"
            >
              {communities.map(c => <option key={c.id} value={c.id} className="bg-surface text-on-surface">{c.name}</option>)}
            </select>
            <input 
              type="text" 
              placeholder="Post Title" 
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full bg-[#000000]/40 border border-[#27272A]/50 rounded-lg p-3 font-headline-sm text-primary placeholder:text-surface-variant outline-none focus:border-primary/50"
            />
            <textarea 
              placeholder="What knowledge do you seek or offer?" 
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              className="w-full bg-[#000000]/40 border border-[#27272A]/50 rounded-lg p-3 font-body-md text-on-surface placeholder:text-surface-variant outline-none focus:border-primary/50 min-h-[120px]"
            />
            <div className="text-right">
              <button type="submit" className="bg-primary text-black font-label-md px-lg py-3 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-widest flex items-center gap-xs inline-flex">
                <span className="material-symbols-outlined text-[18px]">send</span>
                Transmit (+5 XP)
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Feed Tabs */}
      <div className="flex items-center gap-sm mb-lg border-b border-[#27272A]/50 overflow-x-auto">
        <button className="px-md py-3 border-b-2 border-primary text-primary font-label-md text-label-md hover:bg-surface-container-low/30 transition-colors whitespace-nowrap">Trending</button>
        <button className="px-md py-3 border-b-2 border-transparent text-on-surface-variant hover:text-primary hover:border-outline-variant/50 font-label-md text-label-md transition-colors whitespace-nowrap">Latest</button>
      </div>

      {/* Feed Container */}
      <div className="flex flex-col gap-md relative">
        <div className="absolute left-[36px] top-12 bottom-12 w-px bg-[#27272A]/50 z-0 hidden sm:block"></div>

        {posts.length === 0 ? (
           <div className="py-xl text-center font-body-md text-on-surface-variant border border-surface-container-high rounded-xl bg-surface/60 backdrop-blur-md">
             No transmissions found in the network. Be the first.
           </div>
        ) : posts.map((post: any) => {
          const isExpanded = expandedPostId === post.id;
          
          return (
          <article 
             key={post.id} 
             onClick={() => handleExpandPost(post.id)}
             className={`bg-[#09090B]/60 backdrop-blur-xl border border-[#27272A]/50 rounded-[20px] p-md relative z-10 transition-all duration-300 ambient-glow group cursor-pointer ${isExpanded ? 'ring-1 ring-primary/50 shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.3)]' : 'hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:border-outline-variant/80'}`}
          >
            <div className="flex items-start justify-between mb-sm">
              <div className="flex items-center gap-sm">
                <div className="w-12 h-12 rounded-full border border-[#27272A]/80 flex items-center justify-center shrink-0 bg-surface-container-highest/50">
                   <span className="font-display text-primary text-xl font-bold">{post.author.username?.[0]?.toUpperCase()}</span>
                </div>
                <div>
                  <div className="flex items-center gap-xs">
                    <span className="font-label-md text-label-md text-primary">@{post.author.username}</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-low/40 border border-[#27272A]/50 font-mono-sm text-mono-sm text-on-surface-variant">LVL {post.author.currentLevel}</span>
                  </div>
                  <div className="font-mono-sm text-mono-sm text-on-surface-variant mt-1">
                    {new Date(post.createdAt).toLocaleDateString()} in <span className="text-outline hover:text-primary transition-colors cursor-pointer">#{post.community.name}</span>
                  </div>
                </div>
              </div>
              {post.isPinned && (
                <span className="text-amber-400 bg-amber-400/10 px-2 py-1 rounded text-xs uppercase tracking-widest font-bold border border-amber-400/30">Pinned</span>
              )}
            </div>

            <div className="ml-0 sm:ml-[60px]">
              <h3 className="font-headline-md text-headline-md text-primary mb-2">{post.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>

              <div className="flex items-center gap-md border-t border-[#27272A]/50 pt-sm mt-sm">
                <button onClick={(e) => handleUpvote(post.id, e)} className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors group/btn">
                  <span className="material-symbols-outlined group-hover/btn:-translate-y-0.5 transition-transform" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_upward</span>
                  <span className="font-label-md text-label-md">{post._count?.upvotes || 0}</span>
                </button>
                <button className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>chat_bubble_outline</span>
                  <span className="font-label-md text-label-md">{post._count?.answers || 0}</span>
                </button>
              </div>

              {/* Expanded View for Answers */}
              {isExpanded && (
                 <div className="mt-md pt-md border-t border-[#27272A]/50 animate-slide-up" onClick={e => e.stopPropagation()}>
                    <h4 className="font-label-md text-primary uppercase tracking-widest mb-sm flex items-center gap-2">
                       <span className="material-symbols-outlined text-[18px]">forum</span>
                       Knowledge Exchange
                    </h4>
                    
                    {!expandedPostData ? (
                       <div className="text-on-surface-variant font-mono-sm uppercase animate-pulse">Loading core logic...</div>
                    ) : (
                       <div className="space-y-sm mb-md">
                          {expandedPostData.answers.length === 0 ? (
                             <p className="font-body-md text-on-surface-variant italic">No answers provided yet.</p>
                          ) : (
                             expandedPostData.answers.map((answer: any) => (
                                <div key={answer.id} className="bg-surface-container-highest/30 p-sm rounded-lg border border-surface-container-high">
                                   <div className="flex justify-between items-start mb-1">
                                      <span className="font-label-md text-primary text-sm">@{answer.author.username} <span className="text-on-surface-variant ml-1 font-mono-sm">LVL {answer.author.currentLevel}</span></span>
                                   </div>
                                   <p className="font-body-md text-on-surface whitespace-pre-wrap">{answer.content}</p>
                                </div>
                             ))
                          )}
                       </div>
                    )}

                    <form onSubmit={(e) => submitAnswer(e, post.id)} className="flex gap-sm">
                       <input 
                         type="text" 
                         value={newAnswer}
                         onChange={e => setNewAnswer(e.target.value)}
                         placeholder="Contribute to this discussion..."
                         className="flex-1 bg-[#000000]/40 border border-[#27272A]/50 rounded-lg p-2 font-body-md text-primary outline-none focus:border-primary/50"
                       />
                       <button type="submit" className="bg-surface-container-highest border border-surface-container-high hover:border-primary text-primary px-sm rounded-lg font-label-md uppercase tracking-widest transition-colors">
                          Reply
                       </button>
                    </form>
                 </div>
              )}
            </div>
          </article>
        )})}
      </div>
    </div>
  );
}
