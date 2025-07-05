import React from 'react';

function PostItem({ post, onDelete }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <small>{new Date(post.createdAt).toLocaleString()}</small>
      <br />
      <button onClick={() => onDelete(post._id)} style={{ marginTop: '5px' }}>Delete</button>
    </div>
  );
}

export default PostItem;
