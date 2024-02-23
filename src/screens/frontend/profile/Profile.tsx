import { View, Text, ScrollView, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native'

import React, { useEffect, useState } from 'react'
import { styles } from '../../../constants/GlobalStyle'
import { CrossIcon, TabsIcon, User} from '../../../constants/Images'
import { customStyles } from '../FrontendStyle'
import { Colors } from '../../../constants/Colors'
import { allPosts, postItem, rootStatePost } from '../../../constants/AllTypes'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { fetchUsersData } from '../../../store/slices/usersData'
 type singleUserType = {
  email: string,
  role: string,
  status: string,
  uid: string,
  username: string,
  bio: string,
}
export default function Profile() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const route = useRoute();
  const { profile } = route.params;
  // const usersData = useSelector((state: rootStatePost) => state.usersData.usersData);
  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //     dispatch(fetchUsersData());
  // }, []);
  // useEffect(() => {
  //   let tempPosts = usersData
  //   let temppost = tempPosts.filter((item: allPosts) => {
  //     return (
  //       item.user?.uid == profile
  //     )
  //   })
  //   let user:singleUserType = temppost[0]["user"]
  //   setSingleUser(user)
  //   setSingleUserPost(temppost)
  // }, [])
  const toggleModal = (post: any) => {
    setModalImg(post)
    setModalVisible(!isModalVisible);
  };
  return (
    <>
      <View style={[styles.flexContainer]}>
        <View style={[styles.horizantalyCenter]} >
          <Text style={[styles.fontXxl, styles.fontWeightXl,styles.SpacingExSm,{color:Colors.textclr, marginVertical:12}]}>
            jacob_w
          </Text>
          <View style={[customStyles.border]}>
            <TouchableOpacity 
            // onPress={() => toggleModal(User)}
            >
              <User width="86" height="89" style={customStyles.profileImg} />
            </TouchableOpacity>
          </View>
          <View style={[styles.horizantalyCenter, customStyles.bio]}>
            <Text style={[styles.fontSm, styles.fontWeightXl,styles.SpacingSm,{color:Colors.textclr}]}>{profile.user.username}</Text>
            <Text style={[customStyles.textCenter, styles.fontSm, styles.fontWeightM, styles.lineHightFirst, { color: Colors.textclr }]} >{profile.user.bio}</Text>
          </View>
          <View>
            <TabsIcon/>
          </View>
        </View>
        <ScrollView>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" }}>
            {
              profile.posts.map((item: postItem, i) => {
                return (
                  <View key={i}>
                    <TouchableOpacity onPress={() => toggleModal(item.URL)}>
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
                <CrossIcon/>
              </TouchableOpacity>
              {modalImg===""?
                ""
                :<Image source={{ uri: modalImg }} style={customStyles.fullScreenProfileImg} />
              }
            </View>
          </Modal>
        </View>
      </View>
    </>
  )
}

