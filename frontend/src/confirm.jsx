import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
        <div>
            {flight ? (
                <div>
                    <h2>Confirm Purchase</h2>
                    <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
                    <p><strong>Departure City:</strong> {flight.departureCity}</p>
                    <p><strong>Destination City:</strong> {flight.destinationCity}</p>
                    <p><strong>Price:</strong> {flight.price}</p>
                    <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Confirm;
