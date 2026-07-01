import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.database import db
from routers.students import student_router
from routers.users import user_router





async def test_db():

    try:

        result = await db.list_collection_names()

        print(
            "MongoDB Connected ✅ Collections:",
            result
        )


    except Exception as e:

        print(
            "MongoDB Connection Error ❌",
            e
        )






app = FastAPI(

    title="Student FARM APP",

    description="Student Management System"

)





@app.on_event("startup")
async def startup_event():

    await test_db()







# CORS

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "https://herbert-it-1.onrender.com",

        "http://localhost:5173"

    ],


    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)







# ROUTES

app.include_router(
    student_router
)


app.include_router(
    user_router
)







@app.get("/")
async def home():

    return {

        "message": "Student FARM API is running 🚀"

    }