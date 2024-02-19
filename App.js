import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View } from "react-native";
import styles from "./styles";

import TimerList from "./components/TimerList";
import ActiveTimer from "./components/ActiveTimer";

const STORAGE_KEY = "@DingDingGong:settings";

const App = () => {
  const [settings, setSettings] = useState([]);
  const [activeSetting, setActiveSetting] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        const parsedSettings = data ? JSON.parse(data) : [];
        setSettings(parsedSettings);
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch (error) {
        console.error("Error saving settings:", error);
      }
    };

    saveSettings();
  }, [settings]);

  const handleDeleteSetting = async (settingId) => {
    const newSettings = settings.filter((s) => s.id !== settingId);
    setSettings(newSettings);
  };

  const handleStartSetting = (setting) => {
    setActiveSetting(setting);
  };

  const handlePauseTimer = () => {
    // Check if there's an active timer
    if (activeSetting) {
      // Pass necessary information to ActiveTimer component to pause
      setActiveSetting((prevSetting) => ({
        ...prevSetting,
        isRunning: false, // Update isRunning state
      }));
    } else {
      // Handle scenario where there's no active timer to pause
      console.warn("No active timer to pause");
    }
  };

  const handleResumeTimer = () => {
    // Resume logic for active timer
  };

  const handleRestartTimer = () => {
    // Restart logic for active timer
  };

  return (
    <View style={styles.container}>
      <TimerList
        settings={settings}
        setSettings={setSettings}
        onDelete={handleDeleteSetting}
        onStart={handleStartSetting}
      />
      {activeSetting && (
        <ActiveTimer
          setting={activeSetting}
          onPause={handlePauseTimer}
          onResume={handleResumeTimer}
          onRestart={handleRestartTimer}
        />
      )}
    </View>
  );
};

export default App;
