import { useState } from 'react'
import PostTitle from './PostTitle'
import PostDescription from './PostDescription'
import PostContent from './PostContent'
import TagsInput from './TagsInput'
import CategoriesInput from './CategoriesInput'
import styles from './createpost.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePostPage = () => {
  const [tags, setTags] = useState([])
  const [category, setCategory] = useState([])
  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    // Form validation: Ensure that required fields are not empty
    if (
      !title ||
      !shortDescription ||
      !content ||
      tags.length === 0 ||
      category.length === 0
    ) {
      alert('Please fill in all the required fields.')
      return
    }

    const postData = {
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      content: content.trim(),
      tags,
      category,
    }

    try {
      // POST request with `withCredentials: true` to ensure session cookies are sent
      const response = await axios.post(
        'http://localhost:3000/api/posts',
        postData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )

      // Check if the response is successful
      if (response.status === 201) {
        // Assuming a successful creation returns a 201 status
        console.log('Post created successfully:', response.data)

        // Clear the input fields only after a successful API request
        setTitle('')
        setShortDescription('')
        setContent('')
        setTags([])
        setCategory([])
        navigate('/')
      }
    } catch (err) {
      console.error('Error: ', err.response?.data || err.message)
    }
  }

  return (
    <form className={styles.createPostContainer} onSubmit={onSubmitHandler}>
      <PostTitle setTitle={setTitle} title={title} /> {/* Pass title state */}
      <PostDescription
        setShortDescription={setShortDescription}
        shortDescription={shortDescription}
      />{' '}
      {/* Pass shortDescription state */}
      <PostContent setContent={setContent} content={content} />{' '}
      {/* Pass content state */}
      <TagsInput tags={tags} setTags={setTags} />
      <CategoriesInput categories={category} setCategories={setCategory} />
      <button className="btn btn-primary" type="submit">
        Create Post
      </button>
    </form>
  )
}

export default CreatePostPage
