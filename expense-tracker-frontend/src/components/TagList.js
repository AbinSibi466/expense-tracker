import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get('/api/tags');
        setTags(res.data);
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };

    fetchTags();
  }, []);

  const handleDeleteTag = async (id) => {
    try {
      await axios.delete(`/api/tags/${id}`);
      setTags(tags.filter(tag => tag._id !== id));
    } catch (err) {
      console.error('Error deleting tag:', err);
    }
  };

  const handleAddTag = async () => {
    try {
      const res = await axios.post('/api/tags', { name: newTagName });
      setTags([...tags, res.data]);
      setShowModal(false);
      setNewTagName('');
    } catch (err) {
      console.error('Error adding tag:', err);
    }
  };

  return (
    <div style={styles.tagListContainer}>
      <h2 style={styles.title}>Manage Tags</h2>
      <button style={styles.addTagBtn} onClick={() => setShowModal(true)}>+ Add Tag</button>
      <ul style={styles.tagList}>
        {tags.map(tag => (
          <li key={tag._id} style={styles.tagItem}>
            {tag.name}
            <button style={styles.deleteBtn} onClick={() => handleDeleteTag(tag._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.modalClose} onClick={() => setShowModal(false)}>X</button>
            <h3>Add New Tag</h3>
            <input 
              type="text" 
              value={newTagName} 
              onChange={(e) => setNewTagName(e.target.value)} 
              placeholder="Tag Name" 
              style={styles.inputField}
            />
            <button style={styles.saveBtn} onClick={handleAddTag}>Add Tag</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  tagListContainer: {
    background: 'linear-gradient(to right, #2c3e50, #4ca1af)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  title: {
    color: 'white',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '24px',
    marginBottom: '20px',
  },
  addTagBtn: {
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  tagList: {
    listStyleType: 'none',
    padding: '0',
  },
  tagItem: {
    backgroundColor: '#34495e',
    color: 'white',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    position: 'relative',
    width: '400px',
    maxWidth: '90%',
  },
  modalClose: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  saveBtn: {
    backgroundColor: '#4ca1af',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default TagList;
