import apiClient, { CanceledError } from "./api-client"
import { Comment } from "./comment-service";
import { AxiosError } from "axios";
import  { refreshToken }  from "./api-client";

export interface PostDescription {
  _id?: string;
  title: string;
  message: string;
  postImg: string;
  owner? : string;
  comments?: [Comment];
  
}

export interface PostData extends PostDescription{
    title: string;
    message: string;
    _id?: string;
    owner: string
    postImg: string;
    comments: [Comment];
}

export { CanceledError }
 export const getAllPosts = () => {
    const abortController = new AbortController()
    const req = apiClient.get<PostData[]>('userpost', {signal: abortController.signal})
    return { req, abort: () => abortController.abort() }

}

 export const getPostById = (postId: string) => {
    return new Promise<PostData>((resolve, reject) => {
      apiClient
        .get(`/userpost/${postId}`)
        .then((response) => {
          const review = response.data as PostData;
          resolve(review);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

 
  export const getConnectedUserPosts = (userId:string) => {
    return new Promise<PostData[]>((resolve, reject) => {
        apiClient
            .get(`/userpost/userId/${userId}`)
            .then((response) => {
                const reviews = response.data as PostData[];
                resolve(reviews);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// export const createPost = (post: PostDescription) => {
//     return new Promise<void>((resolve, reject) => {
//       console.log("Creating post...", post);
//       apiClient
//         .post("/userpost", post)
//         // .then(() => {
//         //   resolve();
//         // })
//         .then(res => {
//           console.log(res);
//           resolve(res.data)
//         })
//         .catch((error) => {
//           console.log(error);
//           reject(error);
//         });
//     });
    
//   };
export const createPost = (post: PostDescription) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Creating post...", post);
    apiClient
      .post("/userpost", post)
      .then(res => {
        console.log("Post created:", res.data);
        resolve(); // Resolve the promise after successfully creating the post
      })
      .catch((error: AxiosError) => {
        console.error("Error creating post:", error);
        if (error.response && error.response.status === 401) {
          // Unauthorized error, try refreshing the access token
            refreshToken()
            .then(() => {
              // Retry creating the post after refreshing the token
              return createPost(post);
            })
            .then(() => {
              // Post creation succeeded after token refresh
              resolve();
            })
            .catch(refreshError => {
              // Token refresh failed
              reject(refreshError);
            });
        } else {
          // Other types of errors
          reject(error);
        }
      });
  });
};
export const createPost2 = (post: PostDescription) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Creating post...", post);

    const accessToken = localStorage.getItem('ACCESS_TOKEN_KEY');

    if (!accessToken) {
      reject(new Error('Access token not found'));
      return;
    }

    const headers = {
      Authorization: `JWT ${accessToken}`,
    };

    apiClient
      .post("/userpost", post, { headers })
      .then(() => {
        console.log("Post created successfully");
        resolve();
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        reject(error);
      });
  });
};

  export const editpost = (postId: string, post: PostDescription) => {
    return new Promise<void>((resolve, reject) => {
      console.log("Editing...", postId, post);
      apiClient
        .put(`/userpost/${postId}`, post)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };
  
  export const deletePost = (postId: string) => {
    return new Promise<void>((resolve, reject) => {
      console.log("Deleting...", postId);
      apiClient
        .delete(`/userpost/${postId}`)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

export default { getAllPosts, createPost }