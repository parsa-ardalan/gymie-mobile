import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Blog = {
    _id: string;
    title: string;
    blogText: string;
    minTime: string;
};

const initialState: Blog[] = [];

const blogsSlice = createSlice({
    name: "blogs",
    initialState,

    reducers: {
        updateBlogs: (state, action: PayloadAction<Blog[]>) => {
            return action.payload;
        },
    },
});

export const { updateBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;