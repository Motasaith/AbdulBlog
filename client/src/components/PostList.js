import React from 'react';
import PostItem from './PostItem';

function PostList({ posts, onDelete }) {
  return (
    <div>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <PostItem key={post._id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default PostList;
