import { StatusBar, setStatusBarHidden } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform, Image, TouchableOpacity, TextInput } from 'react-native';


export default function Home() {
  return (
   <SafeAreaView style={styles.container}>
    <ScrollView>
    <Image 
          source={require("../../assets/home-dengue.png")} 
          style={styles.logo}
        />
    </ScrollView>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width:'100%',
  }, 
  container: {
    backgroundColor: '#A2C9F0',
    paddingTop: 35,
    paddingBottom: 78
  },
});
