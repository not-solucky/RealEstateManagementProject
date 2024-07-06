<<<<<<< Updated upstream
import { NavLink } from "react-router-dom";
function Service() {
    return (
        <>
            services page
        </>
    );
}
=======
import React, { useState, useEffect } from 'react';
>>>>>>> Stashed changes


const ClientInfo = () => {
  const [clients, setClients] = useState([]);

  return (
    <div>
      <h1>Client Information</h1>
      {clients.map(client => (
        <div key={client.id}>
          <h2>{client.name}</h2>
          <p>Email: {client.email}</p>
          <p>Phone: {client.phone}</p>
          <h3>Transactions:</h3>
          <ul>
            {client.transactions.map(transaction => (
              <li key={transaction.id}>
                {transaction.type} - {transaction.property} - ${transaction.amount}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ClientInfo;
