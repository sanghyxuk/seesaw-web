import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAppContext } from "../store/AppContext";
import { ChevronRight, Sun } from "lucide-react";
import { useNavigate } from "react-router";

export function Home() {
  const { votedOption, setVotedOption, setUserTag, isLoggedIn } = useAppContext();
  const navigate = useNavigate();

  // Mock data for today
  const todayQuestion = "데이터 안 터지는 최신 아이폰\nvs\n5G 빵빵한 2000년대 폴더폰";
  const optionA = "최신 아이폰";
  const optionB = "폴더폰";
  const tagA = "#아이폰파";
  const tagB = "#폴더폰파";
  const percentA = 45;
  const percentB = 55;

  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (votedOption) {
      setShowResult(true);
    }
  }, [votedOption]);

  const handleVote = (option: 'A' | 'B') => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setVotedOption(option);
    setUserTag(option === 'A' ? tagA : tagB);
    setTimeout(() => setShowResult(true), 300); 
  };

  const rotation = showResult ? ((percentB - percentA) / 100) * 40 : 0;

  return (
    <div className="flex flex-col items-center h-full overflow-y-auto pt-10 px-6 bg-gradient-to-b from-sky-100 via-sky-50 to-[moccasin] relative pb-8">
      {/* Sun Decoration */}
      <div className="absolute top-8 left-6 text-yellow-400 opacity-80 animate-pulse">
        <Sun size={40} fill="currentColor" />
      </div>

      <div className="w-full flex justify-end items-center mb-10 shrink-0 relative z-10">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-sky-100">
          <span className="text-sm font-black text-orange-500 tracking-wider">오늘의 시소</span>
          <span className="text-xs text-gray-500 font-bold bg-orange-100 px-2 py-0.5 rounded-md">
            남은 시간 12:45
          </span>
        </div>
      </div>

      {/* Question */}
      <h1 className="text-2xl font-black text-center leading-relaxed whitespace-pre-wrap text-gray-800 mb-16 shrink-0 h-24 flex items-center justify-center relative z-10 drop-shadow-sm">
        {todayQuestion}
      </h1>

      {/* Seesaw Illustration - Playground Theme */}
      <div className="relative w-full h-64 flex flex-col items-center justify-end mb-8 shrink-0">
        
        {/* Floating Clouds Background */}
        <div className="absolute top-0 left-4 opacity-50 animate-[bounce_4s_infinite]">
          <div className="w-12 h-4 bg-white rounded-full blur-[1px]" />
        </div>
        <div className="absolute top-4 right-8 opacity-40 animate-[bounce_5s_infinite_0.5s]">
          <div className="w-16 h-5 bg-white rounded-full blur-[1px]" />
        </div>

        {/* The Board */}
        <motion.div
          className="relative w-full h-6 rounded-full z-10 border-b-[6px] border-amber-800 shadow-[0_10px_20px_rgba(0,0,0,0.15)] flex items-center justify-center bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 overflow-visible"
          initial={{ rotate: 0 }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 45, damping: 12, mass: 1.5 }}
          style={{ originX: 0.5, originY: 0.5 }}
        >
          {/* Center Bolt */}
          <div className="absolute w-6 h-6 bg-gray-300 rounded-full border-4 border-gray-500 shadow-inner z-20 flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-600 rounded-full" />
          </div>

          {/* Left Handle & Seat */}
          <div className="absolute left-4 -top-8 flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-sky-400 rounded-t-xl border-b-0" />
            <div className="w-16 h-3 bg-sky-500 rounded-full -mt-1 shadow-sm border-b-2 border-sky-700" />
          </div>

          {/* Right Handle & Seat */}
          <div className="absolute right-4 -top-8 flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-rose-400 rounded-t-xl border-b-0" />
            <div className="w-16 h-3 bg-rose-500 rounded-full -mt-1 shadow-sm border-b-2 border-rose-700" />
          </div>

          {/* Option A Character (Left) */}
          <div className="absolute left-5 -top-24 flex flex-col items-center origin-bottom">
            {showResult && (
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.4 }}
                className="text-2xl font-black text-sky-600 mb-2 drop-shadow-md bg-white/90 px-4 py-1.5 rounded-3xl backdrop-blur-md border-2 border-sky-100 relative shadow-lg"
              >
                {percentA}%
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
              </motion.div>
            )}
            <motion.div 
              animate={{ y: !showResult ? [0, -8, 0] : 0 }}
              transition={{ repeat: !showResult ? Infinity : 0, duration: 1.5, ease: "easeInOut" }}
              className={`w-16 h-16 rounded-3xl border-4 flex items-center justify-center text-3xl font-black shadow-xl transition-all duration-300 relative ${votedOption === 'A' ? 'bg-sky-400 border-white text-white shadow-[0_0_20px_rgba(56,189,248,0.5)] scale-110 z-20' : 'bg-white border-sky-200 text-sky-400 z-10'}`}
            >
              A
              {votedOption === 'A' && (
                <div className="absolute -top-3 -right-2 text-2xl animate-bounce">✨</div>
              )}
            </motion.div>
          </div>

          {/* Option B Character (Right) */}
          <div className="absolute right-5 -top-24 flex flex-col items-center origin-bottom">
            {showResult && (
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                className="text-2xl font-black text-rose-500 mb-2 drop-shadow-md bg-white/90 px-4 py-1.5 rounded-3xl backdrop-blur-md border-2 border-rose-100 relative shadow-lg"
              >
                {percentB}%
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
              </motion.div>
            )}
            <motion.div 
              animate={{ y: !showResult ? [0, -8, 0] : 0 }}
              transition={{ repeat: !showResult ? Infinity : 0, duration: 1.5, ease: "easeInOut", delay: 0.75 }}
              className={`w-16 h-16 rounded-3xl border-4 flex items-center justify-center text-3xl font-black shadow-xl transition-all duration-300 relative ${votedOption === 'B' ? 'bg-rose-400 border-white text-white shadow-[0_0_20px_rgba(251,113,133,0.5)] scale-110 z-20' : 'bg-white border-rose-200 text-rose-400 z-10'}`}
            >
              B
              {votedOption === 'B' && (
                <div className="absolute -top-3 -right-2 text-2xl animate-bounce">✨</div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* The Pivot Base (Playground metal structure) */}
        <div className="relative flex flex-col items-center mt-[-6px] z-0">
          <div className="w-24 h-28 relative flex justify-center drop-shadow-xl">
            {/* Base Triangle */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-green-500 fill-current" preserveAspectRatio="none">
              <path d="M50 0 L100 100 L0 100 Z" className="text-orange-400 fill-current drop-shadow-md" />
              <path d="M50 0 L80 100 L20 100 Z" className="text-orange-500 fill-current opacity-80" />
            </svg>
            {/* Striped details */}
            <div className="absolute bottom-2 w-16 h-2 bg-yellow-400/80 rounded-full" />
            <div className="absolute bottom-6 w-12 h-2 bg-yellow-400/80 rounded-full" />
          </div>
          
          {/* Ground / Grass */}
          <div className="absolute -bottom-2 w-48 h-6 bg-green-400 rounded-[100%] blur-[2px] opacity-60 z-[-1]" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex-1 flex flex-col justify-end min-h-[120px] relative z-10">
        {!showResult ? (
          <div className="w-full flex gap-4">
            <button
              onClick={() => handleVote('A')}
              className="flex-1 py-5 bg-white border-4 border-sky-100 rounded-[2rem] shadow-[0_8px_0_rgb(224,242,254)] hover:translate-y-1 hover:shadow-[0_4px_0_rgb(224,242,254)] transition-all text-sky-600 font-black flex flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl bg-sky-100 w-10 h-10 rounded-full flex items-center justify-center">A</span>
              <span className="text-sm">{optionA}</span>
            </button>
            <button
              onClick={() => handleVote('B')}
              className="flex-1 py-5 bg-white border-4 border-rose-100 rounded-[2rem] shadow-[0_8px_0_rgb(255,228,230)] hover:translate-y-1 hover:shadow-[0_4px_0_rgb(255,228,230)] transition-all text-rose-500 font-black flex flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl bg-rose-100 w-10 h-10 rounded-full flex items-center justify-center">B</span>
              <span className="text-sm">{optionB}</span>
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col gap-4 bg-white/80 p-5 rounded-3xl backdrop-blur-sm border-2 border-orange-100 shadow-xl"
          >
            <div className="text-center text-gray-600 text-[15px] font-medium">
              신나는 놀이터에 입장할 준비가 되었나요?<br/>
              당신의 이름표는 <span className="font-black text-orange-500 text-lg">{votedOption === 'A' ? tagA : tagB}</span> 입니다.
            </div>
            <button
              onClick={() => navigate('/playground')}
              className="w-full py-4 bg-orange-400 text-white rounded-2xl font-black shadow-[0_6px_0_rgb(234,88,12)] hover:translate-y-1 hover:shadow-[0_2px_0_rgb(234,88,12)] transition-all flex items-center justify-center gap-2 text-lg"
            >
              놀이터에서 뛰어놀기
              <ChevronRight size={24} strokeWidth={3} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
