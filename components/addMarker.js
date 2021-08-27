import { View, Image } from "react-native";
import { Title, Text } from "react-native-paper";
import React from "react";

const AddMarker = ({ data }) => {
  if (data == "plus") {
    return <Text>Test</Text>;
  } else if ("marker" in data) {
    const markerData = data["marker"];
    return (
      <View>
        <Title>{markerData.title}</Title>
        <Text>{markerData.description}</Text>
        <Image
          style={{ width: 300, height: 300 }}
          source={{
            uri: "https://i2-prod.walesonline.co.uk/news/article12621474.ece/ALTERNATES/s615/PDR_MAI_170217Lampeter_02JPG.jpg",
          }}
        />
      </View>
    );
  }

  return <Text>None</Text>;
};

export default AddMarker;
