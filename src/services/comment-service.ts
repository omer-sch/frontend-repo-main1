import apiClient from './api-client';
//import axios from 'axios';
import { getTokens } from './token-service'; // Import getTokens function

export interface Comment {
  id?: string;
  content: string;
  owner: {
    name: string;
    imgUrl: string;
  };
  createdAt: Date; 
  postId: string;
}

export const createComment = async (
  comment: Pick<Comment, "content" | "postId" | "createdAt" | "owner">
): Promise<number> => {
  try {
    const { accessToken } = getTokens(); 
    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const response = await apiClient.post(`/comments/`, comment.content, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include access token in the request headers
      },
    });
    
    console.log("Comment created:", response.data);
    return response.data.updatedCommentCount; // Assuming the backend returns the updated comment count
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error; 
  }
};

export const CommentCount = async (postId: string) => {
  try {
    console.log("Counting comments...");
    const response = await apiClient.get(`/comments/count/${postId}`);
    const count = response.data.count;

    console.log("Comment count:", count);
    return count;
  } catch (error) {
    console.error("Error counting comments:", error);
    throw error;
  }
};

export const UpdateCommentCount = async (postId: string, newCount: number) => {
  try {
    console.log("Updating comment count...");
    await apiClient.put(`/comments/count/${postId}`, { count: newCount });
    console.log("Comment count updated successfully.");

    // After updating the count, fetch the latest count from the server
    const updatedCount = await CommentCount(postId);
    return updatedCount;
  } catch (error) {
    console.error("Error updating comment count:", error);
    throw error;
  }
};


export const getCommentsByPostId = async (postId: string) => {
  try {
    const response = await apiClient.get(`/userpost/${postId}`);
    console.log(response.data);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to fetch comments by post ID');
  }

};

export const fetchComment = async (postId: string) => {
  try {
    const response = await apiClient.get(`/comments/${postId}`); 
    console.log(response.data);
      return response.data; 
  } catch (error) {
      throw new Error('Failed to fetch  post data');
  }
};
export const getAllComments = () => {
  const abortController = new AbortController()
  const req = apiClient.get<Comment[]>('comments', {signal: abortController.signal})
  return { req, abort: () => abortController.abort() }

}




