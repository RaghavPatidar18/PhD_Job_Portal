import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ExperienceCard from './ExperienceCard';
import './css/AllExperiences.css';
import Footer from "./Footer";
import exper from './exper.png';
import frame from './Frame.png';

async function getName() {
  const token = localStorage.getItem('usersdatatoken');
  //   console.log(token);

  return axios.get('/api/mename', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    // console.log(response.data.name); // handle the response data
    // console.log("insidde function of gate name");
    // console.log(response);
    return response.data.name;
    
  }).catch((error) => {
    console.log(error); // handle the error
  });
}

async function getEmail() {
  const token = localStorage.getItem('usersdatatoken');
  return axios.get('/api/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log(response.data.email); // handle the response data
    console.log("insidde function of gate email");
    return response.data.email;
  }).catch((error) => {
    console.log(error); // handle the error
  });
}

const AllExperiences = () => {
  const [activeForm, setActiveForm] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [experience, setExperience] = useState('');
  const [filterByCompanyName, setFilterByCompanyName] = useState('');
  const [showImage, setShowImage] = useState(true);


  const handleFilterByCompanyName = (event) => {
    setFilterByCompanyName(event.target.value);
  };

  const handleSearch = () => {
    // Filter experiences by company name
    const filteredExperiences = experiences.filter(
      (exp) =>
        exp.companyName &&
        exp.companyName.toLowerCase().includes(filterByCompanyName.toLowerCase())
    );
    setExperiences(filteredExperiences);
  };

  useEffect(() => {
    axios.get('/api/getexperiences').then((res) => {
      setExperiences(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    setShowImage(false);
    e.preventDefault();
    let userName = await getName();
    let userEmail = await getEmail();
    // console.log(userName);
    // console.log(userEmail);
    axios.post('/api/createExperiences', {
      email: userEmail,
      name: userName,
      companyName: companyName,
      experience: experience,
    }).then((res) => {
      setExperiences([...experiences, res.data]);
      setCompanyName('');
      setExperience('');
    });
  };

  // const handleLike = (id) => {
  //   axios.put(`/api/experiences/${id}`, {
  //     likes: experiences.find((experience) => experience._id === id).likes + 1,
  //   }).then((res) => {
  //     const updatedExperiences = experiences.map((experience) => {
  //       if (experience._id === id) {
  //         return { ...experience, likes: res.data.likes };
  //       } else {
  //         return experience;
  //       }
  //     });
  //     setExperiences(updatedExperiences);
  //   });
  // };

  // const handleDislike = (id) => {
  //   axios.put(`/api/experiences/${id}`, {
  //     dislikes: experiences.find((experience) => experience._id === id).dislikes + 1,
  //   }).then((res) => {
  //     const updatedExperiences = experiences.map((experience) => {
  //       if (experience._id === id) {
  //         return { ...experience, dislikes: res.data.dislikes };
  //       } else {
  //         return experience;
  //       }
  //     });
  //     setExperiences(updatedExperiences);
  //   });
  // };

  // const fetchComments = async (id) => {
  //   history(`/allcomment/${id}`);
  // };

  const handleAdd = () => {
    setActiveForm(true);
    setShowImage(false);
  };
  const handleClose = () => {
    setActiveForm(false);
    setShowImage(true);
  };


  return (
    <>



      <section class="bg-white dark:bg-gray-900">
        <div class="container px-6 py-10 mx-auto">
          <h1 class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
            What our <span class="text-blue-500 ">clients</span> say
          </h1>

          <p class="max-w-2xl mx-auto mt-6 text-center text-gray-500 dark:text-gray-300">
          "We'd love to hear about your experience on our website! Please take a moment to share your thoughts and let others know what you love about our site. Did you find the information you were looking for? Was the site easy to navigate? Your feedback will help us continue to improve and provide the best possible user experience."
          </p>



          <br></br>

          <div className='aassgg'>

            {showImage && (
              <img
                src={exper}
                alt="My Image"
                style={{ height: "200px", marginRight: "0px", zIndex: 1 }}
              />
            )}


            {activeForm === false ? (
              <div className='addexp' style={{
                display: "flex",
                alignItems: "center",
                background: "#FBF9F9",
                padding: "50px 150px",
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "10px",
                marginLeft: "-80px",
                zIndex: 0
              }}>
                <p style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  color: "#000000"
                }}>
                  Do you have any experience?
                </p>
                <button
                  className="bb"
                  style={{
                    marginLeft: "1rem",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleAdd}
                  hover={{
                    backgroundColor: "#0069d9",
                    color: "#ffffff",
                  }}
                >
                  Add Experience
                </button>
              </div>

            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  className="closeB"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#ff4d4f",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleClose}
                >
                  Close
                </button>

              </div>
            )}


          </div>




          <div className='exper'>
            {activeForm === true ? (
              <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
                <label htmlFor="companyName" style={{ display: "inline-block", marginRight: "1rem" }}>Company Name:</label>
                <input type="text" id="companyName" name="companyName" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ display: "inline-block", marginRight: "1rem" }} />
                <label htmlFor="experience" style={{ display: "inline-block", marginRight: "1rem" }}>Your Experience:</label>
                <textarea id="experience" name="experience" required value={experience} onChange={(e) => setExperience(e.target.value)} style={{ display: "inline-block", marginRight: "1rem", marginBottom: "-20px" }}></textarea>
                <button type="submit" >Submit</button>
              </form>
            ) : (<></>)}
          </div>


          {/* <div class="grid grid-cols-1 gap-8 mx-auto mt-8 lg:grid-cols-2 xl:mt-10 max-w-7xl" style={{ width: "80%", margin: "0 auto" }}> */}
          <hr style={{
            border: "none", // Remove default border
            height: "1px", // Set height to 1px
            background: "#000000", // Custom background color, e.g., black
            margin: "2rem 0" // Set margin for spacing, e.g., 2rem top and bottom
          }} />


          <div class="max-w-screen-xl mx-auto">
            <h1 style={{
              fontSize: "2rem", // Increased font size to 3rem
              fontWeight: "bold",
              color: "#000000", // Custom color, e.g., black
              fontFamily: "Arial, sans-serif", // Professional font, e.g., Arial
              textTransform: "uppercase", // Optional: uppercase text
              marginTop: "2rem"
              //   marginBottom: "2rem" 
            }}>

              <h1>
                <span className="client">Clients </span>{''}
                <span className="exper">Experiences </span>{''}
              </h1>
            </h1>

            <br />

            <div className='Filterbox' style={{
              background: "#FFFFFF",
              boxShadow: "0px 1px 22px 1px rgba(69, 64, 219, 0.04)",
              borderRadius: "20px"
            }}>

              <input
                type="text"
                name="filterByCompanyName"
                value={filterByCompanyName}
                onChange={handleFilterByCompanyName}
                placeholder="Filter by Company Name"
              />
              <button onClick={handleSearch}>Search</button>
            </div>


          </div>



        </div>
        {/* </div> */}
      </section>

      <div>
        {experiences.map((experience) => (
          <>

            <div >
              <ExperienceCard
                // key={experience._id}
                companyName={experience.companyName}
                experience={experience.experience}
                name={experience.name}
                date={experience.timestamps}
                email={experience.email}
              />
            </div>
          </>
        ))}
      </div>

      <Footer />

    </>

  );
};

export default AllExperiences;
