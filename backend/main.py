from flask import request,jsonify
from config import app,db
from models import user,Flights,Booking

@app.route("/list_user",methods=["GET"])
def get_user():
    users=user.query.all()
    json_user=list(map(lambda x:x.to_json(),users))
    return jsonify({"users":json_user})

@app.route("/create_user",methods=["POST"])
def create_user():
    username=request.json.get("username")
    email=request.json.get("email")
    password=request.json.get("password")
    gender=request.json.get("gender")
    alamat=request.json.get("alamat")

    if not username or not email or not password or not gender or not alamat:
        return(jsonify({"message":"Jangan Ada Yang Kosong"}))

    new_user=user(username=username,email=email,password=password,gender=gender,alamat=alamat)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message":str(e)}),400
    
    return jsonify({"message":"User Created"}),201

@app.route("/update_user/<int:user_id>",methods=["PATCH"])
def update_user(user_id):
    current_user=user.query.get(user_id)

    if not current_user:
        return jsonify({"message":"User Not Found"}),404
    
    data=request.json
    current_user.username=data.get("username",current_user.username)
    current_user.email=data.get("email",current_user.email)
    current_user.password=data.get("password",current_user.password)
    current_user.gender=data.get("gender",current_user.gender)
    current_user.alamat=data.get("alamat",current_user.alamat)

    db.session.commit()
    return jsonify({"message":"User Updated"}),200

@app.route("/delete_user/<int:user_id>",methods=["DELETE"])
def delete_user(user_id):
    current_user=user.query.get(user_id)
    if not current_user:
        return jsonify({"message":"User Not Found"}),404
    
    db.session.delete(current_user)
    db.session.commit()

    return jsonify({"message":"User Deleted"}),200

@app.route('/flights',methods=['GET'])
def get_flights():
    flights=Flights.query.all()
    json_flights=list(map(lambda x:x.to_json(),flights))
    return jsonify({"flights":json_flights})

@app.route('/flights/<int:flight_id>',methods=['GET'])
def get_single_flights(flight_id):
    flights=Flights.query.get(flight_id)
    if not flights:
        return jsonify({"message":"ticket not found"})
    return jsonify(flights.to_json())
    
@app.route("/create_flight",methods=['POST'])
def create_flight():
    flight_number=request.json.get('flightNumber')
    departure_city=request.json.get('departureCity')
    destination_city=request.json.get('destinationCity')
    price=request.json.get('price')

    new_flight=Flights(flight_number=flight_number,departure_city=departure_city,
                       destination_city=destination_city,price=price)
    try:
        db.session.add(new_flight)
        db.session.commit()
    except Exception as e:
        return jsonify({"message":str(e)}),400
    return jsonify({"message":"User Created"})

@app.route('/create_booking',methods=['POST'])
def create_booking():
    data=request.json
    new_booking = Booking(user_id=data['user_id'], flight_id=data['flight_id'], seat_number=data['seat_number'],
                          booking_time=data['booking_time'])
    db.session.add(new_booking)
    db.session.commit()
    return jsonify({'message': 'Booking created successfully'}),201
@app.route('/user_tickets/<int:user_id>', methods=['GET'])
def get_user_tickets(user_id):
    # Mencari booking berdasarkan user_id
    bookings = Booking.query.filter_by(user_id=user_id).all()

    if not bookings:
        return jsonify({"message": "No tickets found for this user"}), 404

    # Mengambil detail penerbangan (flights) berdasarkan booking
    tickets = []
    for booking in bookings:
        flight = Flights.query.get(booking.flight_id)
        if flight:
            ticket_info = {
                "id": booking.id,
                "flightNumber": flight.flight_number,
                "departureCity": flight.departure_city,
                "destinationCity": flight.destination_city,
                "seatNumber": booking.seat_number,
                "booking_time": booking.booking_time.strftime('%Y-%m-%d %H:%M:%S')  # format tanggal
            }
            tickets.append(ticket_info)

    return jsonify({"tickets": tickets})

@app.route("/delete_booking/<int:booking_id>", methods=["DELETE"])
def delete_booking(booking_id):
    booking = Booking.query.get(booking_id)
    if not booking:
        return jsonify({"message": "Booking not found"}), 404
    
    try:
        db.session.delete(booking)
        db.session.commit()
        return jsonify({"message": "Booking deleted successfully"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

if __name__=="__main__":
    with app.app_context():
       db.create_all()
    app.run(debug=True)