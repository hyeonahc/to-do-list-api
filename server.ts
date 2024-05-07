import bodyParser from 'body-parser'
// imports the body-parser middleware
// :parsing incoming request bodies in Express.js applications, particularly for handling HTTP POST requests
import cors from 'cors'
// imports the cors middleware
// : setting up rules for which websites can access resources on your server
// Cross-Origin Resource Sharing (CORS)
// : CORS is a security feature that regulates different domain requests in web browsers, ensuring that only trusted websites can access resources on a server
import express from 'express'
// express is Node.js framework for building web APIs
import dotenv from 'dotenv'
import todoRoutes from './router/todo'

dotenv.config()

const app = express()
// sets up the foundation for your web server using Express, allowing you to define routes, add middleware, and handle HTTP requests and responses in your Node.js application.

const PORT = process.env.PORT || 8080

// Middleware
// Middleware functions act as a bridge between the incoming HTTP request and the application's response.
// Middleware functions can modify the request and response objects.
// Middleware functions are added to the Express application using the use() method.
// Middleware functions can be used to perform tasks like logging requests, parsing request bodies, authenticating users, handling sessions, and many other operations.
// app.use(Middleware): tells the Express application to use the middleware imported earlier
app.use(cors())
// It enables CORS for all routes
app.use(express.json())
// It allows for the automatic parsing of incoming JSON data from client requests
// JSON
// : is used to exchange data between a web server and a client (such as a web browser or mobile app) in web development
// JSON Payload
// : refers specifically to the JSON data that is transmitted as part of an HTTP request or response. It's the actual data being sent over the network.
// "JSON payload" refers to the data is formatted as JSON
app.use(bodyParser.urlencoded({ extended: true }))
// It automatically parses incoming requests with URL-encoded data
// URL-encoded data
// : is a way of representing information in a URL or within the body of an HTTP request
// 1) URL Example
// - Before URL Encoding (Client): https://example.com/search?q=my query
// - After URL Encoding (Server): https://example.com/search?q=my+query
// 2) HTTP Request Body
// - Before URL Encoding (Client): name=John Doe&age=30
// - After URL Encoding (Server): name=John+Doe&age=30
app.use('/api', todoRoutes)
// It sets up a specific route in app to manage requests related to-do list functionality

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
// this code starts your Express server, tells it to listen for connections on a specific port, and prints a message to the console confirming that the server is running and on which port
