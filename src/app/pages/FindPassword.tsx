import { useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";

export function FindPassword() {
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="flex justify-center bg-[#f4f1ea] min-h-screen font-sans">
      <div className="w-full max-w-[480px] bg-white flex flex-col min-h-[100dvh] relative shadow-2xl overflow-hidden">
        
        <div className="h-16 flex items-center px-4 border-b-4 border-orange-100">
          <button onClick={() => navigate(-1)} className="p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={28} strokeWidth={2.5} />
          </button>
          <span className="font-black text-lg ml-2">비밀번호 찾기</span>
        </div>

        <div className="flex-1 px-6 pt-10 pb-8 overflow-y-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-2 leading-tight">
            비밀번호를<br/>잊어버리셨나요?
          </h2>
          <p className="text-gray-500 font-medium mb-10">가입하신 이메일을 입력하시면, 비밀번호 재설정 링크를 보내드릴게요.</p>

          <form onSubmit={handleSendEmail} className="space-y-6">
            <div>
              <label className="block text-[13px] font-black text-gray-700 mb-2 ml-1">이메일</label>
              <input 
                type="email" 
                required
                placeholder="가입한 이메일을 입력하세요"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-4 text-[15px] font-bold focus:outline-none focus:border-orange-400 focus:bg-orange-50 transition-all"
              />
            </div>
            
            <div className="pt-8">
              <button 
                type="submit"
                disabled={isSent}
                className={`w-full py-4 rounded-[2rem] font-black transition-all text-lg flex items-center justify-center gap-2 ${
                  isSent 
                    ? 'bg-emerald-400 text-white shadow-[0_6px_0_rgb(16,185,129)] translate-y-1 shadow-[0_2px_0_rgb(16,185,129)]' 
                    : 'bg-orange-500 text-white shadow-[0_6px_0_rgb(249,115,22)] hover:translate-y-1 hover:shadow-[0_2px_0_rgb(249,115,22)]'
                }`}
              >
                {isSent ? (
                  <>
                    <Check size={24} strokeWidth={3} />
                    이메일 전송 완료!
                  </>
                ) : (
                  '재설정 링크 받기'
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
