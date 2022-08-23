import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import axios from "axios";
import { api_main } from "../../constants/Api_main";
import { api_path } from "../../constants/Api_path";
const windowWidth = Dimensions.get("window").width;

var end_data;
var start_data;
var time_;

const Temp = ({ date, time_select, itemId }) => {
  var line = [];
  var min = [];
  var max = [];
  var traget = [];

  const [line_y, setLine_y] = useState(line);
  const [min_y, setMin_y] = useState(min);
  const [max_y, setMax_y] = useState(max);
  const [traget_y, setTraget_y] = useState(traget);

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    // // console.log("time ", d);
    return (
      [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/") +
      "," +
      [pad(d.getHours()), pad(d.getMinutes() + 1)].join(":")
    );
  }

  const get_brixline = (api, id, start, end, time) => {
    // // console.log(start + " _ " + end);
    let endpoints = [
      api + api_path.templine + id + "/" + start + "/" + end + "/" + time,
      api + api_path.templinemin + id + "/" + start + "/" + end,
      api + api_path.templinemax + id + "/" + start + "/" + end,
      api + api_path.templinetarget + id + "/" + start + "/" + end,
    ];
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(
        axios.spread((...allData) => {
          var obj;
          var obj2;
          var obj3;
          var obj4;
          if (allData[1].data.data[0]) {
            obj = {
              value: allData[0].data.data[0].value,
              label: 0,
            };
            line.push(obj);

            obj2 = {
              value: allData[1].data.data[0].min,
            };
            min.push(obj2);

            obj3 = {
              value: allData[2].data.data[0].max,
            };
            max.push(obj3);

            obj4 = {
              value: allData[3].data.data[0].target,
            };
            traget.push(obj4);
          }

          if (allData[0].data.data) {
            const len = allData[0].data.data.length;
            if (len == 1) {
              //   line.push(obj);
              min.push(obj2);
              max.push(obj3);
              traget.push(obj4);
            }
            for (let i = 0; i < len; i++) {
              obj = {
                value: allData[0].data.data[i].value,
                label: convertDate(allData[0].data.data[i].time),
              };
              line.push(obj);
              min.push(obj2);
              max.push(obj3);
              traget.push(obj4);
            }
            setLine_y(line);
            setMin_y(min);
            setMax_y(max);
            setTraget_y(traget);
          }
        })
      )
      .catch((e) => {
        // console.log(e);
      });
  };

  function convertDate2(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    // // console.log("time ", d);
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
  }

  if (date.endDate && time_select) {
    const dateStart = JSON.stringify(date.startDate);
    const dateEnd = JSON.stringify(date.endDate);
    const resultdateStart = dateStart.slice(1, dateStart.length - 1);
    const resultdateEnd = dateEnd.slice(1, dateEnd.length - 1);

    const c_start = convertDate2(date.startDate);
    const c_end = convertDate2(date.endDate);

    const resultdateEndB = dateEnd.slice(1, dateEnd.length - 3);
    const resultdateStartB = dateStart.slice(1, dateStart.length - 3);

    // // console.log("sss");
    if (
      end_data != resultdateEndB ||
      start_data != resultdateStartB ||
      time_ != time_select
    ) {
      end_data = resultdateEndB;
      start_data = resultdateStartB;
      time_ = time_select;
      if (c_start == c_end) {
        var date = new Date(c_end);
        date.setDate(date.getDate() + 1);
        const new_date = JSON.stringify(date);
        const new_date_ = new_date.slice(1, new_date.length - 1);
        get_brixline(
          api_main.main_brix,
          itemId,
          resultdateStart,
          new_date_,
          time_select
        );
      } else {
        get_brixline(
          api_main.main_brix,
          itemId,
          resultdateStart,
          resultdateEnd,
          time_select
        );
      }
    }
  }
  // console.log("chart temp");

  return (
    <View style={styles.box_chart}>
      <Text style={styles.title}>Temp chart</Text>
      <View style={styles.in_chart}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ color: "#ff7300" }}>● min</Text>
          <Text style={{ color: "#8b0000" }}>● max</Text>
          <Text style={{ color: "#008b3f" }}>● line</Text>
          <Text style={{ color: "#000746" }}>● target</Text>
        </View>
        <LineChart
          data={line_y}
          color1="#008b3f"
          textColor1="#008b3f"
          dataPointsColor1="#008b3f"
          //
          data2={min_y}
          color2="#ff7300"
          dataPointsColor2="none"
          //
          data3={max_y}
          dataPointsColor3="none"
          color3="#8b0000"
          //
          data4={traget_y}
          dataPointsColor4="none"
          color4="#000746"
          //
          height={250}
          width={windowWidth - 80}
          spacing={125}
          initialSpacing={0}
          dataPointsHeight={6}
          dataPointsWidth={6}
          thickness={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box_chart: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingBottom: 5,
    marginBottom: 15,
  },
  title: {
    backgroundColor: "#000b6b93",
    textAlign: "center",
    padding: 5,
    paddingBottom: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: "#fff",
    fontSize: 16,
  },
  in_chart: {
    marginTop: -10,
    borderRadius: 5,
    paddingTop: 10,
    width: windowWidth - 20,
    backgroundColor: "#fff",
  },
});

export default Temp;
