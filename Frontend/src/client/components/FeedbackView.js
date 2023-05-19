import { useEffect, useState } from 'react'
import FeedbackDetails from './FeedbackDetails copy'

const FeedbackView = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const response = await fetch('/api/allfeedback')
        const json = await response.json()
        if (response.ok) {
          setFeedbacks(json)
        } else {
          setError('Error retrieving feedbacks')
        }
      } catch (error) {
        setError(error.message)
      }
    }

    fetchFeedbacks()
  }, [])

  return (
    <div>
      {error && <p>{error}</p>}
      {feedbacks.map((feedback) => (
        <FeedbackDetails key={feedback._id} feedback={feedback} />
      ))}
    </div>
  )
}

export default FeedbackView
