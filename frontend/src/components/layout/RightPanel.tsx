import { PlusCircle, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const mockPieData = [
    { name: '주식', value: 40, color: '#10b981' }, // success color
    { name: '코인', value: 35, color: '#334155' }, // slate-700
    { name: '연금', value: 25, color: '#94a3b8' }, // slate-400
];

export default function RightPanel() {
    return (
        <aside className="w-[30%] min-w-[320px] bg-white border-l border-border h-screen p-5 flex flex-col gap-6 overflow-y-auto">
            {/* Action Button: AI Asset Registration */}
            <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-3 rounded-md flex items-center justify-center gap-2 font-medium shadow-sm">
                <PlusCircle size={18} />
                새 자산 스크린샷 1초 등록
            </button>

            {/* Mini Donut Chart */}
            <div className="border border-border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center min-h-[240px]">
                <h4 className="text-sm font-semibold w-full text-left mb-2 text-foreground">자산별 비중 (총괄)</h4>

                <div className="w-full h-[140px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={mockPieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={65}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                            >
                                {mockPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => [`${value}%`, '비중']}
                                contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap gap-3 text-xs justify-center mt-2">
                    {mockPieData.map((item) => (
                        <span key={item.name} className="flex items-center gap-1.5 font-medium text-muted-foreground">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                            {item.name}({item.value}%)
                        </span>
                    ))}
                </div>
            </div>

            {/* Stream List / Recent Transactions */}
            <div className="border border-border rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b border-border flex justify-between items-center">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">최근 거래/변동 히스토리</h4>
                    <Info size={14} className="text-muted-foreground" />
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto p-2 gap-1 text-sm">
                    {/* Mock Items */}
                    <TransactionItem type="BUY" title="삼성전자 매수" date="오늘 10:24 AM" amount="- ₩ 725,000" />
                    <TransactionItem type="SELL" title="Bitcoin(BTC) 매도" date="어제 09:15 PM" amount="+ ₩ 1,200,000" positive />
                    <TransactionItem type="DIVIDEND" title="AAPL 배당금 입금" date="2026.02.20" amount="+ $ 32.50" positive />
                    <TransactionItem type="BUY" title="테슬라(TSLA) 적립매수" date="2026.02.18" amount="- $ 200.00" />
                    <TransactionItem type="BUY" title="IRP 퇴직연금 납입" date="2026.02.15" amount="- ₩ 250,000" />
                </div>
            </div>
        </aside>
    );
}

function TransactionItem({ type, title, date, amount, positive = false }: { type: string, title: string, date: string, amount: string, positive?: boolean }) {
    const badgeColors: Record<string, string> = {
        BUY: 'bg-blue-100 text-blue-700',
        SELL: 'bg-red-100 text-red-700',
        DIVIDEND: 'bg-green-100 text-green-700',
    };

    return (
        <div className="flex justify-between items-center p-2 rounded hover:bg-muted transition-colors cursor-pointer">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeColors[type] || 'bg-gray-100 text-gray-700'}`}>{type}</span>
                    <span className="font-medium text-foreground text-xs">{title}</span>
                </div>
                <span className="text-xxs text-muted-foreground">{date}</span>
            </div>
            <div className={`font-semibold text-xs ${positive ? 'text-success' : 'text-foreground'}`}>
                {amount}
            </div>
        </div>
    );
}
