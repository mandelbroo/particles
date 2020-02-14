if (window && window.location.host.includes('localhost')) {
  const socket = io("http://localhost:3000");
  
  socket.on('connect', () => console.log('connected'))

  socket.on('fileChanged', (msg) => {
    console.log(msg)
    location.reload()
  })
}