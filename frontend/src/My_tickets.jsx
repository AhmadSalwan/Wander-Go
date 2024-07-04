import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const response = await fetch(`http://127.0.0.1:5000/user_tickets/${user_id}`);
                if (response.ok) {
                    const data = await response.json();
                    setTickets(data.tickets);
                } else {
                    alert('Failed to fetch tickets');
                }
            } catch (error) {
                alert('Error fetching data');
            }
        };

        fetchTickets();
    }, []);
    const handleDeleteTicket = async (ticketId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/delete_booking/${ticketId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
                setTickets(updatedTickets);
                alert('Ticket deleted successfully');
            } else {
                alert('Failed to delete ticket');
            }
        } catch (error) {
            console.error('Error deleting ticket:', error);
            alert('An error occurred while deleting the ticket');
        }
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

            <h2>Your Tickets</h2>
            {tickets.length > 0 ? (
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Flight Number</th>
                            <th>Departure City</th>
                            <th>Destination City</th>
                            <th>Seat Number</th>
                            <th>Booking Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.flightNumber}</td>
                                <td>{ticket.departureCity}</td>
                                <td>{ticket.destinationCity}</td>
                                <td>{ticket.seatNumber}</td>
                                <td>{new Date(ticket.booking_time).toLocaleString()}</td>
                                <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteTicket(ticket.id)}
                                >
                                    Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No tickets found.</p>
            )}
            <a href='/transaction'>
            <button className='btn-secondary'>Pesan Tiket</button>
            </a>
        </div>
    );
};

export default Tickets;
