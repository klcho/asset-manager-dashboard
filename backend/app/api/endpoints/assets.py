from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.asset import AssetCreate, AssetResponse
from app.services.asset_service import asset_service

router = APIRouter()

# TODO: 추후 실제 인증(Auth)이 붙으면 Depend(get_current_user) 형태로 user_id 추출
# 현재는 테스트 단계이므로 고정된 user_id를 임시로 사용하거나 파라미터로 받음.
TEMP_USER_ID = "test-user-uuid"

@router.get("/", response_model=List[AssetResponse])
def get_assets():
    """현재 사용자의 자산 목록을 조회합니다."""
    try:
        return asset_service.get_all_assets(user_id=TEMP_USER_ID)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=AssetResponse)
def create_asset(asset: AssetCreate):
    """새로운 자산을 등록합니다."""
    try:
        # 인증 전에는 클라이언트가 요청한 user_id나 임시 uuid 사용
        asset.user_id = TEMP_USER_ID 
        return asset_service.create_asset(asset=asset)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{asset_id}")
def delete_asset(asset_id: str):
    """지정된 ID의 자산을 삭제합니다."""
    try:
        success = asset_service.delete_asset(asset_id=asset_id, user_id=TEMP_USER_ID)
        if not success:
             raise HTTPException(status_code=404, detail="자산을 찾을 수 없거나 삭제 권한이 없습니다.")
        return {"status": "success", "message": "성공적으로 삭제되었습니다."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
