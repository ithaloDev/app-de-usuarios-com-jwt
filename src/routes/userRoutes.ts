import {Router} from 'express'
import userController from '../controllers/userController'
import auth from '../middlewares/auth'

const router = Router()

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.delete('/:id', auth, userController.deleteUserById)
router.put('/:id', auth, userController.updateUserById)

export default router