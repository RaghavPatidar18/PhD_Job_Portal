import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ExperienceCard from './ExperienceCard';
import './css/AllExperiences.css'

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

    const history = useNavigate();

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
        // <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
            // {activeForm === false ? (<><button className="addNewButton" onClick={handleAdd}>Add</button></>) : (<>
            //     <button className="closeButton" onClick={handleClose}>Close</button>
            // </>)}

            // {activeForm === true ? (
            //     <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
            //         <label htmlFor="companyName" style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.2rem", fontWeight: "bold" }}>Company Name:</label>
            //         <input type="text" id="companyName" name="companyName" required style={{ padding: "0.5rem", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "1rem", width: "100%" }} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            //         <label htmlFor="experience" style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.2rem", fontWeight: "bold" }}>Your Experience:</label>
            //         <textarea id="experience" name="experience" required style={{ padding: "0.5rem", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "1rem", width: "100%", minHeight: "100px" }} value={experience} onChange={(e) => setExperience(e.target.value)}></textarea>
            //         <button type="submit" style={{ padding: "0.5rem 1rem", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", fontSize: "1.2rem", cursor: "pointer" }}>Submit</button>
            //     </form>) : (<></>)}

            // <div>
            //     <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem" }}>Experiences</h1>
            //     {experiences.map((experience) => (
            //         <ExperienceCard
            //             key={experience._id}
            //             companyName={experience.companyName}
            //             experience={experience.experience}
            //             likes={experience.likes}
            //             dislikes={experience.dislikes}
            //             comments={experience.comments}
            //             handleLike={() => handleLike(experience._id)}
            //             handleDislike={() => handleDislike(experience._id)}
            //             fetchComments={() => fetchComments(experience._id)}
            //             name={experience.name}
            //         />
            //     ))}
            // </div>
        // </div>

<section class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-10 mx-auto">
        <h1 class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
            What our <span class="text-blue-500 ">clients</span> say
        </h1>

        <p class="max-w-2xl mx-auto mt-6 text-center text-gray-500 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt ex placeat modi magni quia error
            alias, adipisci rem similique, at omnis eligendi optio eos harum.
        </p>

        {activeForm === false ? (<><button className="addNewButton" onClick={handleAdd}>Add</button></>) : (<>
                <button className="closeButton" onClick={handleClose}>Close</button>
            </>)}

            {activeForm === true ? (
                <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
                    <label htmlFor="companyName" style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.2rem", fontWeight: "bold" }}>Company Name:</label>
                    <input type="text" id="companyName" name="companyName" required style={{ padding: "0.5rem", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "1rem", width: "100%" }} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    <label htmlFor="experience" style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.2rem", fontWeight: "bold" }}>Your Experience:</label>
                    <textarea id="experience" name="experience" required style={{ padding: "0.5rem", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "1rem", width: "100%", minHeight: "100px" }} value={experience} onChange={(e) => setExperience(e.target.value)}></textarea>
                    <button type="submit" style={{ padding: "0.5rem 1rem", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", fontSize: "1.2rem", cursor: "pointer" }}>Submit</button>
                </form>) : (<></>)}

        <div class="grid grid-cols-1 gap-8 mx-auto mt-8 lg:grid-cols-2 xl:mt-10 max-w-7xl">

        <div>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem" }}>Experiences</h1>
                {experiences.map((experience) => (
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
                ))}
            </div>
            
        </div>
    </div>
</section>

    );
};

export default AllExperiences;
