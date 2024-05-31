import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";

export default function Cuidados() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Image
            source={require("../../assets/cuidados01.png")}
            style={styles.logo}
          />

          <View
            style={{
              alignItems: "stretch",
              paddingHorizontal: 5,
              paddingVertical: 10,
              rowGap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                lineHeight: 24,
                color: "#FFFFFF",
              }}
            >
              Contraiu dengue ou suspeita estar infectado, mas não sabe quais
              são os sintomas e cuidados necessários?
            </Text>
            <Text style={{ fontSize: 18, fontWeight: 400, color: "#FFFFFF" }}>
              Acompanhe algumas de nossas dicas:
            </Text>
          </View>
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
    backgroundColor: "#A2C9F0",
    paddingTop: 60,
    height: "100%",
    width: "100%",
  },
  content: {
    alignSelf: "center",
    flex: 1,
    width: 380,
    height: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 23,
  },
});
