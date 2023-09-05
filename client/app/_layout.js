import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Black from '../assets/fonts/Roboto-Black.ttf';
import Bold from '../assets/fonts/Roboto-Bold.ttf';
import Regular from '../assets/fonts/Roboto-Regular.ttf';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

const Layout = () => {

    const [fontsLoaded] = useFonts({
        "Roboto-Black" : Black,
        "Roboto-Bold" : Bold,
        "Roboto-Regular" : Regular,
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