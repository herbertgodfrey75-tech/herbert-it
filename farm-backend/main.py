import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.database import db
from routers.students import student_router
from routers.users import user_router



async def test():

    result = await db.list_collection_names()

    print(
        "Mongo DB Connected! Collections:",
        result
    )



if __name__ == "__main__":

    asyncio.run(test())



app = FastAPI(
    title="A Student FARM APP",
    description="This is a Student FARM app"
)





# CORS SETTINGS

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