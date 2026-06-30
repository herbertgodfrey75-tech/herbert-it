from models.student import Student
from config.database import db
from schemas.student import StudentResponse
from fastapi import APIRouter, HTTPException
from bson import ObjectId

student_router = APIRouter()

@student_router.get("/student", response_model=list[StudentResponse])
async def get_list_of_students():
        students = [] 

        async for student in db.students.find():
            student["id"] = str(student["_id"])
            students.append(student)
        return students



@student_router.get("/student/{student_id}", response_model=StudentResponse)
async def get_one_student(student_id:str):
    student = await db.students.find_one({"_id" :ObjectId(student_id) })

    if student is None:
         raise HTTPException(status_code=404, detail="Student not found")
    return {
         "id":str(student["_id"]),
         **student
    }




@student_router.post("/student", response_model=StudentResponse)
async def create_new_student(student:Student):
     student_dict =  student.model_dump()
     created_student = await db.students.insert_one(student_dict)

     new_student = await db.students.find_one({"_id": created_student.inserted_id})  
     new_student["id"] = str(new_student["_id"]) 
     return new_student 