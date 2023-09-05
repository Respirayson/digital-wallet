import React from 'react'
import {  View, Text } from 'react-native'
import { SIZES, FONTS, COLORS } from '../../constants/theme'

const Header = () => {
  return (
    <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
            <Text style={{ ...FONTS.h1 }}>Welcome</Text>
            <Text style={{ ...FONTS.body2, color: COLORS.gray }}>Have a good day!</Text>
        </View>


        <View style={{ alignItems: "center", justifyContent: "center"}}>
            <Text style={{ ...FONTS.h1 }}>😊</Text>
        </View>

    </View>
  )
}

export default Header