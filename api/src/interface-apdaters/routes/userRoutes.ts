import express from 'express';
import {UserController} from '../controllers/users/UserController'
import {CreateUser} from '../../use-cases/user/CreateUser'
import {LoginUser} from '../../use-cases/user/LoginUser'

const router = express.Router();
const createUser = new CreateUser();
const loginUser = new LoginUser();
const userController = new UserController(createUser, loginUser);

router.post('/register', userController.register);
router.post('/login', userController.login);


export default router;