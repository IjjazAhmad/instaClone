import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TextInput, ScrollView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { notify, styles } from '../../../constants/GlobalStyle';
import { customStyles } from '../FrontendStyle';
import { FIRE_BASE_COLLECTION } from '../../../constants/Collections';
import { useAuthContext } from '../../../context/AuthContext';
import { fetchPost } from '../../../store/slices/postSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { Colors } from '../../../constants/Colors';

import { ArrowDown, CrossIcon, UploadButton } from '../../../constants/Images';

const initialState = { description: "", }
export default function UploadPost() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string>("");
  const [imageType, setImageType] = useState<string>("");
  const [imageSize, setImageSize] = useState<number | null>();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState)
  const [focusedText, setFocusedText] = useState('');
  const { user } = useAuthContext()
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (name: string, value: string): void => {
    setState((s) => ({ ...s, [name]: value }));
  };
  const handleCamra = async () => {
    const result = await launchCamera({ mediaType: "photo" });
    if (!result.didCancel && result.assets && result.assets.length > 0 && result.assets[0].uri && result.assets[0].type && result.assets[0].fileSize) {
      setImage(result.assets[0].uri);
      setImageType(result.assets[0].type);
      let itemSize = result.assets[0].fileSize
      let size = itemSize / 1024;
      size = Number(size.toFixed(2));
      setImageSize(size);
      setModalVisible(false)
    }
  };

  const handleGallery = async () => {

    const result = await launchImageLibrary({ mediaType: "photo" });
    if (!result.didCancel && result.assets && result.assets.length > 0 && result.assets[0].uri && result.assets[0].type && result.assets[0].fileSize) {
      setImage(result.assets[0].uri);
      setImageType(result.assets[0].type);
      let itemSize = result.assets[0].fileSize
      let size = itemSize / 1024;
      size = Number(size.toFixed(2));
      setImageSize(size);
      setModalVisible(false)
    }
  };

  const uploadFile = async () => {
    setLoading(true);
    const { description } = state
    try {
      const fileType = imageType;
      const uriPath = image;
      const Type = fileType.split("/").pop();
      const id = Math.random().toString(36).slice(2);
      const childPath = `/post/${user.uid}/${id}.${Type}`
      const reference = storage().ref().child(childPath);
      await reference.putFile(uriPath);
      const URL = await reference.getDownloadURL();
      const postData = {  }
      await firestore()
        .collection(FIRE_BASE_COLLECTION.POST)
        .doc(user.uid)
        .collection("userPosts")
        .doc(id)
        .set({URL, description, dateCreated:firebase.firestore.FieldValue.serverTimestamp(),uid:user.uid,id:id})
        .then(() => {
          notify("Success", "Post upload Successfully", "success")
          setLoading(false)
          dispatch(fetchPost());
          setImage("")
          setImageSize(null)
          setImageType("")
          setState(initialState)
        })
        .catch((error) => {
          notify("error", "Post upload failed", "error");
        });
      notify("success", "Post uploaded", "success");
    } catch (err) {
      notify("error", "Post upload failed", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setFocusedText('cancel')
    setImage("")
    setState(initialState)
    setImageSize(null)
    setImageType("")

  }

  const toggleModal = () => {

    setModalVisible(!isModalVisible);
  };
  return (
    <>
      <View style={[styles.flexRow, { backgroundColor: Colors.inputbg, padding: 13, }]}>
        <TouchableOpacity

          onPress={handleCancel}
          style={{ flexGrow: 1 }}
        >
          <Text
            style={[
              styles.fontSm,
              styles.fontWeightM,
              styles.lineHightFirst,
              styles.SpacingExSm,
              { color: focusedText === 'cancel' ? 'red' : Colors.textclr, }
            ]}

          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFocusedText('edit')}
          style={{ flexGrow: 1.3 }}
        >
          <Text
            style={[
              styles.fontM,
              styles.fontWeightXl,
              styles.SpacingM,
              { color: focusedText === 'edit' ? 'blue' : Colors.textclr }
            ]}

          >
            Images <ArrowDown />
          </Text>
        </TouchableOpacity>

      </View>
      <View style={[styles.flexContainer, styles.horizantalyCenter, {height:"100%"}]}>
      <ScrollView>
          <View style={{ marginVertical: 15 }}>
            {image ?
              <View>
                <Text>Type: {imageType}</Text>
                <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
                <Text>Size: {imageSize} KB</Text>
              </View>

              : <TouchableOpacity
                // style={customStyles.btn}
                onPress={toggleModal}
              >
                <UploadButton />
              </TouchableOpacity>}
          </View>
          <View style={{display:"flex", flexDirection:"column", justifyContent:"space-between", width: "100%", }}>
            <View>
              <Text>
                Post Description
              </Text>
              <TextInput
                style={[styles.formControl, { width: "100%" }]}
                placeholder='Add post description'
                placeholderTextColor={"#D1D3D4"}
                keyboardType='email-address'
                value={state.description}
                onChangeText={(value: string) => handleChange("description", value)}
              />
            </View>
            <View>
            <TouchableOpacity
              style={[customStyles.btn]}
              onPress={() => { uploadFile() }}
              disabled={loading} // Disable the button when uploading
            >
              <Text style={[styles.fontWeightXl, styles.fontM, { textAlign: "center", color: Colors.textclr }]}>{loading ? "Uploading..." : "Upload"}</Text>
            </TouchableOpacity>
            </View>
          </View>
          <View style={[customStyles.container]}>
            <Modal
              animationType="fade"
              transparent={false}
              visible={isModalVisible}
              onRequestClose={toggleModal}
            >
              <View style={[customStyles.modalContainer, customStyles.btn]}>
                <TouchableOpacity onPress={toggleModal} style={customStyles.closeButton}>
                  {/* <Text style={customStyles.closeButtonText}>Close</Text> */}
                  <CrossIcon />
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    style={customStyles.btn}
                    onPress={() => { handleCamra() }}
                  >
                    <Text style={[styles.fontWeightXl, styles.fontM, { textAlign: "center", color: Colors.textclr }]}>Open Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={customStyles.btn}
                    onPress={() => { handleGallery() }}
                  >
                    <Text style={[styles.fontWeightXl, styles.fontM, { textAlign: "center", color: Colors.textclr }]}>Select from Gallery </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

          </View>
        </ScrollView>
      </View>
    </>
  )
}
