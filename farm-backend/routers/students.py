from models.student import Student
from config.database import db
from schemas.student import StudentResponse

from fastapi import APIRouter, HTTPException, Header, Depends

from bson import ObjectId
from bson.errors import InvalidId



student_router = APIRouter()





# CHECK LOGGED IN USER
def get_user_id(
    x_user_id: str = Header(None)
):

    if not x_user_id:

        raise HTTPException(
            status_code=401,
            detail="Login required"
        )


    return x_user_id







# GET ONLY LOGGED IN USER STUDENTS
@student_router.get(
    "/student",
    response_model=list[StudentResponse]
)
async def get_list_of_students(
    user_id: str = Depends(get_user_id)
):

    students = []


    async for student in db.students.find(
        {
            "owner_id": user_id
        }
    ):

        student["id"] = str(student["_id"])

        student.pop("_id", None)

        students.append(student)


    return students







# GET ONE STUDENT
@student_router.get(
    "/student/{student_id}",
    response_model=StudentResponse
)
async def get_one_student(
    student_id: str,
    user_id: str = Depends(get_user_id)
):


    try:

        student = await db.students.find_one(
            {
                "_id": ObjectId(student_id),
                "owner_id": user_id
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
@student_router.post(
    "/student",
    response_model=StudentResponse
)
async def create_new_student(
    student: Student,
    user_id: str = Depends(get_user_id)
):


    student_data = student.model_dump()



    # link student to user
    student_data["owner_id"] = user_id



    result = await db.students.insert_one(
        student_data
    )



    new_student = await db.students.find_one(
        {
            "_id": result.inserted_id
        }
    )



    new_student["id"] = str(
        new_student["_id"]
    )


    new_student.pop("_id", None)



    return new_student







# UPDATE ONLY OWN STUDENT
@student_router.put(
    "/student/{student_id}",
    response_model=StudentResponse
)
async def update_student(
    student_id: str,
    student: Student,
    user_id: str = Depends(get_user_id)
):


    try:

        object_id = ObjectId(student_id)


    except InvalidId:

        raise HTTPException(
            status_code=400,
            detail="Invalid id"
        )



    updated = await db.students.update_one(

        {
            "_id": object_id,
            "owner_id": user_id
        },


        {
            "$set": student.model_dump()
        }

    )



    if updated.matched_count == 0:

        raise HTTPException(
            status_code=403,
            detail="You cannot edit this student"
        )



    updated_student = await db.students.find_one(
        {
            "_id": object_id
        }
    )



    updated_student["id"] = str(
        updated_student["_id"]
    )


    updated_student.pop("_id", None)



    return updated_student







# DELETE ONLY OWN STUDENT (ADMIN LATER)
@student_router.delete(
    "/student/{student_id}"
)
async def delete_student(
    student_id: str,
    user_id: str = Depends(get_user_id)
):


    try:

        object_id = ObjectId(student_id)


    except InvalidId:

        raise HTTPException(
            status_code=400,
            detail="Invalid id"
        )



    deleted = await db.students.delete_one(

        {
            "_id": object_id,
            "owner_id": user_id
        }

    )



    if deleted.deleted_count == 0:

        raise HTTPException(
            status_code=403,
            detail="You cannot delete this student"
        )



    return {
        "message": "Student deleted successfully"
    }