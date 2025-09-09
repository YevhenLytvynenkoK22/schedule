import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";
import {fetchSchedule} from './parser'
import { Picker } from "@react-native-picker/picker";
export default function App() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchSchedule(
        "https://stud.server.odessa.ua/holovna/rozklad-zaniat/"
      );
      setSchedule(data);
    })();
  }, []);

  let groups = schedule[3] ? schedule[3].filter(cell => cell && cell.trim() !== "") : [];
  
  return (
      <View style={styles.container}>
        <Picker>
          {groups.map(group => (
              <Picker.Item key={group} label={group} value={group} />
            ))}
        </Picker>
      </View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff", marginTop:20 },

});
