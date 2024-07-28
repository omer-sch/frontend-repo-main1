import React, { useEffect, useState } from 'react';
//import { PostData } from '../../services/posts-service';
import { Comment } from '../../services/comment-service';
import { useParams, useLocation } from "react-router-dom";
//import { getPostById } from '../../services/posts-service';
import './PostComment.css';


interface PostCommentProps {
    // Remove the "location" prop
}

interface LocationState {
    comments: Comment[]; // Define the shape of the comments property
}

const PostComment: React.FC<PostCommentProps> = () => {
    const { postId } = useParams<{ postId: string }>();
    const location = useLocation<LocationState>(); // Provide type annotation for useLocation hook

    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
              // const { req } = getAllComments();
              // const response = await req;
              
              //Retrieve comments from location state
            const postComments: Comment[] = location.state ? location.state.comments : [];
            //  Merge the arrays using spread syntax
            // const mergedComments = [...postComments, ...response.data];
              
              setComments(postComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, []);

    return (
      <div>
          <h2>Comments for Post {postId}</h2>
        <div className="comments-container">
          {comments.length === 0 ? (
            <p>No comments available.</p>
          ) : (
            <ul className="comments-list">
              {comments.map((comment: Comment) => (
                <li className="comment" key={comment.id}>
                  <div className="author">
                    <img src={comment.owner.imgUrl} alt="Profile" />
                    <span>{comment.owner.name}</span>
                    <span>:</span>

                  </div>
                  <p className="time">{new Date(comment.createdAt).toLocaleString()}</p>
                  <p className="content">{comment.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
    
};

export default PostComment;

// import React, { useEffect, useState } from 'react';
// import { PostData } from '../../services/posts-service';
// import { Comment } from '../../services/comment-service';
// import { useParams } from "react-router-dom";
// import {getPostById} from '../../services/posts-service';
// import './PostComment.css';
// interface PostCommentProps {
//     location: {
//         state: {
//             post: PostData;
//         };
//     };
// }

// const PostComment: React.FC<PostCommentProps> = () => {
// //    const { post } = location.state;
// const { postId } = useParams<{ postId: string }>();

//     const [comments, setComments] = useState<PostData | null>(null); // Initializing comments as an empty array
//     const fetchPost = async () => {
//         try {
//           if (postId !== undefined) {
//             const comments = await getPostById(postId);
//             setComments(comments);
//           }
//         } catch (error) {
//           console.error("Error fetching comments:", error);
//         }
//       };
//       useEffect(() => {
//         fetchPost();
//       }, []);

//     return (
//     <div className="container">
//             <h2>Comments for Post {postId}</h2>
//             {comments === null ? (
//                 <p>Loading comments...</p>
//             ) : (
//                 <ul className="comments-list">
//                 {comments.comments.map((comment: Comment) => (
//                         <li className="comment" key={comment.id}>
//                         <div className="author">
//                             <span>{comment.owner.name}</span>
//                             <img src={comment.owner.imgUrl} alt="Profile" />
//                             </div>
//                     <p className="content">{comment.content}</p>
//                     </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };


// export default PostComment;


// import React from 'react';
// import { PostData } from './Posting/Post'

// interface PostCommentProps {
//     post: PostData;
// }
// const PostComment: React.FC<PostCommentProps> = ({ post }) => {


//     return (
//         <><div>
//             <h2>Comments for Post {post._id} </h2>
            
//         </div>
//         <div>
        
//         </div></>
//     );
    
// }
// export default PostComment;

// import  { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getCommentsByPostId } from '../services/comment-service'; // Import your comment service

// interface RouteParams {
//   postId: string; // Define the type of postId
// }

// interface Comment {
//   _id: string;
//   content: string;
//   // Add other properties of the comment object here
// }
// function PostComments() {
//     const { postId } = useParams<RouteParams>(); // Use the defined type for useParams
//     const [comments, setComments] = useState<Comment[]>([]); // Specify the type of comments
  
//     console.log('PostComments component rendered with postId:', postId); // Add this log
  
//     useEffect(() => {
//       async function fetchComments() {
//         try {
//           const fetchedComments = await getCommentsByPostId(postId);
//           console.log('Fetched Comments:', fetchedComments);
//           setComments(fetchedComments);
//         } catch (error) {
//           console.error('Error fetching comments:', error);
//         }
//       }
//       fetchComments();
//     }, [postId]);
  
//     return (
//       <div>
//         <h2>Comments for Post {postId}</h2>
//         <ul>
//           {comments.map(comment => (
//             <li key={comment._id}>
//               <li key= {comment.content}>
//                   </li>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
  

// function PostComments() {
//   const { postId } = useParams<RouteParams>(); // Use the defined type for useParams
//   const [comments, setComments] = useState<Comment[]>([]); // Specify the type of comments

//   useEffect(() => {
//     // Fetch comments for the specific postId
//     async function fetchComments() {
//       try {
//         const fetchedComments = await getCommentsByPostId(postId);
//         console.log('Fetched Comments:', fetchedComments);
//         setComments(fetchedComments);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     }
//     fetchComments();
//   }, [postId]);

//   return (
//     <div>
//       <h2>Comments for Post {postId}</h2>
//       <ul>
//         {comments.map(comment => (
//           <li key={comment._id}>
//             <li key= {comment.content}>
//                 </li>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

//export default PostComments;



// import React, { useState, useEffect } from 'react';
// import { getCommentsByPostId } from '../services/comment-service';

// interface Comment {
//         content: string;
//         postId: string;
// }

// const PostComment: React.FC<Comment> = ({ postId }) => {
//     const [comments, setComments] = useState<Comment[]>([]);

//     useEffect(() => {
//         const fetchComments = async () => {
//             try {
//                 const commentsData = await getCommentsByPostId(postId);
//                 setComments(commentsData);
//             } catch (error) {
//                 console.error('Error fetching comments:', error);
//             }
//         };

//         fetchComments();
//     }, [postId]);

//     return (
//         <div>
//             <h3>Comments</h3>
//             <ul>
//                 {comments.map((comment, index) => (
//                     <li key={index}>{comment.content}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default PostComment;
