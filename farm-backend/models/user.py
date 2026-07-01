from pydantic import BaseModel, EmailStr, Field
from datetime import datetime



class User(BaseModel):

    full_name: str

    email: EmailStr

    password: str


    # basic info
    phone: str | None = None

    address: str | None = None

    city: str | None = None

    state: str | None = None

    country: str | None = None


    # profile
    date_of_birth: str | None = None

    profile_image_url: str | None = None

    nin: str | None = None

    specialization: str | None = None



    # permissions
    role: str = "user"

    role_id: str | None = None

    admin_group_id: str | None = None

    service_id: str | None = None

    permission_id: str | None = None



    # status
    marketing_consent: bool = False

    is_active: bool = True

    is_available: bool = True


    verification_status: str = "unverified"

    verification_token: str | None = None

    email_verified_at: datetime | None = None



    # timestamps
    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )


    updated_at: datetime = Field(
        default_factory=datetime.utcnow
    )


    last_login_at: datetime | None = None