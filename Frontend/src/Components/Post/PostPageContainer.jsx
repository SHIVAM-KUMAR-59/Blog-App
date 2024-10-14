import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './post.module.css'
import { AiTwotoneLike } from 'react-icons/ai'

const PostPageContainer = () => {
  const { title } = useParams() // Get the title parameter from the URL

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [like, setLike] = useState('0')

  const fetchData = () => {
    axios
      .get(`http://localhost:3000/api/posts/${title}`)
      .then((response) => {
        // Since the response is an array, access the first element
        setData(response.data[0]) // Set data to the first object in the response array
      })
      .catch((err) => {
        console.error('Error fetching data:', err) // Log any errors
        setError(err)
        setData(null) // Reset data on error
      })
  }

  const onClickHandler = () => {
    console.log('Like button clicked')
    console.log(like)
    if (like === '0') {
      setLike('1')
      data.reactions.like = 1 // Update data.reactions.like directly
    } else {
      setLike('0')
      data.reactions.like = 0 // Update data.reactions.like directly
    }
    // ... rest of the function (e.g., handle error in API call)
    axios
      .patch(
        `http://localhost:3000/api/posts/${title}/like`,
        {
          value: like,
        },
        {
          withCredentials: true,
        },
      )
      .then(fetchData)
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchData()
  }, [title])

  if (error) {
    return <div>Error: {error.message}</div> // Handle error
  }

  // Check if data is available before rendering
  if (!data) {
    return <div>Loading...</div> // Loading state if no data yet
  }

  return (
    <div className={styles.postPageContainer}>
      <h1>{data.title.trim()}</h1>
      <h3>Author: {data.author.displayName}</h3>
      <h5>
        Published Date: {new Date(data.publishedDate).toLocaleDateString()}
      </h5>
      <hr />
      <p>
        Decription: <br />
        {data.shortDescription}
      </p>
      <hr />
      <p>{data.content}</p>
      <div className={styles.reactions}>
        <div>Likes: {data.reactions.like}</div>
        <div className={styles.like}>
          <AiTwotoneLike onClick={onClickHandler} />
        </div>
      </div>
    </div>
  )
}

export default PostPageContainer
