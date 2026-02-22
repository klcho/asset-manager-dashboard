import { PlusCircle, Info, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const mockPieData = [
    { name: '주식', value: 40, color: '#10b981' }, // success color
    { name: '코인', value: 35, color: '#334155' }, // slate-700
    { name: '연금', value: 25, color: '#94a3b8' }, // slate-400
];

export default function RightPanel() {
    return (
        <aside className="w-[30%] min-w-[320px] bg-white border-l border-border h-screen p-5 flex flex-col gap-6 overflow-y-auto">
            {/* Action Button: AI Asset Registration */}
            <Button className="w-full py-6 text-sm flex items-center justify-center gap-2 shadow font-bold tracking-wide">
                <PlusCircle size={18} />
                새 자산 스크린샷 1초 등록
            </Button>

            {/* Mini Donut Chart */}
            <Card className="shadow-sm flex flex-col justify-center min-h-[260px]">
                <CardHeader className="pb-0">
                    <CardTitle className="text-sm">자산별 비중 (총괄)</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center flex-1 pt-4 pb-4">
                    <div className="w-full h-[150px]">
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

                    <div className="flex flex-wrap gap-4 text-xs justify-center mt-3">
                        {mockPieData.map((item) => (
                            <span key={item.name} className="flex items-center gap-1.5 font-semibold text-slate-600">
                                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                                {item.name}({item.value}%)
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Stream List / Recent Transactions */}
            <Card className="shadow-sm flex-1 flex flex-col overflow-hidden min-h-[250px]">
                <div className="bg-slate-50 border-b border-border/50 px-5 py-3 flex justify-between items-center">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">최근 거래/변동 히스토리</h4>
                    <Info size={14} className="text-slate-400" />
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto p-1 gap-0.5">
                    {/* Mock Items */}
                    <TransactionItem type="BUY" title="삼성전자 매수" date="오늘 10:24 AM" amount="- ₩ 725,000" />
                    <TransactionItem type="SELL" title="Bitcoin(BTC) 매도" date="어제 09:15 PM" amount="+ ₩ 1,200,000" positive />
                    <TransactionItem type="DIVIDEND" title="AAPL 배당금 입금" date="2026.02.20" amount="+ $ 32.50" positive />
                    <TransactionItem type="BUY" title="테슬라(TSLA) 적립매수" date="2026.02.18" amount="- $ 200.00" />
                    <TransactionItem type="BUY" title="IRP 퇴직연금 납입" date="2026.02.15" amount="- ₩ 250,000" />
                </div>
            </Card>
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
        <div className="flex justify-between items-center p-3 mx-2 my-1 rounded-md hover:bg-slate-50 hover:shadow-sm transition-all cursor-pointer group">
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm opacity-90 ${badgeColors[type] || 'bg-slate-100 text-slate-700'}`}>{type}</span>
                    <span className="font-semibold text-slate-800 text-[13px]">{title}</span>
                </div>
                <span className="text-[10px] font-medium text-slate-400">{date}</span>
            </div>
            <div className="flex items-center gap-2">
                <div className={`font-bold text-[13px] tracking-tight ${positive ? 'text-success' : 'text-slate-700'}`}>
                    {amount}
                </div>
                <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </div>
    );
}
