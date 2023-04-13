import React from "react";

const ExperienceCard = ({ companyName, experience, likes, dislikes , handleLike , handleDislike , fetchComments}) => {
  return (
    <div>
      <p>College Name: {companyName}</p>
      <p>Experience: {experience}</p>
      <p>Likes : {likes}</p>
      <button className="allExperiencesButton" onClick={() => handleLike(experience._id)}>Like</button>
      <p>Dislikes :{dislikes}</p>
      <button className="allExperiencesButton" onClick={() => handleDislike(experience._id)}>Dislike</button>
      <button className="allExperiencesButton" onClick={() => fetchComments(experience._id)}>Comments</button>
    </div>
  );
};

export default ExperienceCard;
