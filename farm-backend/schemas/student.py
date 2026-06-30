from pydantic import BaseModel

class StudentResponse(BaseModel):
    id:str
    student_name:str
    student_email : str
    student_phone_no:str
    student_level : int