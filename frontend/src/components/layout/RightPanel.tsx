import { useState, useRef } from 'react';
import { PlusCircle, Info, ChevronRight, Loader2, X, Check } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const mockPieData = [
    { name: '주식', value: 40, color: '#10b981' }, // success color
    { name: '코인', value: 35, color: '#334155' }, // slate-700
    { name: '연금', value: 25, color: '#94a3b8' }, // slate-400
];

export default function RightPanel() {
    const [isParsing, setIsParsing] = useState(false);
    const [parsedData, setParsedData] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsParsing(true);
        try {
            const formData = new FormData();
            // FastAPI의 UploadFile에 매핑되는 field 이름인 'file'로 전송
            formData.append('file', file);

            const res = await fetch('http://localhost:8000/api/v1/ai/parse-asset', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('서버 업로드 및 파싱에 실패했습니다.');
            const result = await res.json();

            console.log("AI Parsed Result:", result);
            setParsedData(result.data);

        } catch (error) {
            console.error(error);
            alert('자산 이미지 파싱 중 오류가 발생했습니다.');
        } finally {
            setIsParsing(false);
            if (fileInputRef.current) fileInputRef.current.value = ''; // 상태 초기화
        }
    };

    return (
        <aside className="w-[30%] min-w-[320px] bg-white border-l border-border h-screen p-5 flex flex-col gap-6 overflow-y-auto">
            {/* Action Button: AI Asset Registration */}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
            />
            <Button
                className="w-full py-6 text-sm flex items-center justify-center gap-2 shadow font-bold tracking-wide transition-all"
                onClick={() => fileInputRef.current?.click()}
                disabled={isParsing}
            >
                {isParsing ? <Loader2 className="animate-spin" size={18} /> : <PlusCircle size={18} />}
                {isParsing ? 'AI가 자산 이미지를 분석 중입니다...' : '새 자산 스크린샷 1초 등록'}
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

            {/* AI 파싱 검토 모달 */}
            {parsedData && (
                <AssetPreviewModal
                    data={parsedData}
                    onClose={() => setParsedData(null)}
                    onConfirm={() => {
                        alert('자산이 성공적으로 DB에 등록되었습니다!');
                        setParsedData(null);
                        // TODO: 여기서 백엔드 자산 생성(POST) 라우터를 호출하여 실제 DB 반영
                    }}
                />
            )}
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

function AssetPreviewModal({ data, onClose, onConfirm }: { data: any, onClose: () => void, onConfirm: () => void }) {
    if (!data) return null;
    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
            <Card className="w-full max-w-sm bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <CardHeader className="border-b border-border/50 pb-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-bold text-slate-800">AI 분석 결과 검토</CardTitle>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-500"><X size={18} /></button>
                </CardHeader>
                <CardContent className="pt-6 flex flex-col gap-5">
                    <div className="grid border border-border rounded-lg overflow-hidden text-sm shadow-sm">
                        <div className="flex border-b border-border bg-white">
                            <div className="bg-slate-50 font-semibold text-slate-600 w-2/5 p-3 border-r border-border flex items-center">종목명</div>
                            <div className="p-3 w-3/5 font-bold text-slate-800">{data.asset_name} <span className="text-muted-foreground text-xs font-medium ml-1">({data.ticker})</span></div>
                        </div>
                        <div className="flex border-b border-border bg-white">
                            <div className="bg-slate-50 font-semibold text-slate-600 w-2/5 p-3 border-r border-border flex items-center">자산 분류</div>
                            <div className="p-3 w-3/5 font-semibold text-primary">{data.asset_type}</div>
                        </div>
                        <div className="flex border-b border-border bg-white">
                            <div className="bg-slate-50 font-semibold text-slate-600 w-2/5 p-3 border-r border-border flex items-center">보유 수량</div>
                            <div className="p-3 w-3/5 font-bold text-slate-800">{data.quantity}</div>
                        </div>
                        <div className="flex bg-white">
                            <div className="bg-slate-50 font-semibold text-slate-600 w-2/5 p-3 border-r border-border flex items-center">매수 단가</div>
                            <div className="p-3 w-3/5 font-bold text-slate-800">{data.average_price} <span className="text-xs text-muted-foreground ml-1 font-medium">{data.currency}</span></div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {/* outline variant 지원이 없으면 className으로 직접 적용 */}
                        <Button className="flex-1 bg-white text-slate-700 border border-slate-300 hover:bg-slate-50" onClick={onClose}>
                            다시 촬영
                        </Button>
                        <Button className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90" onClick={onConfirm}>
                            <Check size={16} strokeWidth={3} /> 내 자산 반영
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
