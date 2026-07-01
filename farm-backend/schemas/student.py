from pydantic import BaseModel, EmailStr, ConfigDict



class StudentResponse(BaseModel):

    model_config = ConfigDict(
        populate_by_name=True
    )


    id: str

    student_name: str

    student_email: EmailStr

    student_phone_no: str

    student_level: int

    owner_id: str