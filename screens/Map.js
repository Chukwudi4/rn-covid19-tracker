import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { fetchLatest } from "../util/databank";
import { report } from "../stores/recordStores";
import { Fab, Icon } from "native-base";
import {observer} from 'mobx-react'
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from "react-native-responsive-screen";
import { CUSTOM_MAPSTYLE } from "../config/mapstyle";

const a = 1;

function CustomCallout({ confirmed, deaths, recovered, title, style, provincestate }) {
  const header = provincestate === "" ? title : `${provincestate}, ${title}`  
  return (
    <View style={style} >
      <Text style={[styles.calloutText, styles.title]}>{header}</Text>
      <Text style={styles.calloutText}>Confirmed {confirmed}</Text>
      <Text style={styles.calloutText}>Recovered {recovered}</Text>
      <Text style={styles.calloutText}>Deaths {deaths}</Text>
    </View>
  );
}

export const Map= observer(()=> {
  const [isLoading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  let mapRef = useRef(null);

  async function loadLatest() {
    setLoading(false);
    let latest = await fetchLatest();
    report.latest = latest;
    mapRef.current.animateToRegion(
      {
        latitude: latest[count].location.lat,
        longitude: latest[count].location.lng,
        latitudeDelta: 10,
        longitudeDelta: 10
      },
      500
    );
    setLoading(false);
  }

  function nextMarker() {
    mapRef.current.animateToRegion(
      {
        latitude: report.latest[count + 1].location.lat,
        longitude: report.latest[count + 1].location.lng,
        latitudeDelta: 10,
        longitudeDelta: 10
      },
      500
    );
    setCount(count + 1);
  }

  useEffect(() => {
    loadLatest();
  }, [a]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        ref={mapRef}
        customMapStyle={CUSTOM_MAPSTYLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 10,
          longitudeDelta: 10
        }}
      >
        {report.latest.map((item, index) => {
          var {
            provincestate,
            countryregion,
            location,
            confirmed,
            recovered,
            deaths
          } = item;
          var state = provincestate === "" ? "" : `${provincestate}, `;
          return (
            <Marker
              title={`${state}${countryregion}`}
              key={index}
              onPress={()=> setCount(index)}
              coordinate={{ latitude: location.lat, longitude: location.lng }}/>
          );
        })}
      </MapView>
      {report.latest.length === 0 ? null : (
        <CustomCallout
          provincestate={report.latest[count].provincestate}
          title={report.latest[count].countryregion}
          confirmed={report.latest[count].confirmed}
          deaths={report.latest[count].deaths}
          recovered={report.latest[count].recovered}
          style={styles.subView}
        />
      )}
      <Fab onPress={() => nextMarker()} position="bottomRight">
        <Icon type="MaterialIcons" name="navigate-next" color="#fff" />
      </Fab>
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  calloutText: {
    fontSize: w(4),
    marginVertical: w(0.5),
    marginHorizontal: w(1)
  },
  title: {
    fontWeight: "bold",
    marginBottom: w(2)
  },
  subView: {
    position: 'absolute',
    bottom: w(5),
    left: w(5),
    backgroundColor: '#fff',
    padding: w(2),
    width: undefined,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: w(2),
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4
  }
});
