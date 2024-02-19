import React from "react";
import styles from "../styles";
import { View, Button } from "react-native";

const Controls = ({ isRunning, onPause, onResume, onRestart }) => {
  return (
    <View style={styles.controls}>
      <Button
        onPress={() => (isRunning ? onPause : onResume)}
        title={isRunning ? "Pause" : "Resume"}
      />
      <Button onPress={onRestart} title="Restart" />
    </View>
  );
};

export default Controls;
