import asyncio
from config.database import db
import asyncio  # Imports asyncio so we can run asynchronous test code.
from routers.students import student_router
from config.database import db
from fastapi import FastAPI  # Imports FastAPI so we can create the web app.
from fastapi.middleware.cors import CORSMiddleware  # Imports CORS middleware to handle cross-origin requests.


async def test():  # Defines an async function to test the database connection.
    result = await db.list_collection_names()  # Gets the names of all collections in the database.
    print("Mongo DB Connected! Collections:", result)  # Prints a success message and the collection names.

    

if __name__ == "__main__":  # Runs this block only when this file is started directly.
    asyncio.run(test())  # Starts the async database test function.

app = FastAPI(  # Creates the FastAPI application.
    title="A student FARM APP",  # Sets the title shown in the API docs.
    description="This is a Student FARM app"  # Sets the description shown in the API docs.
)  # Finishes creating the FastAPI app.

app.add_middleware(
    CORSMiddleware,
    allow_origins=["  http://localhost:5173"],  # Allows all origins (for development purposes only)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(student_router)  