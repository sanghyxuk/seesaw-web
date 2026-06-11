import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export function Signup() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-[#f4f1ea] min-h-screen font-sans">
      <div className="w-full max-w-[480px] bg-white flex flex-col min-h-[100dvh] relative shadow-2xl overflow-hidden">
        
        <div className="h-16 flex items-center px-4 border-b-4 border-yellow-100">
          <button onClick={() => navigate(-1)} className="p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={28} strokeWidth={2.5} />
          </button>
          <span className="font-black text-lg ml-2">회원가입</span>
        </div>

        <div className="flex-1 px-6 pt-10 pb-8 overflow-y-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-2 leading-tight">
            시소에 탈 준비를<br/>시작해볼까요?
          </h2>
          <p className="text-gray-500 font-medium mb-8">간단한 정보만 입력하면 놀이터 입장 준비 끝!</p>

          <div className="space-y-3 mb-8">
            <button 
              onClick={() => navigate('/login')}
              className="w-full py-3.5 bg-[#FEE500] text-black font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_4px_0_rgb(224,200,0)] relative"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 absolute left-5" fill="currentColor">
                <path d="M12 3c-5.52 0-10 3.48-10 7.78 0 2.76 1.76 5.16 4.41 6.54-.42 1.54-1.5 5.56-1.54 5.76-.04.22.14.3.3.26.22-.04 6.13-4.14 7.15-4.83.39.04.78.07 1.18.07 5.52 0 10-3.48 10-7.78S17.52 3 12 3z"/>
              </svg>
              카카오로 3초 만에 가입하기
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="w-full py-3.5 bg-white border-2 border-gray-200 text-gray-800 font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_4px_0_rgb(229,231,235)] relative"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 absolute left-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              구글로 가입하기
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-[13px] font-black text-gray-400">또는 이메일로 가입</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-[13px] font-black text-gray-700 mb-2 ml-1">이메일</label>
              <input 
                type="email" 
                placeholder="이메일을 입력하세요"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-4 text-[15px] font-bold focus:outline-none focus:border-yellow-400 focus:bg-yellow-50 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-black text-gray-700 mb-2 ml-1">비밀번호</label>
              <input 
                type="password" 
                placeholder="8자 이상 영문, 숫자 조합"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-4 text-[15px] font-bold focus:outline-none focus:border-yellow-400 focus:bg-yellow-50 transition-all"
              />
            </div>

            <div>
              <label className="block text-[13px] font-black text-gray-700 mb-2 ml-1">닉네임</label>
              <input 
                type="text" 
                placeholder="놀이터에서 쓸 이름표 (예: 익명1)"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-4 text-[15px] font-bold focus:outline-none focus:border-yellow-400 focus:bg-yellow-50 transition-all"
              />
            </div>

            <div className="pt-8">
              <button 
                type="button"
                onClick={() => navigate('/login')}
                className="w-full py-4 bg-gray-900 text-white font-black rounded-[2rem] active:scale-95 transition-all text-lg shadow-[0_6px_0_rgb(31,41,55)] hover:translate-y-1 hover:shadow-[0_2px_0_rgb(31,41,55)]"
              >
                가입 완료하기
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
