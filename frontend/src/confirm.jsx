import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Confirm = () => {
    const [flight, setFlight] = useState(null);
    const { flight_id } = useParams();
    const navigate = useNavigate();

    const fetchFlight = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/flights/${flight_id}`);
            if (response.status === 200) {
                const data = await response.json();
                console.log("Data received from server:", data); // Logging response
                setFlight(data); // Set the entire data object directly
            } else {
                alert("Something's wrong");
            }
        } catch (error) {
            alert("Error loading data");
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/');
      };
      const toMain = () => {
        navigate('/app');
      };

    useEffect(() => {
        fetchFlight();
    }, [flight_id]);

    const handleConfirmPurchase = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: localStorage.getItem("user_id"),
                    flight_id: flight.id,
                    seat_number: "12A", 
                    booking_time: new Date().toISOString()
                })
            };
            const response = await fetch('http://127.0.0.1:5000/create_booking', options);
            if (response.status === 201) {
                alert("Ticket purchased successfully");
                navigate('/app');
            } else {
                alert("Error purchasing ticket");
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="container mt-5">
        <button className="btn btn-danger position-absolute" style={{ top: '10px', right: '10px' }} onClick={handleLogout}>
          Logout
        </button>
        <button className="btn btn-success position-absolute" style={{ top: '10px', right: '100px' }} onClick={toMain}>
          Home
        </button>

            {flight ? (
                <div className="card">
                    <div className="card-header">
                        <h2>Confirm Purchase</h2>
                    </div>
                    <div className="card-body">
                        <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
                        <p><strong>Departure City:</strong> {flight.departureCity}</p>
                        <p><strong>Destination City:</strong> {flight.destinationCity}</p>
                        <p><strong>Price:</strong> {flight.price}</p>
                        <button className="btn btn-primary" onClick={handleConfirmPurchase}>Confirm Purchase</button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Confirm;
