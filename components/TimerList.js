import React, { useState } from "react";
import styles from "../styles";
import { View, Text, TextInput, Button, FlatList } from "react-native";

const TimerList = ({ settings, setSettings, onDelete, onStart }) => {
  const [isAddingNewSetting, setIsAddingNewSetting] = useState(false);
  const [newNumberIntervals, setNewNumberIntervals] = useState(1);
  const [newIntervalLength, setNewIntervalLength] = useState(30); // In seconds
  const [newName, setNewName] = useState("");

  const handleAddNewSetting = () => {
    setIsAddingNewSetting(true);
  };

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
    <View>
      <h2>Saved Timer Settings</h2>
      <FlatList
        data={settings}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>
              {item.name}: {item.numberIntervals} intervals x{" "}
              {item.intervalLength}
            </Text>
            <Button title="Start" onPress={() => onStart(item)} />
            <Button title="Delete" onPress={() => onDelete(item.id)} />
          </View>
        )}
      />
      {isAddingNewSetting && (
        <View>
          <View style={styles.createTimer}>
            <Text>
              <h3>Create Timer:</h3>
            </Text>
            <Text>Name:</Text>
            <TextInput
              style={styles.textInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Name"
            />
            <Text>Number of intervals:</Text>
            <TextInput
              style={styles.textInput}
              value={newNumberIntervals}
              onChangeText={setNewNumberIntervals}
              inputMode="numeric"
              placeholder="Number of intervals"
            />
            <Text>Interval Duration (minutes):</Text>
            <TextInput
              style={styles.textInput}
              inputMode="numeric"
              value={newIntervalLength}
              onChangeText={setNewIntervalLength}
              placeholder="Duration (minutes)"
            />
            <Button title="Save" onPress={handleSaveNewSetting} />
            <Button title="Cancel" onPress={handleCancelNewSetting} />
          </View>
        </View>
      )}
      <Button title="Add New" onPress={handleAddNewSetting} />
    </View>
  );
};

export default TimerList;
