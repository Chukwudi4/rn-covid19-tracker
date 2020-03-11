import React, { useEffect, useState } from "react";
import { fetchBrief } from "../util/databank";
import { observer } from "mobx-react";
import { View, StyleSheet, Text } from "react-native";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from "react-native-responsive-screen";
import { report } from "../stores/recordStores";
import { colors } from "../config/keys";
import { Fab, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
const a = 0;
export const Brief = observer(() => {
  let [isLoading, setLoading] = useState(true);
  let navigation = useNavigation()

  useEffect(() => {
    loadBrief();
  }, [a]);

  async function loadBrief() {
    setLoading(true);
    let brief = await fetchBrief();
    report.brief = brief;
    console.log(rHeight());
    setLoading(false);
  }

  function rHeight() {
    let r = report.brief.recovered;
    let t = r + report.brief.deaths;
    return Math.round((r / t) * 100);
  }

  function dHeight() {
    let d = report.brief.deaths;
    let t = d + report.brief.recovered;
    return Math.round((d / t) * 100);
  }

  if (isLoading) {
    return (
      <View style={[styles.container, {flex: 1}]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if( typeof report.brief === undefined){
    return (
      <View style={[styles.container, {flex: 1}]}>
        <Fab onPress={() => loadBrief()} position="bottomLeft">
        <Icon type="MaterialIcons" name="refresh" color="#fff" />
      </Fab>
      </View>
    )
  }

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <View
        style={[
          styles.container,
          { height: h(33.3), backgroundColor: colors["confirmed"] }
        ]}
      >
        <Text style={[styles.loadingText, { color: "#fff" }]}>
          {report.brief.confirmed} confirmed cases
        </Text>
      </View>
      <View
        style={[
          styles.container,
          { height: h(33.3), backgroundColor: colors["recovered"] }
        ]}
      >
        <Text style={[styles.loadingText, { color: "#fff" }]}>
          {report.brief.recovered} recovered cases
        </Text>
      </View>
      <View
        style={[
          styles.container,
          { height: h(33.3), backgroundColor: colors["deaths"] }
        ]}
      >
        <Text style={[styles.loadingText, { color: "#fff" }]}>
          {report.brief.deaths} death cases
        </Text>
      </View>
      <Fab position='bottomRight' onPress={()=> navigation.navigate('Map')} >
        <Icon type='MaterialIcons' name="map" />
      </Fab>
      <Fab onPress={() => loadBrief()} position="bottomLeft">
        <Icon type="MaterialIcons" name="refresh" color="#fff" />
      </Fab>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors["confirmed"],
    width: w(100)
  },
  loadingText: {
    fontSize: w(5),
    textAlignVertical:"center",
    color: "#fff"
  }
});
