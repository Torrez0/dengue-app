import { StatusBar, setStatusBarHidden } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform, TextInput, TouchableOpacity} from 'react-native';


export default function Cadastro() {
  return (
   <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.content}>
        <Text style={styles.title}>
            Cadastre-se
        </Text>
      <TextInput
          placeholder='Digite o seu nome completo'
          style={styles.input}
        > 
        </TextInput>
        <TextInput
          placeholder='Digite a sua data de nascimento'
          style={styles.input}
        > 
        </TextInput>
        <TextInput
          placeholder='Digite o seu e-mail'
          style={styles.input}
        > 
        </TextInput>
        <TextInput
          placeholder='Digite a sua senha'
          style={styles.input}
        > 
        </TextInput>
        <TextInput
          placeholder='Confirme a sua senha'
          style={styles.input}
        > 
        </TextInput>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> 
            Confirmar
          </Text>
        </TouchableOpacity>
      </View>

      
    </ScrollView>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#A2C9F0',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 100,
    //   width: '100%',
    },
    content: {
      alignSelf: 'center',
      backgroundColor: '#A2C9F0',
      flex: 1,
      width: 350,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center'
    }, 
    title: {
        fontSize: 36,
        fontWeight: '700',
        color: '#FFF'
    },
    input: {
      backgroundColor: '#FFF', 
      borderRadius: 10,
      padding: 5, 
      width: '100%',
      height: 50, 
      alignItems: 'center',
      justifyContent: 'center', 
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 10
    },
    text: {
      fontSize: 14,
      fontWeight: '500'
    },
    link: {
      color: '#0000EE',
      textDecorationLine: 'underline'
    },
    button: {
      backgroundColor: '#B9082C', 
      borderRadius: 10,
      padding: 5, 
      width: '100%',
      height: 50, 
      alignItems: 'center',
      justifyContent: 'center', 
      marginTop: 30,
      marginBottom: 10
    }, 
    buttonText: {
      color: '#FFF',
      fontSize: 24,
      fontWeight: '700'
    }
  });