import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Transaction = () => {
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [seatNumber, setSeatNumber] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const navigate = useNavigate();

    const fetchFlights = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/flights')
            if (response.status === 200) {
                const data = await response.json()
                setFlights(data.flights)
            } else {
                alert("Something's wrong")
            }
        } catch (error) {
            alert("Error Load Data")
        }
    }

    useEffect(() => {
        fetchFlights()
    }, [])

    const handleBuy = (flightId) => {
        navigate(`/transaction/${flightId}`)
    };
    const handleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/');
      };
      const toMain = () => {
        navigate('/app');
      };

    return (
        <div className="container mt-5">
                 <button className="btn btn-danger position-absolute" style={{ top: '10px', right: '10px' }} onClick={handleLogout}>
          Logout
        </button>
        <button className="btn btn-success position-absolute" style={{ top: '10px', right: '100px' }} onClick={toMain}>
          Home
        </button>

            <h2 className="mb-4">Tickets</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Departure</th>
                        <th>Destination</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight) => (
                        <tr key={flight.id}>
                            <td>{flight.departureCity}</td>
                            <td>{flight.destinationCity}</td>
                            <td>{flight.price}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleBuy(flight.id)}>Beli</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Transaction;
