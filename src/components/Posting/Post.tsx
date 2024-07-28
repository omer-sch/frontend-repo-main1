import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Post.css';
import { PostData } from '../../services/posts-service';
import {  UpdateCommentCount, CommentCount, getAllComments } from '../../services/comment-service';
import apiClient from '../../services/api-client';

interface PostProps {
    post: PostData;
    onRemoveCbk: () => void;
}

interface Comment {
    content: string;
    postId: string;
    owner: {
        name: string;
        imgUrl: string;
    };
    createdAt: Date;
}

const Post: React.FC<PostProps> = ({ post }) => {
    const history = useHistory();
    const [commentCount, setCommentCount] = useState<number>(0);
    const commentContent = useRef<HTMLTextAreaElement>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    // useEffect(() => {
    //     // Load comments count from local storage
    //     const storedCommentCount = localStorage.getItem(`commentCount_${post._id}`);
    //     if (storedCommentCount) {
    //         setCommentCount(parseInt(storedCommentCount));
    //     }
    //     const fetchCommentCount = async () => {
    //         try {
    //             const count = await CommentCount(post._id ?? '');
    //             setCommentCount(count);

    //             // Update local storage with the latest count
    //             localStorage.setItem(`commentCount_${post._id}`, String(count));
    //         } catch (error) {
    //             console.error("Error fetching comment count:", error);
    //         }
    //     };

    //     fetchCommentCount();
    // }, [post._id]);
    useEffect(() => {
        const storedCommentCount = localStorage.getItem(`commentCount_${post._id}`);
        if (storedCommentCount !== null) {
            setCommentCount(parseInt(storedCommentCount));
        } else {
            CommentCount;
        }
    }, [post._id]);

    const handleShowComments = async () => {
        if (!post._id) {
            console.error('Post ID is undefined');
            return;
        }
        try {
            const postId = post._id;
            const comments: Comment[] = JSON.parse(localStorage.getItem('comments') || '[]');
            const postComments = comments.filter(comment => comment.postId === postId);
          //  setComments(postComments);
            //await getAllComments();
           // const res = await getAllComments();
            const { req } = getAllComments();
              const response = await req;
            const mergedComments = [...response.data, ...postComments];
              
              setComments(mergedComments);
            history.push(`/userpost/${postId}`, { comments: postComments });
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    };

    // const handleAddComment = async () => {
    //     if (commentContent.current?.value.trim() !== "") {
    //         try {
    //             const user = JSON.parse(localStorage.getItem('user') || '{}');
    //             const comment = {
    //                 content: commentContent.current!.value.trim(),
    //                 postId: post._id!,
    //                 owner: {
    //                     name: user.name,
    //                     imgUrl: user.imgUrl,
    //                 },
    //                 createdAt: new Date(),
    //             };
    //             const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    //             const updatedComments = [...storedComments, comment];
    //             localStorage.setItem('comments', JSON.stringify(updatedComments));
    //             commentContent.current!.value = "";

    //             const updatedCount = commentCount + 1;
    //             setCommentCount(updatedCount);
    //             localStorage.setItem(`commentCount_${post._id}`, updatedCount.toString());

    //             await UpdateCommentCount(post._id!, updatedCount);
    //             await apiClient.put(`/comments/count/${post._id}`, { count: updatedCount });

    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    // };
    const handleAddComment = async () => {
        if (commentContent.current?.value.trim() !== "") {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                const comment = {
                    content: commentContent.current!.value.trim(),
                    postId: post._id!,
                    owner: {
                        name: user.name,
                        imgUrl: user.imgUrl,
                    },
                    createdAt: new Date(),
                };
                const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
                const updatedComments = [...storedComments, comment];
                localStorage.setItem('comments', JSON.stringify(updatedComments));
                commentContent.current!.value = "";
    
                const updatedCount = commentCount + 1;
                setCommentCount(updatedCount);
                localStorage.setItem(`commentCount_${post._id}`, updatedCount.toString());
    
                // Update the comment count in the database
                await UpdateCommentCount(post._id!, updatedCount);
                await apiClient.put(`/comments/count/${post._id}`, { count: updatedCount });
    
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="post-container">
            <h1 className="post-title">{post.title}</h1>
            <p className="post-message">{post.message}</p>
            <img src={post.postImg} alt="Post" className="post-image" />
            <p className="comment-count">Comments: {commentCount}</p>
            <div className="comments-container"></div>
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <p>{comment.content || 'No content available'}</p>
                    <p>By: {comment.owner?.name || 'Anonymous'}</p>
                </div>
            ))}
            <div className="button-container">
                <textarea className="comment-input" ref={commentContent} placeholder="Write here your comment.." />
                <button type="button" className="btn btn-primary" onClick={handleAddComment}>Add Comment</button>
                <button type="button" className="btn btn-primary" onClick={handleShowComments}>Show All Comments</button>
            </div>
        </div>
    );
};

