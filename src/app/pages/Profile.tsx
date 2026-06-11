import { useAppContext } from "../store/AppContext";
import { useNavigate } from "react-router";
import { UserCircle, LogOut, ChevronRight, Bookmark, Check } from "lucide-react";
import { useState } from "react";

export function Profile() {
  const { isLoggedIn, setIsLoggedIn, userTag } = useAppContext();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("익명1");
  const [isSaved, setIsSaved] = useState(false);
  
  // Modal states
  const [showPostsModal, setShowPostsModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-[#f4f1ea]">
        <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <UserCircle className="text-sky-400" size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-3">로그인이 필요합니다</h2>
        <p className="text-gray-500 text-[15px] mb-8 leading-relaxed">시소 놀이터의 모든 기구를 타려면<br/>먼저 로그인해주세요.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-8 py-4 bg-sky-500 text-white rounded-[2rem] font-black shadow-[0_6px_0_rgb(14,165,233)] hover:translate-y-1 hover:shadow-[0_2px_0_rgb(14,165,233)] transition-all text-lg"
        >
          로그인 / 회원가입
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f4f1ea]">
      <div className="bg-white px-6 pt-12 pb-8 border-b-[3px] border-sky-100 rounded-b-3xl shadow-sm relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-20 h-20 bg-sky-100 rounded-[2rem] flex items-center justify-center text-sky-500 border-4 border-white shadow-md rotate-3">
            <UserCircle size={48} strokeWidth={1.5} />
          </div>
        </div>
        
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-black text-gray-900">{nickname}</h1>
        </div>

        <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
          오늘 나의 이름표: 
          {userTag ? (
            <span className={`text-[11px] font-black px-2.5 py-1 rounded-xl border border-dashed ${
              userTag.includes('아이폰') ? 'bg-sky-50 text-sky-600 border-sky-300' : 'bg-rose-50 text-rose-600 border-rose-300'
            }`}>
              {userTag}
            </span>
          ) : (
            <span className="text-[11px] font-black px-2.5 py-1 rounded-xl bg-gray-100 text-gray-400 border border-dashed border-gray-300">
              미참여
            </span>
          )}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        
        {/* Profile Edit Form */}
        <div className="bg-white p-6 rounded-3xl border-2 border-sky-100 shadow-sm mb-2">
          <form onSubmit={handleSave} className="space-y-6">
            
            <div>
              <label className="block text-[13px] font-black text-sky-600 mb-3 ml-1">닉네임 (이름표)</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="놀이터에서 쓸 이름 (예: 익명1)"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-4 text-[15px] font-bold focus:outline-none focus:border-sky-400 focus:bg-sky-50 transition-all"
                />
              </div>
              <p className="text-xs text-gray-400 font-medium mt-2 ml-2">놀이터에서 친구들에게 보여질 이름이에요.</p>
            </div>

            <div>
              <label className="block text-[13px] font-black text-gray-400 mb-3 ml-1">연동된 계정</label>
              <div className="w-full bg-gray-100 border-2 border-gray-200 rounded-2xl px-5 py-4 text-[15px] font-bold text-gray-500 flex items-center justify-between">
                <span>kakao@example.com</span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-lg">카카오</span>
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className={`w-full py-4 rounded-[2rem] font-black transition-all text-lg flex items-center justify-center gap-2 ${
                  isSaved 
                    ? 'bg-emerald-400 text-white shadow-[0_6px_0_rgb(16,185,129)] translate-y-1 shadow-[0_2px_0_rgb(16,185,129)]' 
                    : 'bg-sky-500 text-white shadow-[0_6px_0_rgb(14,165,233)] hover:translate-y-1 hover:shadow-[0_2px_0_rgb(14,165,233)]'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check size={24} strokeWidth={3} />
                    저장 완료!
                  </>
                ) : (
                  '변경사항 저장하기'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border-2 border-gray-100 overflow-hidden">
          <div onClick={() => setShowPostsModal(true)} className="p-5 flex items-center justify-between cursor-pointer hover:bg-sky-50 transition-colors group">
            <div className="flex items-center gap-3 text-gray-700 font-bold">
              <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center text-sky-500">
                <Bookmark size={20} strokeWidth={2.5} />
              </div>
              내가 쓴 글
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-sky-400 transition-colors" strokeWidth={3} />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border-2 border-rose-100 overflow-hidden mt-8">
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full p-5 flex items-center justify-between cursor-pointer hover:bg-rose-50 text-rose-500 font-black text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                <LogOut size={20} strokeWidth={2.5} />
              </div>
              로그아웃
            </div>
          </button>
        </div>

        <div className="text-center mt-4 pb-8">
           <button onClick={() => setShowDeleteModal(true)} className="text-xs font-bold text-gray-400 hover:text-rose-500 underline underline-offset-2">
             회원 탈퇴하기
           </button>
        </div>

      </div>

      {/* Modals */}
      
      {/* 1. 내가 쓴 글 모달 */}
      {showPostsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-500 mb-4 mx-auto rotate-3">
              <Bookmark size={32} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-black text-center text-gray-900 mb-2">작성한 글이 없어요</h3>
            <p className="text-center text-gray-500 text-[15px] mb-8 leading-relaxed">놀이터에서 재미있는 의견을 남기고<br/>이름표를 뽐내보세요!</p>
            <button 
              onClick={() => setShowPostsModal(false)}
              className="w-full py-4 bg-sky-500 text-white rounded-2xl font-black shadow-[0_4px_0_rgb(14,165,233)] active:scale-95 active:translate-y-1 active:shadow-none transition-all"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 2. 로그아웃 모달 */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 mb-4 mx-auto -rotate-3">
              <LogOut size={32} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-black text-center text-gray-900 mb-2">로그아웃 하시겠습니까?</h3>
            <p className="text-center text-gray-500 text-[15px] mb-8 leading-relaxed">시소에서 언제든 다시 만나요!</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black active:scale-95 transition-all"
              >
                취소
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-[0_4px_0_rgb(31,41,55)] active:scale-95 active:translate-y-1 active:shadow-none transition-all"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. 회원탈퇴 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate-in zoom-in-95 duration-200 border-4 border-rose-100">
            <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-500 mb-4 mx-auto rotate-6">
              <LogOut size={32} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-black text-center text-gray-900 mb-2">정말 탈퇴하시겠습니까?</h3>
            <p className="text-center text-rose-500 text-[15px] font-medium mb-8 leading-relaxed bg-rose-50 py-3 px-4 rounded-xl">탈퇴 시 모든 정보와 작성한 글이<br/>삭제되며 복구할 수 없어요.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black active:scale-95 transition-all"
              >
                취소
              </button>
              <button 
                onClick={handleDeleteAccount}
                className="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-black shadow-[0_4px_0_rgb(225,29,72)] active:scale-95 active:translate-y-1 active:shadow-none transition-all"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
