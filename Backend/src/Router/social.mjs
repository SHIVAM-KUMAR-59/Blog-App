import { Router } from 'express'
import { Post } from '../Schema/postSchema.mjs'
import { isAuthenticated } from './blog.mjs'

const router = Router()

// PATCH request to Like a post
router.patch('/api/posts/:title/like', isAuthenticated, async (req, res) => {
  const { title } = req.params
  const { value } = req.body // Get value (0 or 1) from the request body

  try {
    // Find the post by title (slug)
    const post = await Post.findOne({ title })

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' })
    }

    // Update the number of likes based on value
    if (value === '0') {
      post.reactions.like += 1 // Increment like
    } else if (value === '1') {
      post.reactions.like -= 1 // Decrement like (user removed like)
    }

    // Save the post after updating likes
    await post.save()

    res.status(200).json({ message: 'Likes updated successfully.', post })
  } catch (error) {
    console.error('Error updating likes:', error)
    return res.status(500).json({ message: 'Internal server error', error })
  }
})

export default router
