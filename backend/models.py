# Import Db
from config import db

#Buat Class Untuk Database
class user(db.Model):
    __tablename__="user"
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(80),unique=False,nullable=False)
    email=db.Column(db.String(80),unique=True,nullable=False)
    password=db.Column(db.String(120),unique=False,nullable=False)
    gender=db.Column(db.String(120),unique=False,nullable=False)
    alamat=db.Column(db.String(120),unique=False,nullable=False)
    
    # Mengambil data field dan mengkonvertnya menjadi dictionary lalu JSON di main.py

    def to_json(self):
        return{
            "id":self.id,
            "username":self.username,
            "email":self.email,
            "password":self.password,
            "gender":self.gender,
            "alamat":self.alamat
        }