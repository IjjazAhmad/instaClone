import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allPosts, postState, postType, userType, usersDataState } from "../../constants/AllTypes";
import firestore from '@react-native-firebase/firestore';

export const fetchUsersData = createAsyncThunk("post/fetchUsersData", async () => {
    try {
      const querySnapshot = await firestore().collection('users').get();
      const usersData: { user: userType; posts: postType[] }[] = [];
      
      for (const documentSnapshot of querySnapshot.docs) {
        const data = documentSnapshot.data();
        const user: userType = {
          bio: data.bio,
          email: data.email,
          gender: data.gender,
          phone: data.phone,
          profileImage: data.profileImage,
          role: data.role,
          status: data.status,
          uid: data.uid,
          username: data.username,
          website: data.website,
        };
        
        const allPosts = await fetchAllPost(user);
        usersData.push(allPosts);
      }
      return { usersData };
    } catch (error) {
      throw error;
    }
  });
  
  const fetchAllPost = async (user: userType) => {
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
      
      return { user, posts: allPostsData };
    } catch (error) {
      throw error;
    }
  };
  
  const initialState: usersDataState = {
    isLoading: false,
    usersData: [],
    isError: false,
  };
  
  const usersData = createSlice({
    name: "usersData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchUsersData.pending, (state) => {
        state.isLoading = true;
        state.isError = false; 
      });
      builder.addCase(fetchUsersData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersData = action.payload.usersData;
      });
      builder.addCase(fetchUsersData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    },
  });
  
  export default usersData.reducer;