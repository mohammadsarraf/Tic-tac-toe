// import io from 'socket.io-client';
// 
// const [data, setData] = useState(null)

//   useEffect(() => {
//     const socket = io('http://localhost:3100/');
//     socket.on('connect', () => {
//       console.log('Connected to socket.io server');
//       socket.emit('my-event', { data: 'This is my data' });
//     });
//     socket.on('server-event', (data) => {
//       console.log('Received data from server:', data);
//       setData(data);
//     });
//   }, []);