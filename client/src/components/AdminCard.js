import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const AdminCard = ({ name, email, password, companyName, location, year }) => {
  const [showButton, setShowButton] = useState(true);

  const handleAdd = () => {
    console.log("button db gyi");
    axios.post("/api/add-institute", { name, email }).then((res) => {
      console.log(res);
      if (res.data.success) {
        console.log(res.data);
      } else {
        console.log("bekaar hai bhaiya");
      }
    });
    setShowButton(false); // hide the button
  };

  return (
    <>
      <div class="max-w-lg px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-between">
          <span class="text-sm font-light text-gray-600 dark:text-gray-400">Requested for registration</span>
          {showButton && (
            <Button
              variant="success"
              style={{ float: "left" }}
              onClick={handleAdd}
            >
              Add
            </Button>
          )}
        </div>

        <div class="mt-2">
          <a href="#" class="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabindex="0" role="link">{name}</a>
          <p class="mt-2 text-gray-600 dark:text-gray-300">Email : {email}</p>
          <p class="mt-2 text-gray-600 dark:text-gray-300">Location : {location}</p>
          <p class="mt-2 text-gray-600 dark:text-gray-300">Year of Establishment : {year}</p>
        </div>
      </div>

    </>
  );
};

export default AdminCard;
