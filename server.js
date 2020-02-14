const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const watch = require('node-watch')

// app.use('/build', express.static('build'))
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './gravity.html')))
app.get('/client', (req, res) => res.sendFile(path.resolve(__dirname, './client.js')))
app.get('/socket', (req, res) => {
  const way = path.resolve(__dirname, './node_modules/socket.io-client/dist/socket.io.js')
  res.sendFile(way)
})

io.on('connection', () => console.log("socket connected"))

function watcher(evt, name) {
  console.log(`${name} changed.`)
  io.emit('fileChanged', `${name} changed`)
}
watch('./gravity.html', { recursive: true }, watcher)

server.listen(process.env.PORT, () => console.log(
  JSON.stringify({
    port: process.env.PORT,
    pid: process.pid,
  })
))