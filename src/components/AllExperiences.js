import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ExperienceCard from './ExperienceCard';
import './css/AllExperiences.css';
import Footer from "./Footer";

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

    // const handleComment = (id, comment) => {
    //     console.log(id);
    //     console.log(comment);
    //     axios.post(`/api/addcomments/${id}`, {
    //         comment: comment,
    //     }).then((res) => {
    //         console.log("andr hu");
    //         const updatedExperiences = experiences.map((experience) => {
    //             if (experience._id === id) {
    //                 return { ...experience, comments: [...experience.comments, res.data] };
    //             } else {
    //                 return experience;
    //             }
    //         });
    //         setExperiences(updatedExperiences);
    //     });
    // };

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
    };
    const handleClose = () => {
        setActiveForm(false);
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


                    {activeForm === false ? (
  <div style={{ display: "flex", alignItems: "center" }}>
    <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem", color: "#000000" }}>
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
    >
      Add Experience
    </button>
  </div>
) : (
  <div style={{ display: "flex", alignItems: "center" }}>
    <button
      className="closeButton"
      style={{
        padding: "10px 20px",
        backgroundColor: "#DC3545",
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

                    

            


                    {activeForm === true ? (
                        <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
                            <label htmlFor="companyName" >Company Name:</label>
                            <input type="text" id="companyName" name="companyName" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                            <label htmlFor="experience" >Your Experience:</label>
                            <textarea id="experience" name="experience" required ></textarea>
                            <button type="submit" >Submit</button>
                        </form>) : (<></>)}

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
  Experiences
</h1>

  <br />
  
  <div className='Filterbox'> 
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
    <div style={{ border: "1px solid #e2e8f0", borderRadius: "0.5rem", boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", marginBottom: "1rem", padding: "1rem", backgroundColor: "#ffffff" }}>
      <ExperienceCard
        key={experience._id}
        companyName={experience.companyName}
        experience={experience.experience}
        likes={experience.likes}
        dislikes={experience.dislikes}
        comments={experience.comments}
        handleLike={() => handleLike(experience._id)}
        handleDislike={() => handleDislike(experience._id)}
        fetchComments={() => fetchComments(experience._id)}
        name={experience.name}
      />
    </div>
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
