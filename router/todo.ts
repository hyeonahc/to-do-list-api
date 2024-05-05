// Routes
// Define the endpoints (URL paths) of the API and specify the HTTP methods (GET, POST, PUT, DELETE) that are accepted at each endpoint
// Routes direct incoming requests to the appropriate controller functions

// API endpoints
// - The endpoint usually refers to the part of the URL path that comes after the server address and port
// - i.e.) /getAllTodo, /getTodo, etc
import { Router } from 'express'
import * as todoController from '../controller/todo'

const router = Router()
// This creates a new router instance using the Router object imported from Express

// Route Definitions
// These lines define different routes for handling HTTP requests
router.get('/getAllTodo', todoController.getAllTodo)
router.get('/getTodo', todoController.getTodo)
router.post('/addTodo', todoController.addTodo)
router.put('/updateTodo', todoController.updateTodo)
router.delete('/deleteTodo', todoController.deleteTodo)

export default router
