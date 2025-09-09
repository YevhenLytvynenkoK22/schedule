import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView, StyleSheet,Button } from "react-native";
import {fetchSchedule} from './parser'
import { Picker } from "@react-native-picker/picker";
import {COLORS} from "./constans/ui"
import ButtonDay from "./components/ButtonDay.jsx";
export default function App() {
  const [schedule, setSchedule] = useState([]);
  const [cours, setSelectedValue] = useState("");
  useEffect(() => {
    (async () => {
      const data = await fetchSchedule(
        "https://stud.server.odessa.ua/holovna/rozklad-zaniat/"
      );
      setSchedule(data);
    })();
  }, []);

let groups = schedule[3]
  ? schedule[3].reduce((acc, cell, index) => {
      if (cell && cell.trim() !== "") {
        acc[cell.trim()] = index;
      }
      return acc;
    }, {})
  : {};

  let text = "Понеділок\n";

  let days = ["Вівторок","Середа","Четвер", "П'ятниця", "Субота"];
  let day_i = 0;
  let cours_j = groups[cours];


  for(let i = 4; i<schedule.length;i++){
    if(schedule[i][cours_j]===undefined){
      text+=days[day_i++]+'\n';
   
    }
    else{
      text+= schedule[i][cours_j]+'\n';
    }
  }

  return (
      <View style={styles.container}>
   <Picker
  style={styles.picker}
  selectedValue={cours}
  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
>
  {Object.entries(groups).map(([course, columnIndex]) => (
    <Picker.Item
      key={columnIndex}
      label={course}
      value={course}
    />
  ))}
</Picker>
  <View style = {{flexDirection:'row'}}>
    <ButtonDay title={"Пн"}/>
    <ButtonDay title={"Вт"}/>
    <ButtonDay title={"Ср"}/>
    <ButtonDay title={"Чт"}/>
    <ButtonDay title={"Пт"}/>
    <ButtonDay title={"Сб"}/>
  </View>
        <ScrollView>
          <Text>{text}</Text>
        </ScrollView>
      </View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: COLORS.BACKGROUND_COLOR, marginTop:20,  },
  picker: {backgroundColor: COLORS.SECONDARY_COLOR, width:150, color: COLORS.PRIMARY_COLOR}

});
