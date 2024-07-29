import apiClient, { CanceledError } from "./api-client";
import { refreshToken } from "./api-client";
export { CanceledError };
export const getAllPosts = () => {
    const abortController = new AbortController();
    const req = apiClient.get('userpost', { signal: abortController.signal });
    return { req, abort: () => abortController.abort() };
};
export const getPostById = (postId) => {
    return new Promise((resolve, reject) => {
        apiClient
            .get(`/userpost/${postId}`)
            .then((response) => {
            const review = response.data;
            resolve(review);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
export const getConnectedUserPosts = (userId) => {
    return new Promise((resolve, reject) => {
        apiClient
            .get(`/userpost/userId/${userId}`)
            .then((response) => {
            const reviews = response.data;
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
export const createPost = (post) => {
    return new Promise((resolve, reject) => {
        console.log("Creating post...", post);
        apiClient
            .post("/userpost", post)
            .then(res => {
            console.log("Post created:", res.data);
            resolve(); // Resolve the promise after successfully creating the post
        })
            .catch((error) => {
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
            }
            else {
                // Other types of errors
                reject(error);
            }
        });
    });
};
export const createPost2 = (post) => {
    return new Promise((resolve, reject) => {
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
export const editpost = (postId, post) => {
    return new Promise((resolve, reject) => {
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
export const deletePost = (postId) => {
    return new Promise((resolve, reject) => {
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
export default { getAllPosts, createPost };
