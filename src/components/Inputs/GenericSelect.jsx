import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function GenericSelect({
  selected,
  onChange,
  fetchData,
  dataField,
  label,
}) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      const fetchedData = await fetchData();
      setItems(fetchedData || []);
      setLoading(false);
    };

    loadItems();
  }, [fetchData]);

  if (loading) return <ActivityIndicator size="small" color="#000" />;

  return (
    <View style={[styles.container]}>
      {label && (
        <Text style={[styles.modalTitle, { color: "#001A6E" }]}>{label}</Text>
      )}
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selected}
          onValueChange={onChange}
          style={styles.picker}
          dropdownIconColor="#000"
        >
          <Picker.Item label={placeholder} value="" color="#999" />
          {items.map((item) => (
            <Picker.Item
              key={item[dataField.id]}
              label={item[dataField.label]}
              value={String(item[dataField.value])}
              color="#000"
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pickerWrapper: {
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    height: Platform.OS === "ios" ? 180 : 50,
    color: "#000",
  },
});
