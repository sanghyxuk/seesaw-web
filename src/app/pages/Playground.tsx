import { useState, useRef } from "react";
import { useAppContext } from "../store/AppContext";
import { useNavigate } from "react-router";
import { Send, SmilePlus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Comment {
  id: number;
  author: string;
  tag: string;
  content: string;
  reactions: Record<string, number>;
  myReactions: string[];
  time: string;
  isMine?: boolean;
}

const EMOJIS = ['👍', '❤️', '🤣', '😲', '😢', '🔥'];

const initialComments: Comment[] = [
  { id: 1, author: "익명1", tag: "#폴더폰파", content: "역시 낭만은 폴더폰이지ㅋㅋㅋ 탁 닫는 맛을 아냐고", reactions: { '👍': 12, '🤣': 3 }, myReactions: [], time: "10분 전" },
  { id: 2, author: "익명2", tag: "#아이폰파", content: "데이터 안 터지면 카톡을 못하는데 그게 폰임? 벽돌이지", reactions: { '😲': 5, '🔥': 8 }, myReactions: [], time: "15분 전" },
  { id: 3, author: "익명3", tag: "#아이폰파", content: "아니 근데 2000년대 폴더폰이면 모닝콜 소리 개크긴 함", reactions: { '🤣': 15 }, myReactions: [], time: "22분 전" },
  { id: 4, author: "익명4", tag: "#폴더폰파", content: "배터 일주일 감 ㅅㄱ", reactions: { '👍': 24, '❤️': 5 }, myReactions: [], time: "30분 전" },
];

export function Playground() {
  const { votedOption, userTag, isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [activePickerId, setActivePickerId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!isLoggedIn || !votedOption) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-[#f4f1ea]">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <SmilePlus className="text-orange-400" size={40} />
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-3">놀이터 입장은 투표 후에!</h2>
        <p className="text-gray-500 text-[15px] mb-8 leading-relaxed">오늘의 시소에서 친구들과 편을 나누고<br/>신나게 놀이터에서 뛰어놀아요.</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-orange-400 text-white rounded-[2rem] font-black shadow-[0_6px_0_rgb(234,88,12)] hover:translate-y-1 hover:shadow-[0_2px_0_rgb(234,88,12)] transition-all text-lg"
        >
          시소 타러 가기
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "나",
      tag: userTag || "",
      content: newComment,
      reactions: {},
      myReactions: [],
      time: "방금",
      isMine: true
    };

    setComments([comment, ...comments]);
    setNewComment("");
    
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const handleToggleReaction = (commentId: number, emoji: string) => {
    setComments(prev => prev.map(c => {
      if (c.id !== commentId) return c;
      
      const hasReacted = c.myReactions.includes(emoji);
      const newMyReactions = hasReacted 
        ? c.myReactions.filter(e => e !== emoji)
        : [...c.myReactions, emoji];
        
      const newReactions = { ...c.reactions };
      if (hasReacted) {
        newReactions[emoji] = (newReactions[emoji] || 1) - 1;
        if (newReactions[emoji] === 0) delete newReactions[emoji];
      } else {
        newReactions[emoji] = (newReactions[emoji] || 0) + 1;
      }
      
      return { ...c, reactions: newReactions, myReactions: newMyReactions };
    }));
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f1ea]" onClick={() => setActivePickerId(null)}>
      {/* Header */}
      <div className="bg-white px-5 pt-6 pb-4 border-b-[3px] border-orange-100 shadow-sm z-10 shrink-0 flex justify-between items-end rounded-b-3xl">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2 mb-1">
            <SmilePlus className="text-orange-400" size={28} />
            놀이터
            <span className="text-[11px] font-black bg-rose-100 text-rose-500 px-2 py-1 rounded-lg ml-1">실시간</span>
          </h1>
          <p className="text-[13px] text-gray-500 font-medium ml-1">오늘 나의 이름표: <span className="font-black text-orange-500">{userTag}</span></p>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-5 pb-24">
        {comments.map((comment) => (
          <motion.div 
            initial={comment.isMine ? { opacity: 0, scale: 0.9, y: 20 } : false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            key={comment.id} 
            className={`p-4 rounded-3xl ${comment.isMine ? 'bg-orange-50 border-2 border-orange-200' : 'bg-white border-2 border-gray-100'} shadow-[0_4px_12px_rgba(0,0,0,0.03)] relative`}
          >
            {/* Bubble Tail */}
            <div className={`absolute top-6 w-3 h-3 rotate-45 ${comment.isMine ? 'bg-orange-50 border-l-2 border-b-2 border-orange-200 -right-1.5' : 'bg-white border-r-2 border-t-2 border-gray-100 -left-1.5'}`} />

            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-black px-2.5 py-1 rounded-xl ${
                  comment.tag.includes('아이폰') ? 'bg-sky-100 text-sky-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {comment.tag}
                </span>
                <span className="text-sm font-black text-gray-700">{comment.author}</span>
              </div>
              <span className="text-[11px] font-bold text-gray-400">{comment.time}</span>
            </div>
            
            <p className="text-gray-800 text-[15px] font-medium leading-relaxed mb-3 pl-1">
              {comment.content}
            </p>
            
            {/* Reactions */}
            <div className="flex flex-wrap items-center gap-1.5">
              {Object.entries(comment.reactions).map(([emoji, count]) => (
                <button 
                  key={emoji}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleReaction(comment.id, emoji);
                  }}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold transition-all ${
                    comment.myReactions.includes(emoji) 
                      ? 'bg-orange-100 text-orange-600 border border-orange-200 shadow-sm' 
                      : 'bg-white/60 text-gray-500 border border-gray-200 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <span className="text-[13px]">{emoji}</span>
                  <span>{count}</span>
                </button>
              ))}
              
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePickerId(activePickerId === comment.id ? null : comment.id);
                  }}
                  className={`flex items-center justify-center w-7 h-7 rounded-full transition-all border ${
                    activePickerId === comment.id 
                      ? 'bg-orange-100 text-orange-500 border-orange-200' 
                      : 'bg-white/60 text-gray-400 border-dashed border-gray-300 hover:text-orange-500 hover:border-orange-300 hover:bg-white'
                  }`}
                >
                  <SmilePlus size={14} />
                </button>
                
                {/* Emoji Picker Popup */}
                <AnimatePresence>
                  {activePickerId === comment.id && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute left-0 bottom-full mb-2 bg-white rounded-full shadow-lg border border-gray-100 p-1.5 flex gap-0.5 z-20 origin-bottom-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {EMOJIS.map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => {
                            handleToggleReaction(comment.id, emoji);
                            setActivePickerId(null);
                          }}
                          className="w-8 h-8 flex items-center justify-center hover:bg-orange-50 rounded-full text-[17px] transition-transform hover:scale-110"
                        >
                          {emoji}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t-[3px] border-orange-100 shrink-0 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-20">
        <form onSubmit={handleSubmit} className="relative flex items-center bg-gray-50 rounded-[2rem] border-2 border-gray-100 p-1.5 focus-within:border-orange-300 focus-within:bg-orange-50/30 transition-colors">
          <div className="shrink-0 pl-2 pr-1">
            <span className={`text-[10px] font-black px-2 py-1.5 rounded-xl ${
                  userTag?.includes('아이폰') ? 'bg-sky-100 text-sky-600' : 'bg-rose-100 text-rose-600'
                }`}>
              {userTag || "참여자"}
            </span>
          </div>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="친구들에게 한마디 해보세요!"
            className="flex-1 bg-transparent border-none px-2 py-3 text-[15px] font-medium focus:outline-none focus:ring-0 placeholder-gray-400"
          />
          <button 
            type="submit" 
            disabled={!newComment.trim()}
            className="shrink-0 w-12 h-12 bg-orange-400 text-white rounded-full flex items-center justify-center disabled:bg-gray-200 disabled:text-gray-400 transition-colors shadow-sm ml-1"
          >
            <Send size={20} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
