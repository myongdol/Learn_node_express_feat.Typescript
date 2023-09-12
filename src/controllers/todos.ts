import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as {text: string}).text;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);
    res.status(201).json({message: 'Created the todo.', createTodo: newTodo});
};  

export const getTodos: RequestHandler = (req, res, next) => { //추가됨
    res.json({todos: TODOS});
}

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => { //추가됨 
    const todoId = req.params.id;

    const updateText = (req.body as {text: string}).text;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if(todoIndex < 0) {
        throw new Error('할일을 찾지 못하였습니다.');
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updateText);

    res.json({message: '업데이트', updateTodo: TODOS[todoIndex]})
}

export const deleteTodo: RequestHandler = (req, res, next) => { // 추가됨
     const todoId = req.params.id;
     const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

     if(todoIndex < 0) {
        throw new Error('할일을 찾지 못하였습니다.');
     }
     
     TODOS.splice(todoIndex, 1);
     res.json({ mesaage: '제거 되었습니다.'});
}