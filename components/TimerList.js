import React, { useState, useEffect } from "react";
import styles from "../styles";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";

const TimerList = ({ settings, setSettings, onDelete, onStart }) => {
  const [isAddingNewSetting, setIsAddingNewSetting] = useState(false);
  const [newNumberIntervals, setNewNumberIntervals] = useState(1);
  const [newIntervalLengthMins, setNewIntervalLengthMins] = useState(0);
  const [newIntervalLengthSecs, setNewIntervalLengthSecs] = useState(0);
  const [newIntervalLength, setNewIntervalLength] = useState(0); // In seconds
  const [newName, setNewName] = useState("");

  const handleAddNewSetting = () => {
    setIsAddingNewSetting(true);
  };

  useEffect(() => {
    const totalInSecs =
      parseInt(newIntervalLengthMins) * 60 + parseInt(newIntervalLengthSecs);
    setNewIntervalLength(totalInSecs);
  }, [newIntervalLengthMins, newIntervalLengthSecs]);

  const handleSaveNewSetting = () => {
    // Validation and creation of new setting object
    const newSetting = {
      id: Math.random().toString(36).substring(2, 15), // Generate unique ID
      numberIntervals: newNumberIntervals,
      intervalLength: newIntervalLength,
      name: newName,
    };
    setSettings([...settings, newSetting]); // Update settings in App.js
    // Persist settings to AsyncStorage
    setIsAddingNewSetting(false);
    setNewName("");
  };

  const handleCancelNewSetting = () => {
    setIsAddingNewSetting(false);
    setNewName("");
  };

  return (
    <View style={styles.timersContainer}>
      <Text style={styles.subHead}>Saved Timers</Text>
      <FlatList
        style={styles.flatList}
        data={settings}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.listText}>
              <Text style={styles.settingName}>{item.name} </Text>
              <Text>
                {item.numberIntervals} x {item.intervalLength} seconds
              </Text>
            </View>
            <Pressable
              style={styles.actionButton}
              title="Start"
              onPress={() => onStart(item)}
            >
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>
            <Pressable
              style={styles.cancelButton}
              title="Delete"
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
      {isAddingNewSetting && (
        <View>
          <View style={styles.createTimer}>
            <Text style={styles.subHead}>Create Timer</Text>

            <View style={styles.fieldRow}>
              <View style={styles.fieldRowLeft}>
                <Text>Name: </Text>
              </View>
              <View style={styles.fieldRowRight}>
                <TextInput
                  style={styles.textInput}
                  value={newName}
                  onChangeText={setNewName}
                  placeholder="Name"
                />
              </View>
            </View>
            <View style={styles.fieldRow}>
              <View style={styles.fieldRowLeft}>
                <Text>Number of intervals: </Text>
              </View>
              <View style={styles.fieldRowRight}>
                <TextInput
                  style={styles.textInput}
                  value={newNumberIntervals}
                  onChangeText={setNewNumberIntervals}
                  inputMode="numeric"
                  placeholder="Number of intervals"
                />
              </View>
            </View>
            <View style={styles.fieldRow}>
              <View style={styles.fieldRowLeft}>
                <Text>Interval Duration: </Text>
              </View>
              <View style={styles.fieldRowRight}>
                <TextInput
                  style={styles.textInput}
                  inputMode="numeric"
                  value={newIntervalLengthMins}
                  onChangeText={setNewIntervalLengthMins}
                  placeholder="minutes"
                />
                <Text>mins </Text>
                <TextInput
                  style={styles.textInput}
                  inputMode="numeric"
                  value={newIntervalLengthSecs}
                  onChangeText={setNewIntervalLengthSecs}
                  placeholder="seconds"
                />
                <Text>secs </Text>
              </View>
            </View>
            <View style={styles.fieldRow}>
              <Pressable
                style={styles.actionButton}
                title="Save"
                onPress={handleSaveNewSetting}
              >
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
              <Pressable
                title="Cancel"
                style={styles.cancelButton}
                onPress={handleCancelNewSetting}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
      <Pressable
        title="Add New"
        style={styles.actionButton}
        onPress={handleAddNewSetting}
      >
        <Text style={styles.buttonText}>Add New</Text>
      </Pressable>
    </View>
  );
};

export default TimerList;
