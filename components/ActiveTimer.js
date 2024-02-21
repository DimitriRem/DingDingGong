import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import styles from "../styles";
import { View, Text, Button, Animated } from "react-native";

const ActiveTimer = ({ setting }) => {
  const [remainingIntervals, setRemainingIntervals] = useState(
    setting.numberIntervals
  );
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const intervalAnimation = useRef(new Animated.Value(0)).current;
  const bellSound = useRef();

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/bell.mp3")
      );
      bellSound.current = sound;
    };
    loadSound();

    return () => {
      if (bellSound.current) {
        bellSound.current.unloadAsync();
      }
    };
  }, []);

  const handleStart = () => {
    console.log("handleStart started");
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
        intervalAnimation.setValue(0);
      }
    }, setting.intervalLength * 1000); // Convert to milliseconds
    setIntervalId(interval);
    progressAnimation();
  };

  const handleStop = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    }
  };

  const playSound = async (soundName) => {
    if (soundName === "bell" && bellSound.current) {
      await bellSound.current.replayAsync();
    }
  };

  const linearEasing = (progress) => {
    return progress;
  };

  const progressAnimation = () => {
    Animated.timing(intervalAnimation, {
      toValue: 100,
      duration: setting.intervalLength * 1000 * setting.numberIntervals,
      easing: linearEasing,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Text>Active Timer</Text>
      <View id="progressBar" style={styles.progressBar}>
        <View style={styles.intervalScale}>
          {Array.from({ length: setting.numberIntervals }).map((_, index) => (
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
      {isRunning ? (
        <Button onPress={handleStop} title="Stop" />
      ) : (
        <Button onPress={handleStart} title="Start" />
      )}
    </View>
  );
};

export default ActiveTimer;
