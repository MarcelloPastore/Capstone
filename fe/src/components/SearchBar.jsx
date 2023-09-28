import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../CSS/globalCss.css';
const SearchBar = ({ posts, setPosts, handler }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const filterPosts = (e) => {
        e.preventDefault();

        const filterPosts = Array.isArray(posts) &&
            posts.filter((post) =>
                post.title.toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        console.log('posts: ' + posts);
        setPosts(filterPosts);
    };
    const handleReset = (value) => {
        if (value === '') {
            handler()
        }
        setSearchTerm(value);
    }

    return (
        <div className='SearchBar-container'>
            <form
                style={{ display: 'flex' }}
                onSubmit={filterPosts}
            >
                <Form.Control
                    name='search bar'
                    onChange={(e) => handleReset(e.target.value)}
                    type='text'
                    placeholder='Search...'
                />
                <button className='button-search'
                    type='submit'
                >
                    <span>
                        <FontAwesomeIcon icon={faSearch} color='white'/>

                    </span>
                </button>
            </form>

        </div>
    )
}

export default SearchBar