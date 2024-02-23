import { View, Text, ScrollView, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native'

import React, { useEffect, useState } from 'react'
import { notify, styles } from '../../../constants/GlobalStyle'
import { CrossIcon, Delete, TabsIcon, User } from '../../../constants/Images'
import { customStyles } from '../FrontendStyle'
import { Colors } from '../../../constants/Colors'
import { STACK_SCREENS } from '../../../constants/Navigation'
import auth from '@react-native-firebase/auth';
import { useAuthContext } from '../../../context/AuthContext'
import { postItem, rootStatePost } from '../../../constants/AllTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { fetchPost } from '../../../store/slices/postSlice'
import { firebase } from '@react-native-firebase/storage'
import { FIRE_BASE_COLLECTION } from '../../../constants/Collections'
export default function ProfileSelf({ navigation }: any) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [postId, setPostId] = useState("");
  const [modalImg, setModalImg] = useState("");
  const { dispatch, user } = useAuthContext()
  const userPosts = useSelector((state: rootStatePost) => state.posts.userPosts);
  const reduxDispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    reduxDispatch(fetchPost());
  }, [])
  const toggleModal = (item: any) => {
    setPostId(item.uid)
    setModalImg(item.URL)
    setModalVisible(!isModalVisible);
  };
  const handleDelete = async () => {
    try {
      
      // Get the reference to the subcollection 'userPosts' of the post document
      const userPostsRef = firebase.firestore().collection(FIRE_BASE_COLLECTION.POST).doc(postId).collection('userPosts');
      
      // Query the subcollection to find the document with the specified URL
      const subDocSnapshot = await userPostsRef.where('URL', '==', modalImg).get();
      
      // Get the document ID of the document in the subcollection
      const subDocId = subDocSnapshot.docs[0].id;
      
      // Delete the document from the subcollection
      await userPostsRef.doc(subDocId).delete();
      
      // Delete the image from Firebase Storage using the URL
      const storageRef = firebase.storage().refFromURL(modalImg);
      await storageRef.delete();
      
      // Dispatch an action to fetch updated posts (if necessary)
      reduxDispatch(fetchPost());
      
      // Notify the user of the successful deletion
      notify("Success", "Post has been deleted", "success");
      
      // Close the modal
      setModalVisible(false);
  } catch (error) {
      // Notify the user of any errors
      notify("Error", `${error}`, "error");
  }
  
  }
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch({ type: "Logout", payload: {} })
        notify("User Logout!", "", "success");
      });
  }
  return (
    <>
      <View style={[styles.flexContainer]}>
        <View style={[styles.horizantalyCenter]} >
          <View style={[customStyles.border, { overflow: "hidden" }]}>
            <TouchableOpacity
            // onPress={() => toggleModal(profileDpSec)}
            >{
              user.profileImage===""?
              <User width="86" height="86" style={customStyles.profileImg} />
              :
              <Image source={{uri:user.profileImage}}  style={customStyles.profileImg}/>
            }
            </TouchableOpacity>
          </View>
          <View style={[styles.horizantalyCenter, customStyles.bio]}>
            <Text style={[styles.fontL, styles.fontWeightXl, styles.SpacingSm, { color: Colors.textclr }]}>{user.username}</Text>
            <Text style={[customStyles.textCenter, styles.fontSm, styles.fontWeightM, styles.lineHightFirst, { color: Colors.textclr }]} >{user.bio}</Text>
          </View  >
          <View style={{ width: "90%" }}>
            <TouchableOpacity
              style={customStyles.btn}
              onPress={() => navigation.navigate(STACK_SCREENS.PROFILE_EDIT)}
            >
              <Text style={[styles.fontWeightXl, styles.fontM, { textAlign: "center", color: Colors.textclr }]}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={customStyles.btn}
              onPress={() => handleLogout()}
            >
              <Text style={[styles.fontWeightXl, styles.fontM, { textAlign: "center", color: Colors.textclr }]}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TabsIcon />
          </View>
        </View>
        <ScrollView>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" }}>
            {
              userPosts.map((item: postItem, i) => {
                return (
                  <View key={i}>
                    <TouchableOpacity onPress={() => toggleModal(item)}>
                      <Image source={{ uri: item.URL }} style={{ width: 120, height: 124 }} />
                    </TouchableOpacity>
                  </View>
                )
              })

            }

          </View>
        </ScrollView>
        <View style={customStyles.container}>
          <Modal
            animationType="fade"
            transparent={false}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={customStyles.modalContainer}>

              <TouchableOpacity onPress={toggleModal} style={customStyles.closeButton}>
                <CrossIcon />
              </TouchableOpacity>

              <Image source={{ uri: modalImg }} style={customStyles.fullScreenProfileImg} />
            </View>
            <TouchableOpacity onPress={handleDelete} style={{ position: "absolute", top: 10, left: 30, }}>
              <Delete width={24} />
            </TouchableOpacity>
          </Modal>

        </View>

      </View>

    </>
  )
}

