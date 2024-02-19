import React, { useState } from "react";
import styles from "../styles";

const TimerSetting = ({
  numberIntervals,
  intervalLength,
  name,
  onDelete,
  onEdit,
}) => {
  const [editing, setEditing] = useState(false);
  const [newNumberIntervals, setNewNumberIntervals] = useState(numberIntervals);
  const [newIntervalLength, setNewIntervalLength] = useState(intervalLength);

  const handleSave = () => {
    // Validate new values and potentially trigger onEdit prop with updated data
    // ...
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setNewNumberIntervals(numberIntervals);
    setNewIntervalLength(intervalLength);
  };

  return (
    <div>
      {editing ? (
        <form>
          {/* Input fields for numberIntervals and intervalLength */}
          <button onPress={handleSave}>Save</button>
          <button onPress={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div>
          <span>Name: {name}</span>
          <span>Number of intervals: {numberIntervals}</span>
          <span>Interval length: {intervalLength} seconds</span>
          <button onPress={onDelete}>Delete</button>
          <button onPress={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default TimerSetting;