export default Post;


// import { useEffect, useRef, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import './Post.css';
// //import apiClient from '../../services/api-client';
// import { PostData } from '../../services/posts-service';
// import {   CommentCount,UpdateCommentCount } from '../../services/comment-service';
// import apiClient from '../../services/api-client';

// interface PostProps {
//     post: PostData;
//     onRemoveCbk: () => void;
// }
// interface Comment {
//     content: string;
//     postId: string;
//     owner: {
//         name: string;
//         imgUrl: string;
//     };
//     createdAt: Date;
// }
// const Post: React.FC<PostProps> = ({ post }) => {
//     const history = useHistory();
//     const [commentCount, setCommentCount] = useState<number>(0);
//     const commentContent = useRef<HTMLTextAreaElement>(null); 
//     const [comments, setComments] = useState<Comment[]>([]); // State to store comments

//     const handleShowComments = async () => {
//         if (!post._id) {
//             console.error('Post ID is undefined');
//             return;
//         }
//         try {
//             const postId = post._id;
//             const comments: Comment[] = JSON.parse(localStorage.getItem('comments') || '[]');
//             const postComments = comments.filter(comment => comment.postId === postId);
//             console.log('postComments:', postComments);
//             setComments(postComments); 
//             history.push(`/userpost/${postId}`, { comments: postComments });
//             // const postId = post._id;
//            // const commento = await getCommentsByPostId(postId);

//            // history.push(`/userpost/${postId}`);
//             // Do something with the fetched comments
//         } catch (error) {
//             console.error('Failed to fetch comments:', error);
//         }
//     };

//     const handleAddComment = async () => {
//         if (commentContent.current?.value.trim() !== "") {
//             try {                

//                 const user = JSON.parse(localStorage.getItem('user') || '{}'); // Retrieve user details from local storage
    
//                 const comment = {
//                     content: commentContent.current!.value.trim(),
//                     postId: post._id!,
//                     owner: {
//                         name: user.name,
//                         imgUrl: user.imgUrl,
//                     },
//                     createdAt: new Date(),
//                 };
    
//                 // Add the new comment to local storage
//                 const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
//                 const updatedComments = [...storedComments, comment];
//                 localStorage.setItem('comments', JSON.stringify(updatedComments));

//                 setCommentCount(prevCount => prevCount + 1);
    
//                 // Update the comment count in the backend
//                 const updatedCount = commentCount + 1;
//                 await UpdateCommentCount(post._id!, updatedCount);
//                 await apiClient.put(`/comments/count/${post._id}`, { count: updatedCount });
//                 commentContent.current!.value = "";

//                 console.log(CommentCount)
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     };

//     useEffect(() => {
//         const fetchCommentCount = async () => {
//             try {
//                 const storedCommentCount = localStorage.getItem(`commentCount_${post._id}`);
//                 if (storedCommentCount) {
//                     setCommentCount(parseInt(storedCommentCount));
//                 } else {
//                     const count = await CommentCount(post._id ?? '');
//                     setCommentCount(count);
//                     localStorage.setItem(`commentCount_${post._id}`, count.toString());
    
//                 }
//             } catch (error) {
//                 console.error('Error fetching comment count:', error);
//             }
//         };
//         fetchCommentCount();
//     }, [post._id]);

//     return (
//         <div className="post-container">
//             <h1 className="post-title">{post.title}</h1>
//             <p className="post-message">{post.message}</p>
//             <img src={post.postImg} alt="Post" className="post-image" />
//             <p className="comment-count">Comments: {commentCount}</p>
//             <div className="comments-container"></div>
//             {/* Render comments here */}
//             {comments.map((comment, index) => (
//                 <div key={index} className="comment">
//                     <p>{comment.content || 'No content available'}</p>
//                     <p>By: {comment.owner?.name || 'Anonymous'}</p>
//                 </div>
//             ))}

//             <div className="button-container">
//                 {/* Use textarea for comment input */}
//                 <textarea className="comment-input" ref={commentContent} placeholder="Write here your comment.." />
//                 <button type="button" className="btn btn-primary" onClick={handleAddComment}>Add Comment</button>
//                 <button type="button" className="btn btn-primary" onClick={handleShowComments}>Show All Comments</button>
//             </div>
//         </div>
//     );
// };

// export default Post;

