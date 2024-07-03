import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Transaction=()=>{
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [seatNumber, setSeatNumber] = useState("");
    const [bookingTime, setBookingTime] = useState("");

    const fetchFlights= async () =>{
        try{
            const response = await fetch('http://127.0.0.1:5000/flights')
            if(response.status==200){
            const data=await response.json()
            setFlights(data.flights)
            }else{
                alert("Something's wrong")
            }
        }catch(error){
            alert("Error Load Data")
        }
    }
    useEffect(()=>{
        fetchFlights()
    },[])

    const handleBuy = (flightId) => {
        window.location.href=`/transaction/${flightId}`
    };
    
    return <div>
        <h2>Tickets</h2>
        <table>
            <thead>
                <tr>
                    <th>Departure</th>
                    <th>Destination</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {flights.map((flight)=>(
                    <tr key={flight.id}>
                    <td>{flight.departureCity}</td>
                    <td>{flight.destinationCity}</td>
                    <td>{flight.price}</td>
                    <td><button onClick={()=>handleBuy(flight.id)}>Beli</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}


export default Transaction;