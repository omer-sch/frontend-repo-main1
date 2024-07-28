import React, { useState } from 'react';
import { PostDescription } from '../../services/posts-service';
import './AddPost.css'; // Import the CSS file

const AddPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [postImg, setPostImg] = useState<File | string>('');
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

  const [user] = useState(storedUser);
  const [imgUrl, setImgUrl] = useState(user.imgUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    console.log(imgUrl)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData: PostDescription = {
      title,
      message,
      postImg: typeof postImg === 'string' ? postImg : URL.createObjectURL(postImg)
    };

    try {
      savePostToLocalStorage(postData);

  //    await createPost(postData);

      setTitle('');
      setMessage('');
      setPostImg('');
      window.location.href = '/';
      
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const savePostToLocalStorage = (postData: PostDescription) => {
    const existingPostsJSON = localStorage.getItem('posts');
    const existingPosts: PostDescription[] = existingPostsJSON ? JSON.parse(existingPostsJSON) : [];
    const userId = localStorage.getItem('userId');
    if (userId) {
        postData._id = userId;
    } else {
        postData._id = Math.random().toString(36).substr(2, 9);
    }
    const updatedPosts = [...existingPosts, postData];
    
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="add-post-container">
      <h2>Add New Post</h2>
      <form className="add-post-form" onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div>
          <input type="file" onChange={handleImageChange} />
          {typeof postImg === 'string' ? (
            <img src={postImg} alt="Post Preview" className="post-img-preview" />
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPost;


// import React, { useState } from 'react';
// import { createPost, PostDescription } from '../../services/posts-service';
// import './AddPost.css'; // Import the CSS file
// const AddPost: React.FC = () => {
//   const [title, setTitle] = useState('');
//   const [message, setMessage] = useState('');
//   const [postImg, setPostImg] = useState('');


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const userId = localStorage.getItem('userId');
  //   if (!userId) {
  //     console.error('User ID not found in local storage');
  //     return;
  //   }
   
  //   try {
  //     const postData: PostDescription = {
  //       title,
  //       message,
  //       postImg,
  //       owner: userId, // Assuming you want to set the owner as the logged-in user
  //       comments: [{
  //         postId: '123',
  //         content: 'This is a sample comment',
  //         owner: {
  //           name: 'Anonymous',
  //           imgUrl: 'https://via.placeholder.com/150',
  //         },
  //         createdAt: new Date(),
  //       }], // You can initialize comments as an empty array
  //       // You can initialize comments as an empty array
  //     };
  //     await createPost(postData);
  //     window.location.href = '/';
  //   } catch (error) {
  //     console.error('Error adding post:', error);
  //   }
  // };

//   return (
//     <div className="add-post-container">
//       <h2>Add New Post</h2>
//       <form className="add-post-form" onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//         </div>
//         <div>
//           <label>Message:</label>
//           <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
//         </div>
//         <div>
//           <label>Post Image:</label>
//           <input type="file" value={postImg} onChange={(e) => setPostImg(e.target.value)} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddPost;
