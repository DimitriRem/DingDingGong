import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, KeyboardAvoidingView } from "react-native";
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

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: "#335",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <TimerList
        settings={settings}
        setSettings={setSettings}
        onDelete={handleDeleteSetting}
        onStart={handleStartSetting}
      />
      {activeSetting && <ActiveTimer setting={activeSetting} />}
    </KeyboardAvoidingView>
  );
};

export default App;
