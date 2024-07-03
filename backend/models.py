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
    
class Flights(db.Model):
    __tablename__="flights"
    id=db.Column(db.Integer,primary_key=True)
    flight_number=db.Column(db.String(10),nullable=False)
    departure_city = db.Column(db.String(50), nullable=False)
    destination_city = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)

    
    def to_json(self):
        return{
            "id":self.id,
            "flightNumber":self.flight_number,
            "departureCity":self.departure_city,
            "destinationCity":self.destination_city,
            "price":self.price
        }

class Booking(db.Model):
    __tablename__="bookings"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'), nullable=False)
    seat_number = db.Column(db.String(10), nullable=False)
    booking_time = db.Column(db.DateTime, nullable=False)

    def to_json(self):
        return{
            "id":self.id,
            "userId":self.user_id,
            "flightId":self.flight_id,
            "seatNumber":self.seat_number,
            "bookingTime":self.booking_time
        }
