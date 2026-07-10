from pydantic import BaseModel, EmailStr
from datetime import datetime




# Data frontend sends when registering
class UserCreate(BaseModel):

    full_name: str

    email: EmailStr

    password: str

    role: str = "user"


    phone: str | None = None


    address: str | None = None

    city: str | None = None

    state: str | None = None

    country: str | None = None


    date_of_birth: str | None = None

    profile_image_url: str | None = None

    nin: str | None = None

    specialization: str | None = None


    marketing_consent: bool = False





# Data backend returns
class UserResponse(BaseModel):

    id: str


    full_name: str

    email: EmailStr


    phone: str | None = None


    address: str | None = None

    city: str | None = None

    state: str | None = None

    country: str | None = None


    date_of_birth: str | None = None

    profile_image_url: str | None = None

    nin: str | None = None

    specialization: str | None = None



    role: str = "user"

    role_id: str | None = None

    admin_group_id: str | None = None

    service_id: str | None = None

    permission_id: str | None = None



    marketing_consent: bool

    is_active: bool

    is_available: bool


    verification_status: str

    verification_token: str | None = None

    email_verified_at: datetime | None = None



    created_at: datetime

    updated_at: datetime

    last_login_at: datetime | None = None