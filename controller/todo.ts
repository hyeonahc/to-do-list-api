// Controller
// - Contains the implementation of the API endpoints
// - Each controller function corresponds to a specific API endpoint
// - Each controller function is responsible for handling the business logic associated with that endpoint

// API endpoints
// - The endpoint usually refers to the part of the URL path that comes after the server address and port
// - i.e.) /getAllTodo, /getTodo, etc
import { Request, Response } from 'express'
import { getNanoId } from '../util/getNanoId'

interface Todo {
  id: string
  text: string
}

let todoList: Todo[] = []

export const getAllTodo = async (req: Request, res: Response) => {
  try {
    if (todoList.length > 0) {
      res.status(200).json({
        message: 'Successfully retrieved all to-do items',
        data: todoList,
      })
    } else {
      res.status(200).json({
        message: 'To-do list is empty',
        data: [],
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    })
  }
}

export const getTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        message: 'Invalid or missing id parameter',
      })
    }

    const filteredTodo = todoList.find(todo => todo.id.toString() === id)

    if (filteredTodo) {
      res.status(200).json({
        message: 'Successfully retrieved todo',
        data: filteredTodo,
      })
    } else {
      res.status(404).json({
        message: 'Todo not found',
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      data: err.message,
    })
  }
}

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { text } = req.body
    if (!text) {
      return res.status(400).json({
        message: 'Text is a required field',
      })
    }

    const id = getNanoId()
    const newTodo = { ...req.body, id }
    todoList.push(newTodo)
    res.status(201).json({
      message: 'Successfully added todo',
      newTodo,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    })
  }
}

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id, text } = req.body
    if (!id || !text) {
      return res.status(400).json({
        error: 'Both id and text are required',
      })
    }

    const index = todoList.findIndex(todo => todo.id.toString() === id)
    if (index === -1) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    todoList[index].text = text

    res.json({
      message: 'successfully updated todo',
      data: todoList[index],
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      data: err.message,
    })
  }
}

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.query
    if (!id) {
      return res.status(400).json({
        error: 'id is required',
      })
    }

    const index = todoList.findIndex(todo => todo.id === id)
    if (index === -1) {
      return res.status(404).json({
        error: 'Todo not found',
      })
    }

    todoList.splice(index, 1)

    res.status(200).json({
      message: 'Successfully deleted todo',
      data: todoList,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      data: err.message,
    })
  }
}
