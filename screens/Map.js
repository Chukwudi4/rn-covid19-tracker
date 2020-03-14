import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, Modal } from "react-native";
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
import Spinner from 'react-native-loading-spinner-overlay'
import {useNavigation} from '@react-navigation/native'
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";

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
  const [modal, setModal] = useState(false)
  const [results, setResults] = useState([])
  const navigation = useNavigation()
  let mapRef = useRef(null);

  async function loadLatest() {
    setLoading(true);
    let latest = await fetchLatest();
    report.latest = latest;
    setLoading(false);
    mapRef.current.animateToRegion(
      {
        latitude: latest[count].location.lat,
        longitude: latest[count].location.lng,
        latitudeDelta: 10,
        longitudeDelta: 10
      },
      500
    );
    
  }

  function searchCity(country) {

    if(country.length < 2){
      return ;
    }

    for (let index = 0; index < report.latest.length; index++) {
      if (report.latest[index].countryregion.search(country) != -1) {
        results.push({city: report.latest[index], index: index})
        setResults(results);
      }
    }

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
    clearResult();
  }, [a]);

  function clearResult() {
    navigation.addListener('blur', ()=> {
      report.latest = []
    })
  }

  return (
    <View style={styles.container}>
      {/* <Modal
        visible={true}
      >
        <View>
          <View style={styles.searchView} >
            <TextInput onChangeText={text=> searchCity(text)} style={styles.searchInput} maxLength={15} placeholder="Search for a city" />
          </View>
          {
            results.map(item=> {
              let temp = item.city.provincestate === "" ? item.city.countryregion : `${item.city.provincestate}, ${item.city.countryregion}`
              return (
                <TouchableWithoutFeedback>
                  <View>
                    <Text>{temp}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            })
          }
        </View>
      </Modal> */}
      
{/*       <View style={styles.searchView} >
        <TextInput onChangeText={text=> searchCity(text)} style={styles.searchInput} maxLength={15} placeholder="Search for a city" />
      </View> */}
      <Spinner
        visible={isLoading}
      />
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
      <Fab onPress={() => loadLatest()} position="bottomLeft">
        <Icon type="MaterialIcons" name="refresh" color="#fff" />
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
  searchView: {
    width: w(80),
    top: h(15),
    borderRadius: w(1),
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    position: "absolute",
    backgroundColor: '#fff',
    zIndex: 1221
  },
  searchInput: {
    fontSize: w(5),
    color: "#000",
    width: w(75),
    margin: w(3),
    
  },
  subView: {
    position: 'absolute',
    top: w(15),
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
