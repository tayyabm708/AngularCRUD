import express from 'express';
import { addUsers } from '../controllers/user.controllers.js';
import { getUsers } from '../controllers/user.controllers.js';
import { getUser } from '../controllers/user.controllers.js';
import { updateUser } from '../controllers/user.controllers.js';
import { deleteUser } from '../controllers/user.controllers.js';


const router = express.Router();
 
router.post('/addUsers', addUsers);
router.get('/getUsers', getUsers);
router.get('/getUser/:userId', getUser);
router.put('/updateUser/:userId', updateUser);
router.delete('/deleteUser/:userId', deleteUser);

export default router;