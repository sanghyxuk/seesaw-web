import { useNavigate } from "react-router";
import { useAppContext } from "../store/AppContext";

export function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <div className="flex justify-center bg-[#f4f1ea] min-h-screen font-sans">
      <div className="w-full max-w-[480px] bg-white flex flex-col min-h-[100dvh] relative shadow-2xl overflow-hidden px-6 pt-24 pb-8">
        
        {/* Playful Background Elements */}
        <div className="absolute top-10 -left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-20 -right-10 w-32 h-32 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          <div className="w-24 h-24 bg-sky-400 rounded-[2rem] flex items-center justify-center mb-8 shadow-[0_8px_0_rgb(14,165,233)] rotate-3">
            {/* Simple Seesaw Logo Icon - Playground Theme */}
            <div className="w-16 h-3 bg-gradient-to-r from-amber-300 to-amber-400 rounded-full relative transform -rotate-12 border-[2px] border-amber-600 shadow-inner">
              <div className="w-6 h-6 bg-sky-400 rounded-xl absolute -top-5 left-0 border-[3px] border-white shadow-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full opacity-60" />
              </div>
              <div className="w-6 h-6 bg-rose-400 rounded-xl absolute -top-1 right-0 border-[3px] border-white shadow-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full opacity-60" />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-orange-400" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">시소</h1>
          <p className="text-gray-500 text-[15px] mb-12 text-center font-medium leading-relaxed bg-white/50 px-4 py-2 rounded-2xl backdrop-blur-sm">
            매일 아침 8시, 3초 만에 타는 취향 놀이터
          </p>

          <div className="w-full space-y-4">
            <button 
              onClick={handleLogin}
              className="w-full py-4 bg-[#FEE500] text-black font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_4px_0_rgb(224,200,0)] relative"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 absolute left-6" fill="currentColor">
                <path d="M12 3c-5.52 0-10 3.48-10 7.78 0 2.76 1.76 5.16 4.41 6.54-.42 1.54-1.5 5.56-1.54 5.76-.04.22.14.3.3.26.22-.04 6.13-4.14 7.15-4.83.39.04.78.07 1.18.07 5.52 0 10-3.48 10-7.78S17.52 3 12 3z"/>
              </svg>
              카카오로 시작하기
            </button>
            <button 
              onClick={handleLogin}
              className="w-full py-4 bg-white border-2 border-gray-200 text-gray-800 font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_4px_0_rgb(229,231,235)] relative"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 absolute left-6">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              구글로 시작하기
            </button>
            <button 
              onClick={handleLogin}
              className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_4px_0_rgb(55,65,81)] relative"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 absolute left-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              이메일로 시작하기
            </button>
          </div>
          
          <div className="mt-10 flex items-center gap-6 text-[13px] text-gray-400 font-bold">
            <button onClick={() => navigate('/signup')} className="hover:text-orange-500 transition-colors">이메일 회원가입</button>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <button onClick={() => navigate('/find-password')} className="hover:text-orange-500 transition-colors">비밀번호 찾기</button>
          </div>
        </div>

      </div>
    </div>
  );
}
