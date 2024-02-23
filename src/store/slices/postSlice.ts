import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postState, postType } from "../../constants/AllTypes";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export const fetchPost = createAsyncThunk("post/fetchPost", async () => {
  try {
    const currentUser = auth().currentUser;
    const userId = currentUser ? currentUser.uid : null
    if (!userId) {
      throw new Error('User not authenticated');
    }
   
    const querySnapshot = await firestore().collection('posts').doc(userId).collection("userPosts").get();
    const userPosts: postType[] = [];
    querySnapshot.forEach((documentSnapshot) => {
      const data = documentSnapshot.data();
      const Post: postType = {
        URL: data.URL,
        id: data.id,
        uid: data.uid,
        description: data.description,
        dateCreated: data.dateCreated.toMillis()
      };
      userPosts.push(Post);
    });
    return { userPosts };
  } catch (error) {
    throw error;
  }
});

const initialState: postState = {
  isLoading: false,
  userPosts: [],
  isError: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state) => {
      state.isLoading = true;
      state.isError = false; 
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userPosts = action.payload.userPosts;
    });
    builder.addCase(fetchPost.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default postSlice.reducer;
