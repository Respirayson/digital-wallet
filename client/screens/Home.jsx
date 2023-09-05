import React from 'react'
import { View } from 'react-native'
import { Features, Header, Wallet } from '../components'
import { SIZES } from '../constants/theme'

const Home = () => {
  return (
    <View style={{ margin: SIZES.padding * 2 }}>
        <Header />
        <Wallet balance={200} phoneNumber={"84558231"} />
        <Features />
    </View>
  )
}

export default Home