import { StyleSheet } from "react-native";

/*
const palette = {
  '#001A6E',
  '#074799'
  '#009990'
  '#E1FFBB'
  }
*/

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#001A6E",
    height: "100%",
    overflow: "hidden",
  },
  text: {
    color: "#FFF",
    fontSize: 16,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#ececec",
    width: "95%",
    height: 56,
    color: "#000",
    fontSize: 16,
  },
  form: {
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  titleHeader: {
    color: "#fafafa",
    fontSize: 36,
    padding: 2,
    margin: 4,
    marginBottom: 14,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  horizontalScroll: {
    margin: 2,
    padding: 4,
  },
  textCard: {
    color: "#fafafa",
    backgroundColor: "#ececec",
    borderRadius: 2,
    padding: 4,
  },
});
