import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../constants/GlobalStyle'
import { Colors } from '../../constants/Colors'
type propsItems = {
  title: string,
  value: string,
}
export default function DetailText(props: propsItems) {
  return (
    <View style={[styles.flexRow, { marginTop: 14 }]}>
      <View style={{ width: "30%", paddingBottom: 15 }}>
        <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>{props.title}</Text>
      </View>
      <View style={{ borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", paddingBottom: 15 }}>
        <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr }]}>{props.value}</Text>
      </View>
    </View>
  )
}