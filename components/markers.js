const TrashMarkers = (trashList) => {
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
        {/* <MapView.Callout tooltip> */}
        {/*   <TouchableHighlight */}
        {/*     onPress={() => this.markerClick()} */}
        {/*     underlayColor="#dddddd" */}
        {/*   > */}
        {/*     <View> */}
        {/*       <Text> */}
        {/*         {marker.title} */}
        {/*         {"\n"} */}
        {/*         {marker.description} */}
        {/*       </Text> */}
        {/*     </View> */}
        {/*   </TouchableHighlight> */}
        {/* </MapView.Callout> */}
      </Marker>
    );
  });
};
