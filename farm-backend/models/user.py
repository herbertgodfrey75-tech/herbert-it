from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class User(BaseModel):

    full_name: str

    email: EmailStr

    password: str

    phone: str | None = None

    role: str = "user"

    is_active: bool = True

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    updated_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    last_login_at: datetime | None = None