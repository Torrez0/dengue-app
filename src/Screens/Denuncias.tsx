import { StatusBar, setStatusBarHidden } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform, TextInput, TouchableOpacity} from 'react-native';


export default function Denuncias() {
  return (
    <SafeAreaView style={styles.container}>
     <ScrollView>
       <View style={styles.content}>
         <Text style={styles.title}>
             Denuncie aqui
         </Text>
         <TextInput style={styles.input}
           placeholder='Selecione o Estado'
         > 
         </TextInput>
         <TextInput style={styles.input}
           placeholder='Selecione a cidade'
           editable={false}
           selectTextOnFocus={false}
         > 
         </TextInput>
         <TextInput style={styles.input}
           placeholder='Digite o endereço'
           editable={false}
           selectTextOnFocus={false}
         > 
         </TextInput>
         <TextInput style={styles.input}
           placeholder='Descrição / Denúnica'
         > 
         </TextInput>
 
         <Text style={styles.text}>
           Anexar evidências
         </Text>
 
         <TouchableOpacity style={styles.button}>
           <Text style={styles.buttonText}> 
             Enviar
           </Text>
         </TouchableOpacity>
 
         <Text style={styles.title}>
             Suas denúnias
         </Text>
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
     // paddingTop: 100,
   },
   content: {
     alignSelf: 'center',
     flex: 1,
     width: 350,
     marginTop: 20,
     alignItems: 'center',
     justifyContent: 'center', 
     paddingTop: 50,
   }, 
   welcomeBar: {
     backgroundColor: '#308DE9',
     width: '100%',
     paddingTop: 35,
     padding: 10,
     paddingHorizontal: 20,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'flex-start',
     height: 100,
   },
   welcomeText: {
     fontSize: 30,
     fontWeight: '500',
     color: '#FFF',
     marginLeft: 20
   },
   logo: {
     width: 50,
     height: 50
   },
   title: {
     fontSize: 36,
     fontWeight: '700',
     color: '#FFF',
     paddingTop: 30
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