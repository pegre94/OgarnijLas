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
import { FAB, Avatar } from "react-native-paper";
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
  const [newMarker, setNewMarker] = useState(false);
  const [newMarkerCoord, setNewMarkerCoord] = useState(null);

  function toggle(data) {
    setCurrentProps(data);
    console.log(data);
    setVisible((visible) => !visible);
  }
  function toggleNewMarker() {
    setNewMarkerCoord({
      latitude: region.latitude,
      longitude: region.longitude,
    });
    setNewMarker((newMarker) => !newMarker);
    // toggle("plus");
  }

  const trashList = [
    {
      latlng: {
        latitude: 54.540406,
        longitude: 18.541683,
      },
      title: "Potłuczone szkło.",
      description:
        "Duża ilość rozbitego szkła, do posprzątania potrzebne będą grabie.",
      image_urls: [
        "https://i2-prod.walesonline.co.uk/news/article12621474.ece/ALTERNATES/s615/PDR_MAI_170217Lampeter_02JPG.jpg",
      ],
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
          <Avatar.Icon size={32} icon="trash-can-outline" />
        </Marker>
      );
    });
  };
  const DraggableMarker = () => {
    if (newMarker) {
      return (
        <Marker
          draggable
          coordinate={newMarkerCoord}
          onDragEnd={(e) => setNewMarkerCoord(e.nativeEvent.coordinate)}
        >
          <Avatar.Icon size={50} icon="trash-can-outline" />
        </Marker>
      );
    } else {
      return <View></View>;
    }
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
        <DraggableMarker />
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
        <FAB
          icon="plus"
          style={{ flex: 1 }}
          onPress={() => toggleNewMarker()}
        />
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
    padding: 10,
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
