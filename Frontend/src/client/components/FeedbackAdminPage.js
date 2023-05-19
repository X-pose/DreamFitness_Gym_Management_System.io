import React, { useState, useEffect } from "react";
import "../../public/css/FeedbackAdminPage.css";
import FeedbackDetailsz from "./FeedbackDetails copy";

const FeedbackForm = () => {
  const [error, setError] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


useEffect(() => {
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/allfeedback');
      const json = await response.json();
      if (response.ok) {
        setFeedbacks(json);
      } else {
        setError(json.error);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch feedbacks');
    }
  };

  fetchFeedbacks();
}, []);


const handleSearch = (event) => {
  setSearchQuery(event.target.value.trim());
};

const filteredFeedbacks = feedbacks.filter((feedback) => {
  const ratingString = feedback.rating.toString();
  return ratingString.toLowerCase().includes(searchQuery.toLowerCase());
});


    return (
        <div>

      <div className="searchbar">
          <input type="text" placeholder="Search by Rating" onChange={handleSearch} />
      </div>

    <div className="cont">
      {filteredFeedbacks.map((feedback) => (
        <FeedbackDetailsz key={feedback._id} feedback={feedback} />
      ))}
    </div>
  
            

        </div>
    )
}

export default FeedbackForm