import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';

const SearchBar = ({ posts, setPosts, handler }) => {

    const [ searchTerm, setSearchTerm ] = useState('');
    
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
    <div style={{display: 'flex', alignContent: 'center', justifyContent:'center'}}>
                <form 
                style={{display: 'flex'}}
                onSubmit={filterPosts}
                >
                    <Form.Control 
                    name='search bar'
                    onChange={(e) =>handleReset(e.target.value)}
                    type='text' 
                    placeholder='Search...'
                    />
                    <Button 
                    type='submit'
                    >
                        Cerca
                    </Button>
                </form>
                
    </div>
  )
}

export default SearchBar