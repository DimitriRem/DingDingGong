import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import styles from "../styles";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import { View, Text, Button } from "react-native";

const ActiveTimer = ({ setting, onPause, onResume, onRestart }) => {
  const [remainingIntervals, setRemainingIntervals] = useState(
    setting.numberIntervals
  );
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const handleStart = () => {
    setIsRunning(true);
    let countInterval = setting.numberIntervals;
    const interval = setInterval(() => {
      if (countInterval > 1) {
        playSound("bell");
        countInterval--;
        setRemainingIntervals(countInterval);
      } else {
        playSound("gong");
        clearInterval(interval);
        setIntervalId(null);
        setIsRunning(false);
      }
    }, setting.intervalLength * 1000); // Convert to milliseconds
    setIntervalId(interval);
  };

  const handleStop = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [intervalId]);

  const playSound = async (soundName) => {
    const { sound } = await Audio.Sound.createAsync({
      uri: `../assets/${soundName}.mp3`,
    });
    await sound.playAsync();
  };

  return (
    <View>
      <Text>Active Timer</Text>
      <ProgressBar
        isRunning={isRunning}
        totalIntervals={setting.numberIntervals}
        intervalLength={setting.intervalLength}
        remainingIntervals={remainingIntervals}
      />
      {isRunning ? (
        <Button onPress={handleStop} title="Stop" />
      ) : (
        <Button onPress={handleStart} title="Start" />
      )}
    </View>
  );
};

export default ActiveTimer;
