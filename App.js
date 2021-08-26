import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Dimensions } from "react-native";
import { FAB } from "react-native-paper";

import * as Location from "expo-location";
import MapView from "react-native-maps";

export default function App() {
  const [region, setRegion] = useState({
    latitude: 52.1127,
    longitude: 19.2119,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
        style={styles.map}
      />
      <View style={styles.fabs}>
        <FAB
          icon="plus"
          style={{
            flex: 1,
            marginBottom: 14,
          }}
          onPress={() => console.log("Pressed")}
        />
        <FAB
          icon="plus"
          style={{ flex: 1 }}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  fabs: {
    flex: 1,
    position: "absolute",
    margin: 24,
    right: 0,
    bottom: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
