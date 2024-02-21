import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bbb",
  },
  subHead: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  settingName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#55f",
  },
  actionButton: {
    borderRadius: 3,
    backgroundColor: "#5555ff",
    padding: 10,
    alignItems: "center",
    minWidth: 100,
  },
  cancelButton: {
    borderRadius: 3,
    backgroundColor: "#888",
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  flatList: {
    width: "100%",
  },
  timerText: {
    fontSize: 30,
    marginBottom: 20,
  },

  timersContainer: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#ccf",
    overflow: "auto",
    marginBottom: 20,
    alignItems: "center",
  },
  activeContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#ccf",
    marginBottom: 20,
    alignItems: "center",
  },

  createTimer: {
    marginBottom: 20,
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
  },
  fieldRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: "100%",
    justifyContent: "center",
  },
  fieldRowLeft: {
    textAlign: "right",
    alignItems: "flex-end",
    flexGrow: 1,
    maxWidth: "50%",
    minWidth: "50%",
  },
  fieldRowRight: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexGrow: 1,
  },
  savedTimers: {
    marginBottom: 20,
  },
  activeTimer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#ddf",
    width: 50,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  listItem: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  listText: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    gap: 5,
  },
  progressBar: {
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
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
    backgroundColor: "#bbbbff",
    width: "100%",
    padding: 0,
  },
  interval: {
    height: 20,
    backgroundColor: "#5555ff",
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
