import React, { useRef } from "react";
import { createComment } from "../../services/comment-service";

interface CommentFormProps {
    postId?: string;
    postCommentCallback: () => void;
}

const AddComment: React.FC<CommentFormProps> = ({
    postId,
    postCommentCallback,
  }) => {
    const commentContent = useRef<HTMLTextAreaElement>(null);
  
    const handleCommentSubmit = async () => {
      if (commentContent.current?.value.trim() !== "") {
        try {
          await createComment({
            content: commentContent.current!.value.trim(),
            postId: postId!,
            owner: {
              name: "Anonymous",
              imgUrl: "https://via.placeholder.com/150",
            },
            createdAt: new Date(),
          });
          commentContent.current!.value = "";
          postCommentCallback();
        } catch (err) {
          console.log(err);
        }
      }
    };
  
    return (
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-4">
          <textarea
            className="form-control border-dark"
            ref={commentContent}
            placeholder="Enter your comment..."
          />
        </div>
        <div className="ms-2">
          <button className="btn btn-outline-dark" onClick={handleCommentSubmit}>
            Post
          </button>
        </div>
      </div>
    );
  };
export default AddComment;