import { Calendar, ChevronRight, Inbox } from "lucide-react";

export function Archive() {
  const archives = [
    { date: "2026. 06. 10", title: "평생 에어컨 없이 살기\nvs\n평생 히터 없이 살기", win: "에어컨 없이 살기", percent: 62 },
    { date: "2026. 06. 09", title: "매일 야근하고 월 1000만원\nvs\n칼퇴하고 월 300만원", win: "칼퇴", percent: 78 },
    { date: "2026. 06. 08", title: "친구가 내 애인에게 깻잎 떼주기\nvs\n애인이 내 친구에게 깻잎 떼주기", win: "애인이 친구 깻잎", percent: 51 },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f4f1ea]">
      <div className="bg-white px-6 pt-10 pb-6 border-b-[3px] border-emerald-100 rounded-b-3xl shadow-sm relative z-10">
        <h1 className="text-2xl font-black text-gray-900 mb-2 flex items-center gap-2">
          지난 시소
        </h1>
        <p className="text-sm text-gray-500 font-medium">과거의 치열했던 놀이터 기록이에요.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {archives.map((item, idx) => (
          <div key={idx} className="p-5 border-2 border-emerald-100 rounded-3xl bg-white shadow-[0_4px_12px_rgba(16,185,129,0.05)] cursor-pointer hover:border-emerald-300 hover:shadow-[0_4px_16px_rgba(16,185,129,0.1)] transition-all group">
            <div className="flex items-center gap-2 mb-4 text-emerald-400 bg-emerald-50 w-max px-3 py-1 rounded-xl">
              <Calendar size={14} strokeWidth={2.5} />
              <span className="text-[11px] font-black">{item.date}</span>
            </div>
            <h3 className="text-[16px] font-black text-gray-800 whitespace-pre-wrap leading-snug mb-5">
              {item.title}
            </h3>
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-gray-400 font-black">우승 진영</span>
                <span className="text-sm font-black text-emerald-600 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200">
                  {item.win} ({item.percent}%)
                </span>
              </div>
              <button className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        ))}
        <div className="py-10 text-center text-[13px] font-bold text-gray-400 flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-1">
            <Inbox size={24} className="text-gray-300" />
          </div>
          더 이상 지난 시소가 없습니다.
        </div>
      </div>
    </div>
  );
}
