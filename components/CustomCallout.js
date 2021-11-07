import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, View } from "react-native";

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

function CustomCallout(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.bubble}>
        <View style={styles.amount}>{props.children}</View>
      </View>
    </View>
  );
}

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-start",
  },
  bubble: {
    width: "auto",
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#00000070",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: "#000",
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
  },
});

export default CustomCallout;
