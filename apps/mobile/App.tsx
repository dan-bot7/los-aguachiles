import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.kicker}>Los Aguachiles</Text>
        <Text style={styles.title}>App móvil preparada</Text>
        <Text style={styles.copy}>
          Esta base queda lista para conectar menú, pick-up, sucursales y pedidos desde la API del monorepo.
        </Text>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF7FF",
    padding: 24
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    padding: 24,
    shadowColor: "#092D5C",
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 }
  },
  kicker: {
    color: "#EE1717",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  title: {
    marginTop: 10,
    color: "#092D5C",
    fontSize: 30,
    fontWeight: "900"
  },
  copy: {
    marginTop: 12,
    color: "#334155",
    fontSize: 16,
    lineHeight: 23
  }
});
