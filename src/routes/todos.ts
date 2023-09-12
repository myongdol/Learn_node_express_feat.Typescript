import {Router} from 'express';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controllers/todos'; //getTodos 추가됨

const router = Router();

router.post('/', createTodo);
router.get('/', getTodos); // getTodos 추가됨
router.patch('/:id', updateTodo );
router.delete('/:id', deleteTodo);

export default router;