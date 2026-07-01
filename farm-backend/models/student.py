from pydantic import BaseModel, EmailStr


class Student(BaseModel):

    student_name: str

    student_email: EmailStr

    student_phone_no: str

    student_level: int