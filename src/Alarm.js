import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Alarm = () => {
    return(
        <View style={styles.container}>
            <Text>Alarm Page</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30
    }
})
export default Alarm;