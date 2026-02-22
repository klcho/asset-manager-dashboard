from typing import List, Optional
from app.core.database import get_supabase_client
from app.models.asset import AssetCreate, AssetResponse

class AssetService:
    def __init__(self):
        self.client = get_supabase_client()
        self.table_name = "assets"

    def get_all_assets(self, user_id: str) -> List[AssetResponse]:
        """특정 사용자의 전체 자산 목록을 조회합니다."""
        response = self.client.table(self.table_name).select("*").eq("user_id", user_id).execute()
        return [AssetResponse(**item) for item in response.data]

    def create_asset(self, asset: AssetCreate) -> AssetResponse:
        """새로운 자산을 등록합니다."""
        response = self.client.table(self.table_name).insert(asset.model_dump()).execute()
        # Supabase 연산 결과 배열의 첫 번째 요소를 반환
        if response.data:
            return AssetResponse(**response.data[0])
        raise ValueError("자산 생성에 실패했습니다.")

    def delete_asset(self, asset_id: str, user_id: str) -> bool:
        """자산을 삭제합니다 (권한 확인을 위해 user_id 교차 검증)."""
        response = self.client.table(self.table_name).delete().eq("id", asset_id).eq("user_id", user_id).execute()
        return len(response.data) > 0

asset_service = AssetService()
