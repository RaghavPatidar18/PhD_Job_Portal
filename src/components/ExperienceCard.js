import React from "react";

const ExperienceCard = ({ companyName, experience, likes, dislikes , handleLike , handleDislike , fetchComments}) => {
  return (
    <div>
      <p>College Name: {companyName}</p>
      <p>Experience: {experience}</p>
      <p>Likes : {likes}</p>
      <button onClick={() => handleLike(experience._id)}>Like</button>
      <p>Dislikes :{dislikes}</p>
      <button onClick={() => handleDislike(experience._id)}>Dislike</button>
      <button onClick={() => fetchComments(experience._id)}>Comments</button>
    </div>
  );
};

export default ExperienceCard;
