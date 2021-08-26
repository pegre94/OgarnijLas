import { Text } from "react-native";

import React from "react";

const AddMarker = ({ data }) => {
  if (data == "plus") {
    return <Text>Test</Text>;
  } else if ("marker" in data) {
    const markerData = data["marker"];
    return <Text>{markerData.description}</Text>;
  }

  return <Text>None</Text>;
};

export default AddMarker;
