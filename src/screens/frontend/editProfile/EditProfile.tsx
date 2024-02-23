import { View, Text, TouchableOpacity, Image, Touchable, ScrollView, Linking, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { notify, styles } from '../../../constants/GlobalStyle'
import { customStyles } from '../FrontendStyle'
import { Colors } from '../../../constants/Colors'
import { useAuthContext } from '../../../context/AuthContext'
import { User } from '../../../constants/Images'
import DetailText from '../../../components/profileDetailText/DetailText'
import { FIRE_BASE_COLLECTION } from '../../../constants/Collections';
const initialState = { name:"",username: "", website:"", bio:"", email:"", phone:"", gender:""}

export default function EditProfile() {
  const { user } = useAuthContext()
  const [focusedText, setFocusedText] = useState('');
  const [loading, setisloading] = useState(false)
  const [state, setState] = useState(initialState)
  useEffect(() => {
    let {name, username,website,bio,email,phone,gender } = user
    state.name = name
    state.username = username
    state.website = website
    state.bio = bio
    state.email = email
    state.phone = phone
    state.gender = gender
  }, [])
  const handleChange = (name: string, value: string): void => {
    setState((s) => ({ ...s, [name]: value }));
    setFocusedText('edit')
  };
 
  const handleCancel = () => {
    let { username,website,bio,email,phone,gender } = user
    state.username = username
    state.website = website
    state.bio = bio
    state.email = email
    state.phone = phone
    state.gender = gender
    setFocusedText('cancel')
  }

  const handleSubmite = async () => {
    setFocusedText("done")
    try {
      await firestore()
        .collection(FIRE_BASE_COLLECTION.USERS)
        .doc(user.uid)
        .update(state);
      notify("Success", "Profile successfully updated!","success")
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document: ', error);
      notify("error", "Error updating profile","success")
    }
  };
  return (
    <View style={[styles.flexContainer]}>
      <View style={[styles.flexRow, styles.horizantalyBetween, { backgroundColor: Colors.inputbg, padding: 12 }]}>
        <TouchableOpacity
          onPress={handleCancel}
        >
          <Text
            style={[
              styles.fontSm,
              styles.fontWeightM,
              styles.lineHightFirst,
              styles.SpacingExSm,
              { color: focusedText === 'cancel' ? 'red' : Colors.textclr }
            ]}

          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFocusedText('edit')}

        >
          <Text
            style={[
              styles.fontM,
              styles.fontWeightXl,
              styles.SpacingM,
              { color: focusedText === 'edit' ? 'blue' : Colors.textclr }
            ]}

          >
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmite}
        >
          <Text
            style={[
              styles.fontSm,
              styles.fontWeightM,
              styles.lineHightFirst,
              styles.SpacingExSm,
              { color: focusedText === 'done' ? 'green' : Colors.textclr }
            ]}

          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={[styles.horizantalyCenter]} >
          <View style={[styles.horizantalyCenter, { marginTop: 19 }]}>
            {
              user.profileImage === "" ?
                <User width="86" height="86" style={customStyles.profileImg} />
                :
                <Image source={{ uri: user.profileImage }} style={customStyles.profileImg} />
            }

            <View style={[styles.horizantalyCenter, customStyles.bio]}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingM, { color: Colors.primary }]}>Change Profile Photo</Text>
            </View>
          </View>
        </View>
        <View style={{ margin: 20 }}>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Name</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}
              keyboardType="default"
              value={state.name}
              onChangeText={(value: string) => handleChange("name", value)}
            />
          </View>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Username</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}
              keyboardType="default"
              value={state.username}
              onChangeText={(value: string) => handleChange("username", value)}
            />
          </View>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Website</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}
              keyboardType="url"
              value={state.website}
              onChangeText={(value: string) => handleChange("website", value)}
            />
          </View>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Bio</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}
              keyboardType="default"
              value={state.bio}
              onChangeText={(value: string) => handleChange("bio", value)}
            />
          </View>
          <View style={{ marginVertical: 14 }}>
            <Text style={[styles.fontM, styles.fontWeightXl, styles.SpacingM, { color: Colors.textclr }]}>
              Private Information
            </Text>
          </View>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Email</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}
              keyboardType='email-address'
              value={state.email}
              onChangeText={(value: string) => handleChange("email", value)}
            />
          </View>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Phone</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}
              keyboardType="phone-pad"
              value={state.phone}
              onChangeText={(value: string) => handleChange("phone", value)}
            />
          </View>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Gender</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}
              
              value={state.gender}
              onChangeText={(value: string) => handleChange("gender", value)}
            />
          </View>

        </View>
      </ScrollView>
    </View>
  )
}