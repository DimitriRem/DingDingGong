import React, { useRef } from "react";
import styles from "../styles";
import { Animated, Easing, View } from "react-native";

const ProgressBar = ({ isRunning, totalIntervals, intervalLength }) => {
  const intervalAnimation = new Animated.Value(0);
  const linearEasing = (progress) => {
    return progress;
  };
  isRunning
    ? Animated.timing(intervalAnimation, {
        toValue: 100,
        duration: intervalLength * 1000 * totalIntervals,
        easing: linearEasing,
        useNativeDriver: true,
      }).start()
    : intervalAnimation.setValue(0);

  return (
    <>
      <View id="progressBar" style={styles.progressBar}>
        <View style={styles.intervalScale}>
          {Array.from({ length: totalIntervals }).map((_, index) => (
            <View key={index} style={styles.intervalScaleItem}></View>
          ))}
        </View>
        <View style={styles.intervalBG}>
          <Animated.View
            style={[
              styles.interval,
              {
                width: intervalAnimation.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
      </View>
    </>
  );
};

export default ProgressBar;
