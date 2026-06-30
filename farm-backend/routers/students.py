from models.student import Student
from config.database import db
from schemas.student import StudentResponse
from fastapi import APIRouter, HTTPException
from bson import ObjectId
from bson.errors import InvalidId

student_router = APIRouter()


@student_router.get("/student", response_model=list[StudentResponse])
async def get_list_of_students():
    students = []

    async for student in db.students.find():
        student["id"] = str(student["_id"])
        del student["_id"]
        students.append(student)

    return students


@student_router.get("/student/{student_id}", response_model=StudentResponse)
async def get_one_student(student_id: str):

    try:
        student = await db.students.find_one(
            {"_id": ObjectId(student_id)}
        )
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid student id"
        )

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    student["id"] = str(student["_id"])
    del student["_id"]

    return student



@student_router.post("/student", response_model=StudentResponse)
async def create_new_student(student: Student):

    student_dict = student.model_dump()

    result = await db.students.insert_one(student_dict)

    new_student = await db.students.find_one(
        {"_id": result.inserted_id}
    )

    new_student["id"] = str(new_student["_id"])
    del new_student["_id"]

    return new_student



# UPDATE STUDENT
@student_router.put("/student/{student_id}", response_model=StudentResponse)
async def update_student(student_id: str, student: Student):

    try:
        student_object_id = ObjectId(student_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid student id"
        )


    updated = await db.students.update_one(
        {"_id": student_object_id},
        {"$set": student.model_dump()}
    )


    if updated.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )


    updated_student = await db.students.find_one(
        {"_id": student_object_id}
    )

    updated_student["id"] = str(updated_student["_id"])
    del updated_student["_id"]

    return updated_student



# DELETE STUDENT
@student_router.delete("/student/{student_id}")
async def delete_student(student_id: str):

    try:
        student_object_id = ObjectId(student_id)

    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid student id"
        )


    deleted = await db.students.delete_one(
        {"_id": student_object_id}
    )


    if deleted.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )


    return {
        "message": "Student deleted successfully"
    }