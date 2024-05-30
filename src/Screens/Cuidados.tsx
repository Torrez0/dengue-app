import { StatusBar, setStatusBarHidden } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform, Image} from 'react-native';


export default function Cuidados() {
  return (
   <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.content}>
        <Image 
          source={require("../../assets/cuidados01.png")} 
          style={styles.logo}
        />

        <Image 
          source={require("../../assets/cuidados02.png")} 
          style={styles.logo}
        />
         <Image 
          source={require("../../assets/cuidados03.png")} 
          style={styles.logo}
        />
         <Image 
          source={require("../../assets/cuidados04.png")} 
          style={styles.logo}
        />
      </View>

      
    </ScrollView>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A2C9F0',
    paddingTop: 60,
    height:'100%',
    width: '100%'
  },
  content: {
    alignSelf: 'center',
    flex: 1,
    width: '70%',
    height: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 23,
  }, 
});
