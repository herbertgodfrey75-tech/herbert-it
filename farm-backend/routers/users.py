from fastapi import APIRouter, HTTPException
from config.database import db
from schemas.users import UserCreate
from passlib.context import CryptContext
from datetime import datetime
from bson import ObjectId

user_router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# ==========================
# REGISTER USER
# ==========================
@user_router.post("/register")
async def register_user(user: UserCreate):

    existing_user = await db.users.find_one(
        {"email": user.email}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    hashed_password = pwd_context.hash(
        user.password[:72]
    )

    new_user = {

        "full_name": user.full_name,
        "email": user.email,
        "password_hash": hashed_password,

        # assignment fields
        "phone": user.phone,
        "address": user.address,
        "city": user.city,
        "state": user.state,
        "country": user.country,
        "date_of_birth": user.date_of_birth,
        "profile_image_url": user.profile_image_url,
        "nin": user.nin,
        "specialization": user.specialization,

        # permissions
        "role": "user",
        "role_id": None,
        "admin_group_id": None,
        "service_id": None,
        "permission_id": None,

        # status
        "marketing_consent": user.marketing_consent,
        "is_active": True,
        "is_available": True,

        "verification_status": "unverified",
        "verification_token": None,
        "email_verified_at": None,

        # timestamps
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "last_login_at": None

    }

    result = await db.users.insert_one(new_user)

    return {
        "message": "User created successfully",
        "id": str(result.inserted_id)
    }


# ==========================
# LOGIN USER
# ==========================
@user_router.post("/login")
async def login_user(
    email: str,
    password: str
):

    user = await db.users.find_one(
        {"email": email}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if "password_hash" not in user:
        raise HTTPException(
            status_code=500,
            detail="Password missing. Register again."
        )

    if not pwd_context.verify(
        password[:72],
        user["password_hash"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Wrong password"
        )

    await db.users.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "last_login_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        }
    )

    return {
        "message": "Login successful",
        "user_id": str(user["_id"]),
        "role": user.get("role", "user")
    }


# ==========================
# GET USER PROFILE
# ==========================
@user_router.get("/users/{user_id}")
async def get_user(user_id: str):

    user = await db.users.find_one(
        {
            "_id": ObjectId(user_id)
        }
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user["id"] = str(user["_id"])
    del user["_id"]
    user.pop("password_hash", None)

    return user


# ==========================
# UPDATE USER PROFILE
# ==========================
@user_router.put("/users/{user_id}")
async def update_user(
    user_id: str,
    user: UserCreate
):

    update_data = {

        "full_name": user.full_name,
        "email": user.email,
        "phone": user.phone,
        "address": user.address,
        "city": user.city,
        "state": user.state,
        "country": user.country,
        "date_of_birth": user.date_of_birth,
        "profile_image_url": user.profile_image_url,
        "nin": user.nin,
        "specialization": user.specialization,
        "marketing_consent": user.marketing_consent,

        "updated_at": datetime.utcnow()

    }

    # Update password only if one was provided
    if user.password:
        update_data["password_hash"] = pwd_context.hash(
            user.password[:72]
        )

    result = await db.users.update_one(
        {
            "_id": ObjectId(user_id)
        },
        {
            "$set": update_data
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "message": "Profile updated successfully"
    }