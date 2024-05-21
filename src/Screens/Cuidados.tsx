import { StatusBar, setStatusBarHidden } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform} from 'react-native';


export default function Cuidados() {
  return (
   <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.content}>
        <Text> Tela Cuidados </Text>
      </View>

      
    </ScrollView>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A2C9F0',
    paddingTop: 20,
  },
  content: {
    alignSelf: 'center',
    flex: 1,
    width: '80%',
    height: 120,
    marginTop: 20,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
