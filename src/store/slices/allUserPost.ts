import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allPostState, postState, postType, userType } from "../../constants/AllTypes";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export const fetchAllPost = createAsyncThunk("post/fetchAllPost", async (user:userType) => {
  try {
   
      const querySnapshot = await firestore().collection('posts').doc(user.uid).collection("userPosts").get();
      const allPostsData: postType[] = [];
      querySnapshot.forEach((documentSnapshot) => {
        const data = documentSnapshot.data();
        const Post: postType = {
          URL: data.URL,
          id: data.id,
          uid: data.uid,
          description: data.description,
          dateCreated: data.dateCreated.toMillis()
        };
        allPostsData.push(Post);
      });
      const allPosts = {
        user: user,
        posts: allPostsData
      };;
      return{allPosts}
    } catch (error) {
      throw error;
    }
});

const initialState: allPostState = {
  isLoading: false,
  allPosts: [],
  isError: false,
};

const allUserPost = createSlice({
  name: "allPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPost.pending, (state) => {
      state.isLoading = true;
      state.isError = false; 
    });
    builder.addCase(fetchAllPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload.allPosts;
    });
    builder.addCase(fetchAllPost.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default allUserPost.reducer;
