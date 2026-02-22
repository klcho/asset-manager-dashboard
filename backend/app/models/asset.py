from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# 데이터베이스 응답 모델 (Supabase 레코드 기준)
class AssetBase(BaseModel):
    user_id: str = Field(..., description="소유자 사용자 ID")
    ticker: str = Field(..., max_length=20, description="종목 코드 또는 티커")
    asset_name: str = Field(..., description="자산 명칭 (예: 삼성전자, 비트코인)")
    asset_type: str = Field(..., description="자산 유형 (STOCK, CRYPTO, CASH, PENSION 등)")
    quantity: float = Field(default=0.0, description="보유 수량")
    average_price: float = Field(default=0.0, description="매수 평균 단가")
    currency: str = Field(default="KRW", description="기준 통화 (KRW, USD 등)")

class AssetCreate(AssetBase):
    """자산 등록(생성) 시 사용하는 정보 구조체"""
    pass

class AssetResponse(AssetBase):
    """자산 조회 시 클라이언트(React) 응답용 구조체"""
    id: str
    created_at: datetime
    updated_at: datetime
    # 현재가와 포트폴리오 비중 등은 서비스(Service) 레이어의 별도 로직으로 추가 주입될 수 있음
    current_price: Optional[float] = None  

    class Config:
        from_attributes = True
