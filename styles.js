import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
  progressBar: {
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    width: 600,
  },
  intervalScale: {
    height: 8,
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  intervalScaleItem: {
    borderRightColor: "#0000FF",
    borderRightWidth: 2,
    flexGrow: 1,
  },

  intervalBG: {
    backgroundColor: "#aaaaff",
    width: "100%",
    padding: 0,
  },
  interval: {
    height: 20,
    backgroundColor: "#0000ff",
  },

  intervalCompleted: {
    backgroundColor: "#00ff00",
  },
  textIndicator: {
    marginLeft: 10,
  },
  controls: {},
});

export default styles;
