// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {useParams} from "react-router-dom";
// import CommentCard from './CommentCard';

// async function getEmail() {
//   const token = localStorage.getItem('usersdatatoken');
//   const response = await fetch('/api/me', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await response.json();
//   return data.email; 
// }

// function ExpComments() {

//   const { exp_id } = useParams();

//   const [commentText, setCommentText] = useState('');
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     axios.get(`/api/getcomments/${exp_id}`).then((res) => {
//       setComments(res.data);
//     });
//   }, [exp_id]);

//   const handleSubmitComment = async (e) => {
//     e.preventDefault();
//     const email = await getEmail();
//     axios.post(`/api/addcomments/${exp_id}`, {
//       comment: commentText,
//       email: email,
//     }).then((res) => {
//       setComments([...comments, res.data]);
//       setCommentText('');
//     });
//   };

//   return (
//     // <div>
//     //   <form onSubmit={handleSubmitComment}>
//     //     <label htmlFor="commentText">Add a comment:</label>
//     //     <input 
//     //       type="text" 
//     //       id="commentText" 
//     //       name="commentText" 
//     //       value={commentText}
//     //       onChange={(e) => setCommentText(e.target.value)}
//     //       required 
//     //     />
//     //     <button type="submit">Add comment</button>
//     //   </form>
//     //   <div>
//     //     <h3>Comments:</h3>
//     //     {comments.map(comment => (
//     //     <CommentCard
//     //       key={comment._id}
//     //       email={comment.user}
//     //       text={comment.comment}
//     //       tym={new Date(comment.createdAt).toLocaleString()}
//     //     />
//     //   ))}
//     //   </div>
//     // </div>
//     <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "4px" }}>
//   <h2 style={{ marginBottom: "20px", fontWeight: "bold", fontSize: "24px" }}>Leave a Comment</h2>
//   <form onSubmit={handleSubmitComment}>
//     <div style={{ marginBottom: "20px" }}>
//       <label htmlFor="commentText" style={{ display: "block", marginBottom: "10px", fontSize: "18px", fontWeight: "bold" }}>Comment:</label>
//       <textarea 
//         id="commentText" 
//         name="commentText" 
//         value={commentText}
//         onChange={(e) => setCommentText(e.target.value)}
//         required 
//         style={{ padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px", width: "100%", minHeight: "100px" }}>
//       </textarea>
//     </div>
//     <div style={{ textAlign: "right" }}>
//       <button type="submit" style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", fontSize: "18px", cursor: "pointer" }}>Submit</button>
//     </div>
//   </form>
//   <hr style={{ margin: "40px 0px" }} />
//   <div>
//     <h2 style={{ marginBottom: "20px", fontWeight: "bold", fontSize: "24px" }}>Comments</h2>
//     {comments.map(comment => (
//       <CommentCard
//         key={comment._id}
//         email={comment.user}
//         text={comment.comment}
//         tym={new Date(comment.createdAt).toLocaleString()}
//       />
//     ))}
//   </div>
// </div>

//   );
// }

// export default ExpComments;
