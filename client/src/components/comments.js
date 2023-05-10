// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from "react-router-dom";
// import CommentCard from './CommentCard';


// async function getId() {
//   const token = localStorage.getItem('usersdatatoken');
//   // console.log(token);
//   const response = await fetch('/api/meid', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await response.json();
//   console.log(data);
//   return data;
// }
 
// function CommentSection() {

//   const { jobPostingId } = useParams();
//   //   console.log("starting ka id");
//   //   console.log(jobPostingId);
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     async function fetchComments() {
//       const response = await axios.get(`/api/getcomments?jobPostingId=${jobPostingId}`);
//       setComments(response.data);
//     }

//     fetchComments();
//   }, [jobPostingId]);

//   async function handleSubmitComment(e) {
//     e.preventDefault();

//     const form = e.target;
//     const text = form.elements.commentText.value;
//     const user = await getId(); // Replace with the current user's ID
//     const jobPosting = jobPostingId;

//     await axios.post('/api/comments', { text, user, jobPosting })
//       .then(res => {
//         setComments([...comments, res.data]); // add new comment to state
//         form.reset();
//       })
//       .catch(err => console.log(err));
//   }

//   return (
//     <div style={{ marginTop: "30px" }}>
//       <form onSubmit={handleSubmitComment} style={{ marginBottom: "30px" }}>
//         <label htmlFor="commentText" style={{ display: "block", marginBottom: "10px", fontSize: "16px", fontWeight: "bold" }}>Leave a Comment:</label>
//         <textarea id="commentText" name="commentText" required style={{ padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "10px", width: "100%", minHeight: "100px" }}></textarea>
//         <button type="submit" style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer" }}>Submit</button>
//       </form>
//       <div style={{ borderTop: "1px solid #ccc", paddingTop: "20px" }}>
//         <h2 id="comments">Comments</h2>
//         {comments.map(comment => (
//           <CommentCard
//             key={comment._id}
//             email={comment.user.email}
//             text={comment.text}
//             tym={new Date(comment.createdAt).toLocaleString()}
//           />
//         ))}
//       </div>
//     </div>

//     // <div >
//     //   <h2 id="comments">Comments</h2>
//     //   <ul style={{ listStyle: "none", padding: 0, height: "500px", overflow: "auto" }}>
//     //     {comments.map(comment => (
//     //       <CommentCard
//     //         key={comment._id}
//     //         email={comment.user.email}
//     //         text={comment.text}
//     //         tym={new Date(comment.createdAt).toLocaleString()}
//     //       />
//     //     ))}
//     //   </ul>
//     //   <form onSubmit={handleSubmitComment} style={{ marginTop: "30px" }}>
//     //     <label htmlFor="commentText" style={{ display: "block", marginBottom: "10px", fontSize: "16px", fontWeight: "bold" }}>Add a comment:</label>
//     //     <input type="text" id="commentText" name="commentText" required style={{ padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "10px", width: "100%" }} />
//     //     <button type="submit" style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer" }}>Add comment</button>
//     //   </form>
//     //   </div>

//   );
// }

// export default CommentSection;
