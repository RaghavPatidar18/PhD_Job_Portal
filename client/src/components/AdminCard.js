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
      <div class="p-6 bg-gray-100 rounded-lg dark:bg-white-800 md:p-8">
        <div class="flex items-center mt-6">
          <div class="mx-4">
            <h1 class="font-semibold text-blue-500">Company : {companyName}</h1>
          </div>
        </div>
        <p class="leading-loose text-gray-500 dark:text-black-300">
          User Name : {name}
        </p>
        <p class="leading-loose text-gray-500 dark:text-black-300">
          Email : {email}
        </p>
        <p class="leading-loose text-gray-500 dark:text-black-300">
          Location : {location}
        </p>
        <p class="leading-loose text-gray-500 dark:text-black-300">
          Year of Establishment : {year}
        </p>

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
    </>
  );
};

export default AdminCard;
