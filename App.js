import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import CustomCallout from "./components/CustomCallout";

export default function App() {
  const [destinations, setDestinations] = useState([
    {
      latlng: { latitude: -36.96812, longitude: 174.86993 },
      title: "42 Kimpton Road",
      description: "My house",
    },
    {
      latlng: { latitude: -36.98812, longitude: 174.86652 },
      title: "10 Mepal Place",
      description: "My work",
    },
  ]);

  const [pin, setPin] = useState({
    latitude: -36.96812,
    longitude: 174.86993,
  });

  const [region, setRegion] = useState({
    latitude: -36.96812,
    longitude: 174.86993,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{ rankby: "distance" }}
        onPress={(data, details = null) => {
          console.log(data, details);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
        query={{
          key: "KEY",
          language: "en",
          components: "country:nz",
          types: "establishment",
          radius: 30000,
          location: `${region.latitude}, ${region.longitude}`,
        }}
        styles={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: "1",
          },
          listView: { backgroundColor: "#ffffff" },
        }}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -36.96812,
          longitude: 174.86993,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        {destinations &&
          destinations.length > 0 &&
          destinations.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            >
              <Callout
                alphaHitTest
                tooltip
                onPress={(e) => {
                  if (
                    e.nativeEvent.action === "marker-inside-overlay-press" ||
                    e.nativeEvent.action === "callout-inside-press"
                  ) {
                    return;
                  }

                  Alert.alert(marker.description);
                }}
              >
                <CustomCallout>
                  <Text style={styles.title}>{marker.title}</Text>
                  <Text style={styles.gps}>
                    {marker.latlng.latitude} {marker.latlng.longitude}
                  </Text>
                </CustomCallout>
              </Callout>
            </Marker>
          ))}
        <Marker
          coordinate={pin}
          pinColor="black"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinates);
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout
            onPress={(e) => {
              if (
                e.nativeEvent.action === "marker-inside-overlay-press" ||
                e.nativeEvent.action === "callout-inside-press"
              ) {
                return;
              }

              Alert.alert("Confirm");
            }}
          >
            <CustomCallout>
              <Text style={styles.title}>GPS Co-ordinates</Text>
              <Text style={styles.gps}>
                {pin.latitude} {pin.longitude}
              </Text>
            </CustomCallout>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  gps: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
});
