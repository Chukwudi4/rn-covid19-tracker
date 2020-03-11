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
const a = 0;
export const Brief = observer(() => {
  let [isLoading, setLoading] = useState(true);

  useEffect(() => {
    loadBrief();
  }, [a]);

  async function loadBrief() {
    setLoading(false);
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
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
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
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f0f0",
    width: w(100)
  },
  loadingText: {
    fontSize: w(5),
    textAlign: "center"
  }
});
