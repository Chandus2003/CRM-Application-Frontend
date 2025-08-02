import { useParams } from 'react-router-dom';

export default function TicketDetails() {
  const { id } = useParams();

  // This is where you'll fetch messages, status, etc.
  return (
    <div className="container">
      <h2>Ticket Details</h2>
      <p>Ticket ID: {id}</p>
      <p>Conversation will go here...</p>
    </div>
  );
}
