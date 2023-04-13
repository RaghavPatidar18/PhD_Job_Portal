import React from "react";

const ExperienceCard = ({ companyName, experience, likes, dislikes, handleLike, handleDislike, fetchComments,name }) => {
  return (
    // <div>
    //   <p>College Name: {companyName}</p>
    //   <p>Experience: {experience}</p>
    //   <p>Likes : {likes}</p>
    //   <button onClick={() => handleLike(experience._id)}>Like</button>
    //   <p>Dislikes :{dislikes}</p>
    //   <button onClick={() => handleDislike(experience._id)}>Dislike</button>
    //   <button onClick={() => fetchComments(experience._id)}>Comments</button>
    // </div>

    <div class="p-6 bg-gray-100 rounded-lg dark:bg-white-800 md:p-8">
      <div class="flex items-center mt-6">
        <div class="mx-4">
          <h1 class="font-semibold text-blue-500">{companyName}</h1>
        </div>
      </div>
      <p class="leading-loose text-gray-500 dark:text-black-300">
        {/* “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa aperiam dolorum, obcaecati corrupti aspernatur a.”. */}
        {experience}
      </p>
      <br></br>
          <span class="text-sm text-gray-500 dark:text-black-300">{name}</span>

    </div>

  );
};

export default ExperienceCard;
