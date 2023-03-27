import express from 'express'
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost, commentPost} from '../controllers/PostController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js'
const router = express.Router()

router.post('/', authMiddleWare,createPost)
router.get('/:id', getPost)
router.put('/:id', authMiddleWare, updatePost)
router.delete('/:id', authMiddleWare, deletePost)
router.put('/:id/like',authMiddleWare, likePost)
router.get('/:id/timeline', getTimelinePosts)
router.post('/:id/comment', authMiddleWare, commentPost)

export default router