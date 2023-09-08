import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Medium from '../assets/fonts/OpenSans-Medium.ttf';
import Bold from '../assets/fonts/OpenSans-Bold.ttf';
import Regular from '../assets/fonts/OpenSans-Regular.ttf';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

const Layout = () => {

    const [fontsLoaded] = useFonts({
        "OpenSans-Medium" : Medium,
        "OpenSans-Bold" : Bold,
        "OpenSans-Regular" : Regular,
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return <Stack onLayout={onLayoutRootView} />;
}

export default Layout;