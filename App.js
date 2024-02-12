import React, { useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

const App = () => {
  const [timerSettings, setTimerSettings] = useState([]);
  const [activeTimer, setActiveTimer] = useState(null);
  const [progress, setProgress] = useState(null);

  const settingNameRef = useRef("");
  const durationRef = useRef(null);
  const intervalsRef = useRef(null);
  const progressIndicatorRef = useRef(null);
  const sounds = [require("./assets/bell.mp3"), require("./assets/gong.mp3")];

  const handlePlaySound = async (soundNumber) => {
    const soundObj = new Audio.Sound();
    try {
      let source = sounds[soundNumber];
      await soundObj.loadAsync(source);
      await soundObj
        .playAsync()
        .then(async (playbackStatus) => {
          setTimeout(() => {
            soundObj.unloadAsync();
          }, playbackStatus / playableDurationMillis);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = () => {
    const settingName = settingNameRef.current.value;
    const durationInMSecs = parseFloat(durationRef.current.value);
    const intervals = parseFloat(intervalsRef.current.value);
    const totalDurationInMSecs = durationInMSecs * intervals;
    const key = `timer-${Date.now()}`;
    createTimer(
      settingName,
      durationInMSecs,
      intervals,
      totalDurationInMSecs,
      key
    );
  };

  const loadSavedTimers = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const timerKeys = allKeys.filter((key) => key.startsWith("timer-"));

      const loadedTimers = [];
      for (const key of timerKeys) {
        try {
          const timerData = await AsyncStorage.getItem(key);
          if (timerData) {
            const parsedTimer = JSON.parse(timerData);
            loadedTimers.push(parsedTimer);
          }
        } catch (error) {
          console.error("Error loading timer:", error);
        }
      }

      setTimerSettings(loadedTimers);
    } catch (error) {
      console.error("Error retrieving timers:", error);
    }
  };

  useEffect(() => {
    loadSavedTimers();
  }, []);

  const createTimer = async (
    settingName,
    durationInMSecs,
    intervals,
    totalDurationInMSecs,
    key
  ) => {
    const newSetting = {
      settingName,
      durationInMSecs,
      intervals,
      totalDurationInMSecs,
      key,
    };

    setTimerSettings((prevSettings) => [...prevSettings, newSetting]);

    const timerToSave = JSON.stringify(newSetting);

    try {
      await AsyncStorage.setItem(newSetting.key, timerToSave);
      console.log("Timer saved successfully!");
    } catch (error) {
      console.error("Error saving timer:", error);
    }
  };

  const deleteTimer = async (item) => {
    // Remove the timer from state
    setTimerSettings((prevSettings) => prevSettings.filter((t) => t !== item));

    // Retrieve the key for the deleted timer

    // Delete the timer data from AsyncStorage
    try {
      await AsyncStorage.removeItem(item.key);
      console.log("Timer deleted successfully!");
    } catch (error) {
      console.error("Error deleting timer:", error);
      // Handle the error appropriately
    }
  };

  // Function to start a timer based on a setting

  const startTimer = (setting) => {
    // Clear any existing timer if needed
    if (setting.intervalId) {
      clearInterval(setting.intervalId);
    }
    setting.startTime = Date.now();
    setActiveTimer(setting);

    let intervalDuration = setting.durationInMSecs;
    let noOfIntervals = setting.intervals;
    let currentInterval = 1;

    const checkIntervals = (elapsedTime) => {
      elapsedTime < intervalDuration * noOfIntervals
        ? elapsedTime >= intervalDuration * currentInterval
          ? (handlePlaySound(0), currentInterval++)
          : null
        : (handlePlaySound(1), clearInterval(intervalId));
    };

    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - setting.startTime;

      const progress = Math.min(
        (elapsedTime / setting.totalDurationInMSecs) * 100,
        100
      ); // Ensure progress stays within 0-100%
      checkIntervals(elapsedTime, setting);

      progressIndicatorRef.current.value = progress;
    }, 1000); // Update progress every second

    // Store the interval ID for reference
    setting.intervalId = intervalId;
  };

  // Function to stop the active timer
  const pauseTimer = (setting) => {
    const currentTimer = activeTimer; // Get the current active timer

    if (currentTimer) {
      // If the timer is running (intervalId is set), pause it
      if (currentTimer.intervalId) {
        clearInterval(currentTimer.intervalId);
        currentTimer.intervalId = null; // Clear the intervalId
        setActiveTimer({ ...currentTimer, isPaused: true }); // Mark as paused
      } else if (currentTimer.isPaused) {
        // If the timer is paused, resume it
        const remainingTime =
          currentTimer.totalDurationInMSecs -
          (Date.now() - currentTimer.startTime);
        const intervalId = setInterval(() => {
          // Re-use the progress update logic from the startTimer function
          // ... (existing logic from startTimer)
          const progress = Math.min(
            (remainingTime / setting.totalDurationInMSecs) * 100,
            100
          ); // Ensure progress stays within 0-100%
          checkIntervals(remainingTime);

          progressIndicatorRef.current.value = progress;
        }, 1000);

        currentTimer.intervalId = intervalId;
        setActiveTimer({ ...currentTimer, isPaused: false }); // Mark as unpaused
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.createTimer}>
        <Text>
          <h3>Create Timer:</h3>
        </Text>
        <Text>Name:</Text>
        <TextInput
          style={styles.textInput}
          ref={settingNameRef}
          placeholder="Name"
        />
        <Text>Number of intervals:</Text>
        <TextInput
          style={styles.textInput}
          ref={intervalsRef}
          inputMode="numeric"
          placeholder="Number of intervals"
        />
        <Text>Interval Duration (minutes):</Text>
        <TextInput
          style={styles.textInput}
          inputMode="numeric"
          ref={durationRef}
          placeholder="Duration (minutes)"
        />

        <Button title="Create Timer" onPress={handleFormSubmit} />
      </View>
      <View style={styles.savedTimers}>
        <Text>
          <h3>Saved Timers:</h3>
        </Text>

        <FlatList
          data={timerSettings}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>
                {item.settingName}: {item.intervals} intervals x{" "}
                {item.durationInMSecs} msecs each ={item.totalDurationInMSecs}{" "}
                msecs total.
              </Text>
              <Button title="Start" onPress={() => startTimer(item)} />
              <Button title="Delete" onPress={() => deleteTimer(item)} />
            </View>
          )}
        />
      </View>
      <View style={styles.activeTimer}>
        <Text>
          <h3>Active Timer:</h3>
        </Text>
        <Text>Progress: {progress}%</Text>
        <TextInput ref={progressIndicatorRef} style={styles.textInput} />
        <Button title="Stop" onPress={pauseTimer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  createTimer: {
    marginBottom: 20,
  },
  savedTimers: {
    marginBottom: 20,
  },
  activeTimer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#dddddd",
    width: 100,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
  },
});

export default App;
