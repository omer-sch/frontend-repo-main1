import { useEffect, useState } from 'react';
import Post from './Post';
import postService, { CanceledError } from '../../services/posts-service';
import './PostsList.css';
import { PostData } from '../../services/posts-service';

function PostsList() {
    const [serverPosts, setServerPosts] = useState<PostData[]>([]);
    const [localStoragePosts, setLocalStoragePosts] = useState<PostData[]>([]);
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        // Fetch posts from the server
        const { req, abort } = postService.getAllPosts();
        req.then((res) => {
            setServerPosts(res.data);
        }).catch((err) => {
            console.log(err);
            if (err instanceof CanceledError) return;
            setError(err.message);
        });

        // Retrieve posts from local storage
        const storedPostsJSON = localStorage.getItem('posts');
        if (storedPostsJSON) {
            const storedPosts: PostData[] = JSON.parse(storedPostsJSON);
            setLocalStoragePosts(storedPosts);
        }

        return () => {
            abort();
        };
    }, []);

    const handleRemove = (key: number) => {
        // Remove post from the state
        const newServerPosts = serverPosts.filter((_, index) => index !== key);
        //const newServerPosts = serverPosts.filter((, index) => index !== key);
        setServerPosts(newServerPosts);
        // Update local storage with the new server posts
        localStorage.setItem('posts', JSON.stringify(newServerPosts));
    };

    return (
        <div>
            {/* Posts List */}
            <div className="posts-container">
                {serverPosts.map((post, index) => (
                    <Post key={index} post={post} onRemoveCbk={() => handleRemove(index)} />
                ))}
                {localStoragePosts.map((post, index) => (
                    <Post key={`local-${index}`} post={post} onRemoveCbk={function (): void {
                        throw new Error('Function not implemented.');
                    } } />
                ))}
                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>
    );
}

export default PostsList;


