import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data for Area Chart
const mockChartData = [
    { date: '01.15', value: 241000000 },
    { date: '01.20', value: 242500000 },
    { date: '01.25', value: 244000000 },
    { date: '01.30', value: 243200000 },
    { date: '02.05', value: 245000000 },
    { date: '02.10', value: 244800000 },
    { date: '02.15', value: 246500000 },
    { date: '02.22', value: 245600000 },
];

export default function MainPanel() {
    const [activePeriod, setActivePeriod] = useState('1개월');
    const periods = ['어제', '1주', '1개월', '3개월', '1년', '전체'];

    return (
        <main className="flex-1 flex flex-col h-screen overflow-y-auto p-6 bg-slate-50 gap-6">
            {/* Header / Top Summary */}
            <header className="flex justify-between items-center bg-white p-5 rounded-lg border border-border shadow-sm">
                <div>
                    <h2 className="text-sm font-medium text-muted-foreground mb-1">총 자산 평가액</h2>
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-4xl font-bold tracking-tight">₩ 245,600,000</h1>
                        <span className="text-success text-sm font-semibold bg-success/10 px-2 py-0.5 rounded flex items-center gap-1 transition-all">
                            + ₩ 1,250,000 (0.5%)
                        </span>
                    </div>
                </div>

                {/* Period Toggle Group */}
                <div className="flex bg-muted p-1 rounded-md text-xs font-medium">
                    {periods.map((period) => (
                        <button
                            key={period}
                            onClick={() => setActivePeriod(period)}
                            className={`px-3 py-1.5 rounded transition-all ${activePeriod === period ? 'bg-white shadow-sm text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </header>

            {/* Dense Content Area: Chart + Asset Table */}
            <div className="grid grid-cols-1 gap-6 flex-1">
                {/* Main Chart */}
                <div className="bg-white rounded-lg border border-border flex flex-col p-5 shadow-sm min-h-[300px]">
                    <h3 className="text-sm font-semibold mb-4 text-foreground">포트폴리오 성장 추이 ({activePeriod})</h3>
                    <div className="flex-1 w-full h-full min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockChartData} margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0f172a" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fill: '#64748b' }}
                                    dy={10}
                                />
                                <YAxis
                                    domain={['dataMin - 1000000', 'dataMax + 1000000']}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(val) => `₩${(val / 1000000).toFixed(0)}M`}
                                    tick={{ fontSize: 11, fill: '#64748b' }}
                                    dx={-10}
                                />
                                <Tooltip
                                    formatter={(value: any) => [`₩ ${Number(value).toLocaleString()}`, '평가액']}
                                    labelStyle={{ color: '#0f172a', fontWeight: 'bold', marginBottom: '4px' }}
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#0f172a"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Detailed Dense Table */}
                <div className="bg-white rounded-lg border border-border flex flex-col p-5 shadow-sm flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-foreground">보유 종목 상세 명세</h3>
                        <input type="text" placeholder="종목 검색..." className="text-xs border border-border rounded px-3 py-1.5 w-48 focus:outline-none focus:ring-1 focus:ring-primary/30" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-border text-muted-foreground">
                                    <th className="py-2 px-3 font-medium">티커/종목명</th>
                                    <th className="py-2 px-3 font-medium text-right">수량</th>
                                    <th className="py-2 px-3 font-medium text-right">평균단가</th>
                                    <th className="py-2 px-3 font-medium text-right">현재가</th>
                                    <th className="py-2 px-3 font-medium text-right">평가금액</th>
                                    <th className="py-2 px-3 font-medium text-right">수익률</th>
                                </tr>
                            </thead>
                            <tbody className="text-foreground">
                                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                                    <td className="py-2 px-3"><div className="font-medium">삼성전자</div><div className="text-xxs text-muted-foreground text-opacity-80">005930.KS</div></td>
                                    <td className="py-2 px-3 text-right">1,200</td>
                                    <td className="py-2 px-3 text-right">₩ 72,500</td>
                                    <td className="py-2 px-3 text-right">₩ 74,300</td>
                                    <td className="py-2 px-3 text-right font-medium">₩ 89,160,000</td>
                                    <td className="py-2 px-3 text-right text-success font-semibold">+ 2.48%</td>
                                </tr>
                                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                                    <td className="py-2 px-3"><div className="font-medium">Apple Inc.</div><div className="text-xxs text-muted-foreground text-opacity-80">AAPL</div></td>
                                    <td className="py-2 px-3 text-right">150</td>
                                    <td className="py-2 px-3 text-right">$ 165.20</td>
                                    <td className="py-2 px-3 text-right">$ 180.55</td>
                                    <td className="py-2 px-3 text-right font-medium">₩ 36,561,375</td>
                                    <td className="py-2 px-3 text-right text-success font-semibold">+ 9.29%</td>
                                </tr>
                                <tr className="hover:bg-muted/50 transition-colors">
                                    <td className="py-2 px-3"><div className="font-medium">Bitcoin</div><div className="text-xxs text-muted-foreground text-opacity-80">BTC</div></td>
                                    <td className="py-2 px-3 text-right">0.5</td>
                                    <td className="py-2 px-3 text-right">₩ 95,000,000</td>
                                    <td className="py-2 px-3 text-right">₩ 92,100,000</td>
                                    <td className="py-2 px-3 text-right font-medium">₩ 46,050,000</td>
                                    <td className="py-2 px-3 text-right text-destructive font-semibold">- 3.05%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
