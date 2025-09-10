import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView, StyleSheet,Button } from "react-native";
import {fetchSchedule} from './parser'
import { Picker } from "@react-native-picker/picker";
import {COLORS} from "./constans/ui"
import ButtonDay from "./components/ButtonDay.jsx";
function getDay(){
    let day={
      group:"",

    }
}
export default function App() {
  const [schedule, setSchedule] = useState([]);
  const [cours, setSelectedCours] = useState("");
  const [day, setSelectedDay] = useState("");
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

  let day_i = {
    "Пн":4,
    "Вт": 19,
    "Ср": 34,
    "Чт": 49,
    "Пт": 64,
    "Сб": 79,

  }

  let d = 15;
  let start = 4
  let days = ["Понеділок","Вівторок","Середа","Четвер", "П'ятниця", "Субота"];
  let cours_j = groups[cours];
  let index = day_i[day];
  let text = day;
  let days_index = 0;

  for(let i = index; i<index+15;i++){
    if(schedule[i][cours_j]===undefined){
      text+=days[days_index++]+'\n';
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
          onValueChange={(itemValue, itemIndex) => setSelectedCours(itemValue)}
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
          <ButtonDay title={"Пн"} setValue={()=>setSelectedDay("Пн")} />
          <ButtonDay title={"Вт"} setValue={()=>setSelectedDay("Вт")}/>
          <ButtonDay title={"Ср"} setValue={()=>setSelectedDay("Ср")}/>
          <ButtonDay title={"Чт"} setValue={()=>setSelectedDay("Чт")}/>
          <ButtonDay title={"Пт"} setValue={()=>setSelectedDay("Пт")}/>
          <ButtonDay title={"Сб"} setValue={()=>setSelectedDay("Сб")}/>
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
