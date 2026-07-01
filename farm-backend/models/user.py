from pydantic import BaseModel, EmailStr
from datetime import datetime


class User(BaseModel):

    full_name: str
    email: EmailStr
    password_hash: str

    role: str = "user"

    is_active: bool = True

    created_at: datetime = datetime.utcnow()