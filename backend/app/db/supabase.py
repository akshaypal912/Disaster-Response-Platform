from supabase import create_client, Client
from app.core.config import settings

def get_supabase_client() -> Client:
    """
    Returns an authenticated Supabase client for reading and writing crisis logs.
    """
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

def get_supabase_admin_client() -> Client:
    """
    Returns a service-role client for backend operations that bypass Row Level Security.
    """
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)
