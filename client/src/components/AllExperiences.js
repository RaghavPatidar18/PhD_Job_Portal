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
  const response = await fetch('/api/mename', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("insidde function of gate name");
  const data = await response.json();
  return data.name
}

const AllExperiences = () => {
  const [activeForm, setActiveForm] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [experience, setExperience] = useState('');
  const [filterByCompanyName, setFilterByCompanyName] = useState('');
  const [showImage, setShowImage] = useState(true);

  const history = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExperiences((prevExperiences) => ({
      ...prevExperiences,
      [name]: value,
    }));
  };

  const handleAddExperience = () => {
    setExperiences((prevExperiences) => [...prevExperiences, {}]);
  };

  const handleRemoveExperience = (index) => {
    setExperiences((prevExperiences) =>
      prevExperiences.filter((exp, i) => i !== index)
    );
  };

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
    const userName = await getName();
    console.log(userName);
    axios.post('/api/createExperiences', {
      name: userName,
      companyName: companyName,
      experience: experience,
    }).then((res) => {
      setExperiences([...experiences, res.data]);
      setCompanyName('');
      setExperience('');
    });
  };

  const handleLike = (id) => {
    axios.put(`/api/experiences/${id}`, {
      likes: experiences.find((experience) => experience._id === id).likes + 1,
    }).then((res) => {
      const updatedExperiences = experiences.map((experience) => {
        if (experience._id === id) {
          return { ...experience, likes: res.data.likes };
        } else {
          return experience;
        }
      });
      setExperiences(updatedExperiences);
    });
  };

  const handleDislike = (id) => {
    axios.put(`/api/experiences/${id}`, {
      dislikes: experiences.find((experience) => experience._id === id).dislikes + 1,
    }).then((res) => {
      const updatedExperiences = experiences.map((experience) => {
        if (experience._id === id) {
          return { ...experience, dislikes: res.data.dislikes };
        } else {
          return experience;
        }
      });
      setExperiences(updatedExperiences);
    });
  };

  const fetchComments = async (id) => {
    history(`/allcomment/${id}`);
  };
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt ex placeat modi magni quia error
            alias, adipisci rem similique, at omnis eligendi optio eos harum.
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
              {/* <img
          src={frame}
          alt="My Image"
          style={{ height: "20px", marginRight: "0px", zIndex: 1 }}
        /> */}
              <input
                type="text"
                name="filterByCompanyName"
                value={filterByCompanyName}
                onChange={handleFilterByCompanyName}
                placeholder="Filter by Company Name"
              />
              <button onClick={handleSearch}>Search</button>
            </div>

            {experiences.map((experience) => (
              <>
                <div className="grid grid-cols-4 gap-4" style={{ marginBottom: "1rem", height: "600px" }}>
                  <div className="col-span-1 bg-blue-400 h-400 flex flex-col items-center justify-start">
                    <h1 style={{ fontFamily: 'Lobster', fontStyle: 'normal', fontWeight: 700, fontSize: '100px', lineHeight: '147px', color: 'white' }}>
                      "
                    </h1>


                  </div>

                  <div style={{ height: "300px", width: "400%", marginLeft: "-200px", marginTop: "100px", backgroundColor: "white", borderRadius: "0.5rem" }}>
                    <ExperienceCard
                      // key={experience._id}
                      companyName={experience.companyName}
                      experience={experience.experience}
                      name={experience.name}
                    />


                  </div>


                  <div className="col-span-3"></div>

                </div>

                <hr
                  style={{
                    background: 'black',
                    color: 'black',
                    borderColor: 'black',
                    height: '3px',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    marginTop: "-100px",
                    marginLeft: "300px"
                  }}
                />


              </>
            ))}


          </div>



        </div>
        {/* </div> */}
      </section>

      <Footer />

    </>

  );
};

export default AllExperiences;
