import { View, Text, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/theme';

import { Home } from '../screens';


const App = () => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white}}>
            <Home />
        </SafeAreaView>
    );
}

export default App;