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

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

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
  // BOTTOM SHEET
  // ref
  const bottomSheetModalRef = useRef(BottomSheetModal);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(
    (index) => {
      if (index == 1) {
        setModal(true);
      } else if (index == -1) {
        setModal(false);
      }
    },
    [modal]
  );
  // BOTTOM SHEET END

  const trashList = [
    {
      latlng: {
        latitude: 51.9194,
        longitude: 19.1451,
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
    {
      latlng: {
        latitude: 51.7194,
        longitude: 19.0451,
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
          title={marker.title}
          description={marker.description}
          onPress={(e) => console.log(e.nativeEvent)}
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
    console.log(location.coords);
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
      <BottomSheetModalProvider>
        <View style={styles.drawerContainer}>
          <Button
            onPress={handlePresentModalPress}
            title="Present Modal"
            color="black"
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View style={styles.drawerContentContainer}>
              <Text>Awesome</Text>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
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
  drawerContainer: {
    position: "absolute",
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  drawerContentContainer: {
    flex: 1,
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
