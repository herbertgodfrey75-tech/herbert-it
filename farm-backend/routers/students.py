from models.student import Student
from config.database import db
from schemas.student import StudentResponse
from fastapi import APIRouter, HTTPException
from bson import ObjectId
from bson.errors import InvalidId


student_router = APIRouter()



# GET ALL STUDENTS
@student_router.get("/student", response_model=list[StudentResponse])
async def get_list_of_students():

    students = []


    async for student in db.students.find():

        student["id"] = str(student["_id"])
        student.pop("_id", None)

        students.append(student)


    return students






# GET ONE STUDENT
@student_router.get("/student/{student_id}", response_model=StudentResponse)
async def get_one_student(student_id: str):

    try:

        student = await db.students.find_one(
            {
                "_id": ObjectId(student_id)
            }
        )


    except InvalidId:

        raise HTTPException(
            status_code=400,
            detail="Invalid student id"
        )



    if not student:

        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )



    student["id"] = str(student["_id"])
    student.pop("_id", None)


    return student







# CREATE STUDENT
@student_router.post("/student", response_model=StudentResponse)
async def create_new_student(student: Student):

    try:

        student_data = student.model_dump()


        result = await db.students.insert_one(
            student_data
        )


        created_student = await db.students.find_one(
            {
                "_id": result.inserted_id
            }
        )


        created_student["id"] = str(
            created_student["_id"]
        )

        created_student.pop("_id", None)


        return created_student



    except Exception as e:

        print("CREATE STUDENT ERROR:", e)


        raise HTTPException(
            status_code=500,
            detail=str(e)
        )









# UPDATE STUDENT
@student_router.put("/student/{student_id}", response_model=StudentResponse)
async def update_student(student_id: str, student: Student):


    try:

        object_id = ObjectId(student_id)


    except InvalidId:

        raise HTTPException(
            status_code=400,
            detail="Invalid student id"
        )



    updated = await db.students.update_one(

        {
            "_id": object_id
        },

        {
            "$set": student.model_dump()
        }

    )



    if updated.matched_count == 0:

        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )



    result = await db.students.find_one(
        {
            "_id": object_id
        }
    )



    result["id"] = str(result["_id"])
    result.pop("_id", None)


    return result







# DELETE STUDENT
@student_router.delete("/student/{student_id}")
async def delete_student(student_id: str):


    try:

        object_id = ObjectId(student_id)


    except InvalidId:

        raise HTTPException(
            status_code=400,
            detail="Invalid student id"
        )



    deleted = await db.students.delete_one(
        {
            "_id": object_id
        }
    )



    if deleted.deleted_count == 0:

        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )



    return {
        "message": "Student deleted successfully"
    }