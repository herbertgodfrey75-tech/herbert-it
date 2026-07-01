from pydantic import BaseModel, EmailStr
from datetime import datetime



# What frontend sends when registering
class UserCreate(BaseModel):

    full_name: str

    email: EmailStr

    password: str

    phone: str | None = None





# What backend returns
class UserResponse(BaseModel):

    id: str

    full_name: str

    email: EmailStr

    phone: str | None = None

    role: str

    is_active: bool

    created_at: datetime

    updated_at: datetime

    last_login_at: datetime | None = None