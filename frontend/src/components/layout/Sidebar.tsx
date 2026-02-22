import { LayoutDashboard, PieChart, Wallet, Settings, TrendingUp } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r border-border h-screen flex flex-col shadow-sm z-10">
            {/* Logo Area */}
            <div className="p-6 border-b border-border/50 flex items-center gap-3">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg shadow-sm">
                    <TrendingUp size={20} />
                </div>
                <span className="font-extrabold text-lg tracking-tight">AssetMap Pro</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1.5">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-3 mb-2">메뉴</div>
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-primary/10 text-primary rounded-md font-semibold transition-colors">
                    <LayoutDashboard size={18} />
                    <span>대시보드 홈</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md font-medium transition-all">
                    <PieChart size={18} />
                    <span>포트폴리오 분석</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md font-medium transition-all">
                    <Wallet size={18} />
                    <span>자산 등록</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md font-medium transition-all">
                    <Settings size={18} />
                    <span>환경설정</span>
                </a>

                {/* Category Filter */}
                <div className="mt-8">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-3 mb-3">자산 필터</div>
                    <div className="flex flex-col gap-0.5">
                        <FilterItem title="전체 자산" count={24} active />

                        <div className="pl-4 mt-1 flex flex-col gap-0.5 border-l-2 border-slate-100 ml-3">
                            <FilterItem title="주식 (국내/해외)" count={12} />
                            <FilterItem title="가상자산" count={3} />
                            <FilterItem title="현금성 자산" count={2} />
                            <FilterItem title="연금/펀드" count={5} />
                            <FilterItem title="부동산/기타" count={2} />
                        </div>
                    </div>
                </div>
            </nav>

            {/* User Info Bottom */}
            <div className="p-5 border-t border-border/50 flex items-center gap-3 hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 shadow-inner">
                    K
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">Klcho</span>
                    <span className="text-xs text-slate-500 font-medium">Free Plan</span>
                </div>
            </div>
        </aside>
    );
}

function FilterItem({ title, count, active = false }: { title: string, count: number, active?: boolean }) {
    return (
        <button className={`flex justify-between items-center px-3 py-2 rounded-md w-full text-left transition-all ${active ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}>
            <span className="text-sm truncate">{title}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm ${active ? 'bg-white text-slate-800' : 'bg-slate-100 text-slate-500'}`}>{count}</span>
        </button>
    );
}
