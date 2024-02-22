import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import styles from "../styles";
import { View, Text, Animated, Pressable } from "react-native";

const ActiveTimer = ({ setting }) => {
  const [remainingIntervals, setRemainingIntervals] = useState(
    setting.numberIntervals
  );
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalAnimation = useRef(new Animated.Value(0)).current;
  const bellSound = useRef();
  const gongSound = useRef();

  useEffect(() => {
    const loadBellSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/bell.mp3")
      );
      bellSound.current = sound;
    };
    const loadGongSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/gong.mp3")
      );
      gongSound.current = sound;
    };
    loadBellSound();
    loadGongSound();

    return () => {
      if (bellSound.current) {
        bellSound.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    let intervalId;
    if (startTime) {
      intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        setElapsedTime(elapsedTime);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime]);

  const startTimer = () => {
    setStartTime(new Date().getTime());
  };

  const stopTimer = () => {
    setStartTime(null);
    setElapsedTime(0);
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    startTimer();
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
        stopTimer();
        intervalAnimation.setValue(0);
      }
    }, setting.intervalLength * 1000);
    setIntervalId(interval);
    progressAnimation();
  };

  const handleStop = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
      stopTimer();
      intervalAnimation.setValue(0);
    }
  };

  const playSound = async (soundName) => {
    if (soundName === "bell" && bellSound.current) {
      await bellSound.current.replayAsync();
    } else if (soundName === "gong" && gongSound.current) {
      await gongSound.current.replayAsync();
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
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.activeContainer}>
      <Text style={styles.settingName}>
        {setting.name}: {setting.numberIntervals} x {setting.intervalLength}{" "}
        seconds
      </Text>
      <View id="progressBar" style={styles.progressBar}>
        <View style={styles.intervalScale}>
          {Array.from({ length: setting.numberIntervals }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.intervalScaleItem,
                index === 0 && styles.firstIntervalScaleItem,
              ]}
            ></View>
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

      <View>
        <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
      </View>

      {isRunning ? (
        <Pressable
          onPress={handleStop}
          title="Stop"
          style={styles.actionButton}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={handleStart}
          title="Start"
          style={styles.actionButton}
        >
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ActiveTimer;
