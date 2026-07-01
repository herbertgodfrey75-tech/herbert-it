from fastapi import APIRouter, HTTPException
from config.database import db
from schemas.users import UserCreate
from passlib.context import CryptContext


user_router = APIRouter()


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)



# REGISTER USER
@user_router.post("/register")
async def register_user(user: UserCreate):

    existing_user = await db.users.find_one(
        {
            "email": user.email
        }
    )


    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )


    # bcrypt only accepts max 72 characters
    hashed_password = pwd_context.hash(
        user.password[:72]
    )


    new_user = {

        "full_name": user.full_name,

        "email": user.email,

        "password_hash": hashed_password,

        "role": "user",

        "is_active": True

    }


    result = await db.users.insert_one(
        new_user
    )


    return {

        "message": "User created successfully",

        "id": str(result.inserted_id)

    }








# LOGIN USER
@user_router.post("/login")
async def login_user(
    email: str,
    password: str
):


    user = await db.users.find_one(
        {
            "email": email
        }
    )


    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )



    password_correct = pwd_context.verify(
        password[:72],
        user["password_hash"]
    )



    if not password_correct:

        raise HTTPException(
            status_code=401,
            detail="Wrong password"
        )



    return {

        "message": "Login successful",

        "user_id": str(user["_id"]),

        "role": user["role"]

    }