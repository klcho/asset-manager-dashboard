import { LayoutDashboard, PieChart, Wallet, Settings, TrendingUp } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="w-[18%] min-w-[220px] bg-white border-r border-border h-screen p-4 flex flex-col gap-6">
            {/* Logo Area */}
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
                <TrendingUp className="w-6 h-6 text-success" />
                <span>AssetMap Pro</span>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 flex-1">
                <NavItem icon={<LayoutDashboard size={18} />} label="대시보드 홈" active />
                <NavItem icon={<PieChart size={18} />} label="포트폴리오 분석" />
                <NavItem icon={<Wallet size={18} />} label="자산 등록 및 내역" />
                <NavItem icon={<Settings size={18} />} label="환경설정" />
            </nav>

            {/* Category Filter (High Density Tree Mock) */}
            <div className="mt-auto border-t border-border pt-4">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">자산군 필터 (필터링)</h4>
                <div className="flex flex-col gap-2 text-sm text-foreground">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" defaultChecked /> 주식 (국내/해외)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer pl-5 text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" defaultChecked /> 한국 주식
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer pl-5 text-muted-foreground">
                        <input type="checkbox" className="rounded border-border" defaultChecked /> 미국 주식
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer mt-1">
                        <input type="checkbox" className="rounded border-border" defaultChecked /> 가상화폐 (Crypto)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer mt-1">
                        <input type="checkbox" className="rounded border-border" defaultChecked /> 퇴직연금 (IRP/ISA)
                    </label>
                </div>
            </div>
        </aside>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <div className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors text-sm font-medium
      ${active ? 'bg-primary/5 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
        >
            {icon}
            {label}
        </div>
    );
}
