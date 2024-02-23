import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../../constants/GlobalStyle'
import {Images, ThreeDots} from '../../constants/Images'
import { customStyles } from '../../screens/frontend/FrontendStyle'
import { STACK_SCREENS } from '../../constants/Navigation'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Colors'

export default function HomeCard() {
    const navigation = useNavigation();
    return (
        <View >
            <View style={[styles.flexRow, styles.horizantalyBetween, styles.horizantalyCenter, { padding: 13 }]}>
                <View style={[styles.flexRow]}>
                    <TouchableOpacity
                        onPress={() => { 
                            navigation.navigate(STACK_SCREENS.PROFILE);
                          }}
                    >
                        <Image source={Images.mediamDp} style={{ width: 32, height: 32, borderRadius: 100 }} />
                    </TouchableOpacity>
                    <View style={{ marginStart: 10 }}>
                        <Text style={[styles.fontM, styles.fontWeightXl,styles.SpacingM,{color:Colors.textclr}]}>User Name</Text>
                        <Text style={[styles.fontSm, styles.fontWeightM,styles.lineHightFirst,styles.SpacingM,{color:Colors.textclr}]}>Tokyo, Japan</Text>
                    </View>
                </View>
                <View >
                    <ThreeDots/>
                </View>
            </View>
            <View>
                <Image source={Images.postiii} style={{ width: 375, height: 375 }} />
            </View>
            <View style={[styles.flexRow, styles.horizantalyBetween, styles.horizantalyCenter, { padding: 13 }]}>
                <View style={[styles.flexRow, styles.horizantalyCenter, { gap: 17, flexGrow: 1 }]}>
                    <Image source={Images.heart} />
                    <Image source={Images.comment} />
                    <Image source={Images.messanger} />
                </View>
                <View style={{ flexGrow: 2 }}>
                    <Image source={Images.pagination} />
                </View>
                <View >
                    <Image source={Images.save} />
                </View>
            </View>
            <View style={[styles.flexRow, { marginHorizontal: 15 }]}>
                <Image source={Images.smallDp} style={{ width: 17, height: 17, borderRadius: 100 }} />

                <Text style={[styles.fontSm, styles.fontWeightM,styles.lineHightFirst,styles.SpacingSm, { marginStart: 7, color:Colors.textclr }]}>Liked by <Text style={[styles.fontM, styles.fontWeightXl,styles.SpacingM,{color:Colors.textclr}]}>craig_love</Text> and <Text style={[styles.fontM, styles.fontWeightXl,styles.SpacingM,{color:Colors.textclr}]}> 44,686 others</Text></Text>

            </View>
            <View style={{ marginBottom: 13, marginTop: 7 }}>
                <Text style={[styles.fontSm, styles.fontWeightM,styles.lineHightFirst,styles.SpacingM, { marginStart: 15, color:Colors.textclr }]}><Text style={[styles.fontM, styles.fontWeightXl,styles.SpacingM,{color:Colors.textclr}]}>joshua_l</Text> The game in Japan was amazing and I want to share some photos</Text>
            </View>
            <View style={{ marginBottom: 13}}>
                <Text style={[styles.fontExSm,styles.fontWeightM, { marginStart: 15, color:Colors.lineColor }]}>September 19</Text>
            </View>

        </View>
    )
}