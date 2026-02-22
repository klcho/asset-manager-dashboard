from supabase import create_client, Client
from app.core.config import get_settings

settings = get_settings()

def get_supabase_client() -> Client:
    """Supabase 싱글톤 클라이언트 인스턴스를 반환합니다."""
    # 환경변수 누락 시의 예기치 못한 에러 방지
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        raise ValueError("Supabase 인증 키 또는 URL이 .env 파일에 설정되지 않았습니다.")
        
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
