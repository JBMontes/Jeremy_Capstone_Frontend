
// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [socket, setSocket] = useState(null);
//   let counter = 0;

//   useEffect(() => {
//     const newSocket = io(`http://localhost:${PORT}`); // Adjust the URL if your server is hosted elsewhere

//     setSocket(newSocket);

//     newSocket.on('chat message', (msg, serverOffset) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//       window.scrollTo(0, document.body.scrollHeight);
//     });

//     return () => newSocket.close();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (inputValue && socket) {
//       const clientOffset = `${socket.id}-${counter++}`;
//       socket.emit('chat message', inputValue, clientOffset);
//       setInputValue('');
//     }
//   };

//   return (
//     <div>
//       <ul className="messages">
//         {messages.map((message, index) => (
//           <li key={index}>{message}</li>
//         ))}
//       </ul>
      
//       <form id="form" onSubmit={handleSubmit}>
//         <input 
//           id="input" 
//           autoComplete="off" 
//           value={inputValue} 
//           onChange={(e) => setInputValue(e.target.value)} 
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default ChatApp;


// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [socket, setSocket] = useState(null);
//   let counter = 0;

//   const PORT = import.meta.env.REACT_APP_PORT

//   useEffect(() => {
//     const newSocket = io(`http://localhost:${PORT}`); 
//     setSocket(newSocket);

//     newSocket.on('chat message', (msg, serverOffset) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//       window.scrollTo(0, document.body.scrollHeight);
//     });

//     return () => newSocket.close();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (inputValue && socket) {
//       const clientOffset = `${socket.id}-${counter++}`;
//       socket.emit('chat message', inputValue, clientOffset);
//       setInputValue('');
//     }
//   };

//   return (
//     <div>
//       <ul className="messages">
//         {messages.map((message, index) => (
//           <li key={index}>{message}</li>
//         ))}
//       </ul>
      
//       <form id="form" onSubmit={handleSubmit}>
//         <input 
//           id="input" 
//           autoComplete="off" 
//           value={inputValue} 
//           onChange={(e) => setInputValue(e.target.value)} 
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default ChatApp;

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);
  let counter = 0;
  const PORT = import.meta.env.REACT_APP_PORT || 3000;

  useEffect(() => {
    const newSocket = io(`http://localhost:${PORT}`);
    setSocket(newSocket);

    newSocket.on('chat message', (msg, serverOffset) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      window.scrollTo(0, document.body.scrollHeight);
    });

    return () => newSocket.close();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue && socket) {
      const clientOffset = `${socket.id}-${counter++}`;
      socket.emit('chat message', inputValue, clientOffset);
      setInputValue('');
    }
  };

  return (
    <div>
      <ul className="messages">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      
      <form id="form" onSubmit={handleSubmit}>
        <input 
          id="input" 
          autoComplete="off" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;
