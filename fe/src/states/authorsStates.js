import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    authors: [],
    isLoading: false,
    error: null
}

export const getAuthorsFromDatabase = createAsyncThunk(
    'authors/GETAuthors', 
    async () => {
        await axios.get('endpoint')
        .then((response) => response.json())
        .then((jsonResponse) => { return jsonResponse})
    }
);