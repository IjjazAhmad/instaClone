import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '../../../constants/GlobalStyle'
import { BookMark, Comment, HeartIcon, ProfileIcon, Telegram, ThreeDots, User } from '../../../constants/Images'
import { STACK_SCREENS } from '../../../constants/Navigation'
import { useDispatch, useSelector } from 'react-redux'
import { allPosts, postType, rootStatePost, } from '../../../constants/AllTypes'
import { AppDispatch } from '../../../store/store'
import { Colors } from '../../../constants/Colors'
import { useAuthContext } from '../../../context/AuthContext'
import { fetchUsersData } from '../../../store/slices/usersData'
export default function Home({ navigation }: any) {
    const { user } = useAuthContext()
    const usersData = useSelector((state: rootStatePost) => state.usersData.usersData);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchUsersData());
    }, []);
    return (
        <View style={[styles.flexContainer]}>
            <ScrollView>
                {
                    usersData.map((item: allPosts, i) => {
                        if (item.user?.uid != user.uid)
                            return (
                                <View key={i}>
                                    {item.posts.map((post: postType, j) => (
                                        <View key={j}>
                                            <View style={[styles.flexRow, styles.horizantalyBetween, styles.horizantalyCenter, { padding: 13 }]}>
                                                <View style={[styles.flexRow]}>
                                                    <TouchableOpacity

                                                        onPress={() => { navigation.navigate(STACK_SCREENS.PROFILE, { profile: item }) }}
                                                    >
                                                        <User width="32" height=" 32" style={{ borderRadius: 100 }} />
                                                    </TouchableOpacity>
                                                    <View style={{ marginStart: 10 }}>
                                                        <Text style={[styles.fontM, styles.fontWeightXl, styles.SpacingM, { color: Colors.textclr }]}>{item.user?.username}</Text>
                                                        <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Tokyo, Japan</Text>
                                                    </View>
                                                </View>
                                                <View >
                                                    <ThreeDots />
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={[styles.fontM, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr, margin: 5 }]}>{post.description}</Text>
                                                <Image source={{ uri: post.URL }} style={{ width: 375, height: 375 }} />
                                            </View>
                                            <View style={[styles.flexRow, styles.horizantalyBetween, styles.horizantalyCenter, { padding: 13 }]}>
                                                <View style={[styles.flexRow, styles.horizantalyCenter, { gap: 17, flexGrow: 1 }]}>
                                                    <HeartIcon width="22" height="22" />
                                                    <Comment width="22" height="22" />
                                                    <Telegram width="22" height="22" />
                                                </View>
                                                <View style={{ flexGrow: 2 }}>
                                                    <ThreeDots />
                                                </View>
                                                <View >
                                                    <BookMark width="22" height="22" />
                                                </View>
                                            </View>
                                            <View style={[styles.flexRow, { marginHorizontal: 15 }]}>

                                                <ProfileIcon style={{ width: 17, height: 17, borderRadius: 100 }} />
                                                <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { marginStart: 7, color: Colors.textclr }]}>Liked by <Text style={[styles.fontM, styles.fontWeightXl, styles.SpacingM, { color: Colors.textclr }]}>craig_love</Text> and <Text style={[styles.fontM, styles.fontWeightXl, styles.SpacingM, { color: Colors.textclr }]}> 44,686 others</Text></Text>

                                            </View>
                                            <View style={{ marginBottom: 13, marginTop: 7 }}>
                                                <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingM, { marginStart: 15, color: Colors.textclr }]}><Text style={[styles.fontM, styles.fontWeightXl, styles.SpacingM, { color: Colors.textclr }]}>joshua_l</Text> The game in Japan was amazing and I want to share some photos</Text>
                                            </View>
                                            <View style={{ marginBottom: 13, }}>
                                                <Text style={[styles.fontExSm, styles.fontWeightM, styles.SpacingL, { marginStart: 15, color: Colors.lineColor }]}>September 19</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )
                    })
                }

            </ScrollView>
        </View>
    )
}