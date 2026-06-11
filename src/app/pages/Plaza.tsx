import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../store/AppContext";
import { useNavigate } from "react-router";
import { Send, ThumbsUp, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

interface Comment {
  id: number;
  author: string;
  tag: string;
  content: string;
  likes: number;
  time: string;
  isMine?: boolean;
}

const initialComments: Comment[] = [
  { id: 1, author: "익명1", tag: "#폴더폰파", content: "역시 낭만은 폴더폰이지ㅋㅋㅋ 탁 닫는 맛을 아냐고", likes: 24, time: "10분 전" },
  { id: 2, author: "익명2", tag: "#아이폰파", content: "데이터 안 터지면 카톡을 못하는데 그게 폰임? 벽돌이지", likes: 18, time: "15분 전" },
  { id: 3, author: "익명3", tag: "#아이폰파", content: "아니 근데 2000년대 폴더폰이면 모닝콜 소리 개크긴 함", likes: 5, time: "22분 전" },
  { id: 4, author: "익명4", tag: "#폴더폰파", content: "배터리 일주일 감 ㅅㄱ", likes: 45, time: "30분 전" },
];

export function Plaza() {
  const { votedOption, userTag, isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!isLoggedIn || !votedOption) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <MessageSquare className="text-gray-300" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">투표 후 입장 가능합니다</h2>
        <p className="text-gray-500 text-sm mb-8">오늘의 시소에서 진영을 선택하고<br/>광장에 참여해보세요.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-md hover:bg-gray-800"
        >
          투표하러 가기
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
      likes: 0,
      time: "방금",
      isMine: true
    };

    setComments([comment, ...comments]);
    setNewComment("");
    
    // Scroll to top
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white px-4 pt-6 pb-4 border-b border-gray-100 shadow-sm z-10 shrink-0">
        <h1 className="text-xl font-black text-gray-900 flex items-center gap-2">
          광장
          <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">LIVE</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">오늘의 진영: <span className="font-bold text-gray-800">{userTag}</span></p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.map((comment) => (
          <motion.div 
            initial={comment.isMine ? { opacity: 0, y: -10 } : false}
            animate={{ opacity: 1, y: 0 }}
            key={comment.id} 
            className={`p-4 rounded-2xl ${comment.isMine ? 'bg-indigo-50 border border-indigo-100' : 'bg-white border border-gray-100'} shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                  comment.tag.includes('아이폰') ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {comment.tag}
                </span>
                <span className="text-sm font-bold text-gray-700">{comment.author}</span>
              </div>
              <span className="text-xs text-gray-400">{comment.time}</span>
            </div>
            <p className="text-gray-800 text-[15px] leading-relaxed mb-3">
              {comment.content}
            </p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-gray-400 hover:text-rose-500 transition-colors">
                <ThumbsUp size={14} />
                <span className="text-xs font-medium">{comment.likes}</span>
              </button>
              <button className="flex items-center gap-1 text-gray-400 hover:text-indigo-500 transition-colors">
                <MessageSquare size={14} />
                <span className="text-xs font-medium">답글</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-3 bg-white border-t border-gray-100 shrink-0">
        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute left-3 top-3.5">
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                  userTag?.includes('아이폰') ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'
                }`}>
              {userTag}
            </span>
          </div>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="진영의 명예를 걸고 한마디!"
            className="w-full bg-gray-100 rounded-xl pl-[85px] pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
          <button 
            type="submit" 
            disabled={!newComment.trim()}
            className="absolute right-2 top-1.5 p-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
