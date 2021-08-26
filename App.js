import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import { FAB } from "react-native-paper";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
import AddMarker from "./components/addMarker";

export default function App() {
  const [region, setRegion] = useState({
    latitude: 52.1127,
    longitude: 19.2119,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentProps, setCurrentProps] = useState(false);

  function toggle(data) {
    setCurrentProps(data);
    console.log(data);
    setVisible((visible) => !visible);
  }
  const trashList = [
    {
      latlng: {
        latitude: 54.540406,
        longitude: 18.541683,
      },
      title: "test",
      description: "test description",
    },
    {
      latlng: {
        latitude: 51.4194,
        longitude: 19.2451,
      },
      title: "test",
      description: "test description",
    },
  ];

  const TrashMarkers = () => {
    return trashList.map((marker, index) => {
      return (
        <Marker
          key={index}
          coordinate={marker.latlng}
          onPress={() => toggle({ marker })}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={32}
            color="black"
          />
        </Marker>
      );
    });
  };
  const getLocation = async (d1) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    if (errorMsg) {
      console.log(errorMsg);
    } else if (location) {
      let coords = location.coords;
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: d1,
        longitudeDelta: d1,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
        style={styles.map}
        onMapReady={() => getLocation(0.005)}
      >
        <TrashMarkers />
      </MapView>
      <View style={styles.fabs}>
        <FAB
          icon="crosshairs-gps"
          style={{
            flex: 1,
            marginBottom: 14,
          }}
          onPress={() => getLocation(0.002)}
        />
        <FAB icon="plus" style={{ flex: 1 }} onPress={() => toggle("plus")} />
      </View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}
      >
        <View style={styles.card}>
          <AddMarker data={currentProps} />
        </View>
      </BottomSheet>
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
  card: {
    backgroundColor: "#fff",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
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
