// import { View, Text, StyleSheet, Dimensions ,ScrollView} from "react-native";
// import React, { useState, useEffect } from "react";
// // import { LineChart } from "react-native-gifted-charts";
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from "react-native-chart-kit";

// import axios from "axios";
// import { api_main } from "../../constants/Api_main";
// import { api_path } from "../../constants/Api_path";
// const windowWidth = Dimensions.get("window").width;

// var end_data;
// var start_data;
// var time_;
// var w_ = windowWidth - 20;

// const Brix = ({ date, time_select, itemId }) => {
//   var line = [];
//   var min = [];
//   var max = [];
//   var traget = [];
//   var label_xx = [];

//   const [line_y, setLine_y] = useState([0]);
//   const [min_y, setMin_y] = useState([0]);
//   const [max_y, setMax_y] = useState([0]);
//   const [traget_y, setTraget_y] = useState([0]);

//   const [label_x, setLabel_x] = useState([0]);

//   function convertDate(inputFormat) {
//     function pad(s) {
//       return s < 10 ? "0" + s : s;
//     }
//     var d = new Date(inputFormat);
//     // // console.log("time ", d);
//     return (
//       [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/") +
//       "," +
//       [pad(d.getHours()), pad(d.getMinutes() + 1)].join(":")
//     );
//   }

//   function converth(inputFormat) {
//     function pad(s) {
//       return s < 10 ? "0" + s : s;
//     }
//     var d = new Date(inputFormat);
//     // // console.log("time ", d);
//     return [pad(d.getHours()), pad(d.getMinutes() + 1)].join(":");
//   }
//   function convertM(inputFormat) {
//     function pad(s) {
//       return s < 10 ? "0" + s : s;
//     }
//     var d = new Date(inputFormat);
//     // // console.log("time ", d);
//     return [pad(d.getMonth() + 1), d.getDate()].join("-");
//   }
//   const get_brixline = (api, id, start, end, time) => {
//     // // console.log(start + " _ " + end);
//     let endpoints = [
//       api + api_path.brixline + id + "/" + start + "/" + end + "/" + time,
//       api + api_path.brixlinemin + id + "/" + start + "/" + end,
//       api + api_path.brixlinemax + id + "/" + start + "/" + end,
//       api + api_path.brixlinetarget + id + "/" + start + "/" + end,
//     ];
//     Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
//       .then(
//         axios.spread((...allData) => {
//           if (allData[0].data.data) {
//             const len = allData[0].data.data.length;

//             console.log(time_select);

//             // converth
//             for (let i = 0; i < len; i++) {
//               line.push(allData[0].data.data[i].value);
//               label_xx.push(convertDate(allData[0].data.data[i].time));
//               min.push(allData[1].data.data[0].min);
//               max.push(allData[2].data.data[0].max);
//               traget.push(allData[3].data.data[0].target);
//               w_ += 40;
//             }
//             if (len <= 5) {
//               for (let i = len; i < 5; i++) {
//                 line.push(allData[0].data.data[0].value);
//                 min.push(allData[1].data.data[0].min);
//                 max.push(allData[2].data.data[0].max);
//                 traget.push(allData[3].data.data[0].target);
//                 label_xx.push(convertDate(allData[0].data.data[0].time));
//                 w_ += 40;
//               }
//             }

//             setLine_y(line);
//             setLabel_x(label_xx);
//             setMin_y(min);
//             setMax_y(max);
//             setTraget_y(traget);
//           }
//         })
//       )
//       .catch((e) => {
//         // console.log(e);
//       });
//   };

//   function convertDate2(inputFormat) {
//     function pad(s) {
//       return s < 10 ? "0" + s : s;
//     }
//     var d = new Date(inputFormat);
//     // // console.log("time ", d);
//     return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
//   }

//   if (date.endDate && time_select) {
//     const dateStart = JSON.stringify(date.startDate);
//     const dateEnd = JSON.stringify(date.endDate);
//     const resultdateStart = dateStart.slice(1, dateStart.length - 1);
//     const resultdateEnd = dateEnd.slice(1, dateEnd.length - 1);

//     const c_start = convertDate2(date.startDate);
//     const c_end = convertDate2(date.endDate);

//     const resultdateEndB = dateEnd.slice(1, dateEnd.length - 3);
//     const resultdateStartB = dateStart.slice(1, dateStart.length - 3);

//     // // console.log("sss");
//     if (
//       end_data != resultdateEndB ||
//       start_data != resultdateStartB ||
//       time_ != time_select
//     ) {
//       end_data = resultdateEndB;
//       start_data = resultdateStartB;
//       time_ = time_select;
//       if (c_start == c_end) {
//         var date = new Date(c_end);
//         date.setDate(date.getDate() + 1);
//         const new_date = JSON.stringify(date);
//         const new_date_ = new_date.slice(1, new_date.length - 1);
//         get_brixline(
//           api_main.main_brix,
//           itemId,
//           resultdateStart,
//           new_date_,
//           time_select
//         );
//       } else {
//         get_brixline(
//           api_main.main_brix,
//           itemId,
//           resultdateStart,
//           resultdateEnd,
//           time_select
//         );
//       }
//     }
//   }
//   // console.log("chart temp");

//   return (
//     <View style={styles.box_chart}>
//       <Text style={styles.title}>Brix chart</Text>
//       <View style={styles.in_chart}>
//         <View
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-around",
//             paddingHorizontal: 20,
//           }}
//         >
//           <Text style={{ color: "#44ffc7" }}>??? min</Text>
//           <Text style={{ color: "#eb513d" }}>??? max</Text>
//           <Text style={{ color: "#8c8f00" }}>??? line</Text>
//           <Text style={{ color: "#38f020" }}>??? target</Text>
//         </View>
//         <ScrollView horizontal={true}>
//           <LineChart
//             data={{
//               labels: label_x,
//               datasets: [
//                 {
//                   data: min_y,
//                   color: (opacity = 1) => `rgba(68, 255, 199, ${opacity})`,
//                   propsForDots: {
//                     stroke: "#44ffc7",
//                     strokeWidth: "7",
//                     r: "6",
//                   },
//                   withDots: false,
//                   strokeWidth: 5,
//                 },
//                 {
//                   data: line_y,
//                   color: (opacity = 1) => `rgba(232, 235, 61,${opacity})`,
//                   propsForDots: {
//                     r: "4",
//                     stroke: "#8c8f00",
//                   },
//                   strokeWidth: 5,
//                 },
//                 {
//                   data: max_y,
//                   color: (opacity = 1) => `rgba(235, 81, 61,${opacity})`,
//                   propsForDots: {
//                     r: "4",
//                     stroke: "#eb513d",
//                   },
//                   withDots: false,
//                   strokeWidth: 5,
//                 },
//                 {
//                   data: traget_y,
//                   color: (opacity = 1) => `rgba(56, 240, 32,${opacity})`,
//                   propsForDots: {
//                     r: "4",
//                     stroke: "#38f020",
//                   },
//                   withDots: false,
//                   strokeWidth: 5,
//                 },
//               ],
//               // legend: ["min", "line", "max", "target"],
//             }}
//             width={w_} // from react-native
//             height={220}
//             yAxisInterval={2} // optional, defaults to 1
//             chartConfig={{
//               backgroundColor: "#fff",
//               backgroundGradientFrom: "#fff",
//               backgroundGradientTo: "#fff",
//               decimalPlaces: 2,
//               // useShadowColorFromDataset: true,
//               color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//               labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             }}
//           />
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   box_chart: {
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     paddingBottom: 5,
//     marginBottom: 15,
//   },
//   title: {
//     backgroundColor: "#006b0593",
//     textAlign: "center",
//     padding: 5,
//     paddingBottom: 10,
//     borderTopLeftRadius: 5,
//     borderTopRightRadius: 5,
//     color: "#fff",
//     fontSize: 16,
//   },
//   in_chart: {
//     marginTop: -10,
//     borderRadius: 5,
//     paddingTop: 10,
//     width: windowWidth - 20,
//     backgroundColor: "#fff",
//   },
// });

// export default Brix;
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

const Brix = ({ date, time_select, itemId, maxs }) => {
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
      " " +
      [pad(d.getHours()), pad(d.getMinutes() + 1)].join(":")
    );
  }

  const get_brixline = (api, id, start, end, time) => {
    // // console.log(
    //   api + api_path.brixline + id + "/" + start + "/" + end + "/" + time
    // );
    let endpoints = [
      api + api_path.brixline + id + "/" + start + "/" + end + "/" + time,
      api + api_path.brixlinemin + id + "/" + start + "/" + end,
      api + api_path.brixlinemax + id + "/" + start + "/" + end,
      api + api_path.brixlinetarget + id + "/" + start + "/" + end,
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

    const c_start = convertDate2(date.startDate);
    const c_end = convertDate2(date.endDate);

    const resultdateStart = dateStart.slice(1, dateStart.length - 1);
    const resultdateEnd = dateEnd.slice(1, dateEnd.length - 1);
    // // console.log("bbb");
    const resultdateEndB = dateEnd.slice(1, dateEnd.length - 3);
    const resultdateStartB = dateStart.slice(1, dateStart.length - 3);
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

  // console.log("chart brix");
  return (
    <View style={styles.box_chart}>
      <Text style={styles.title}>Brix chart</Text>
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
          <Text style={{ color: "#ff7300" }}>??? min</Text>
          <Text style={{ color: "#8b0000" }}>??? max</Text>
          <Text style={{ color: "#008b3f" }}>??? line</Text>
          <Text style={{ color: "#000746" }}>??? target</Text>
        </View>
        <LineChart
          data={line_y}
          color1="#008b3f"
          textColor1="#008b3f"
          dataPointsColor1="#008b3f"
          thickness1={3}
          //
          data2={min_y}
          color2="#ff7300"
          dataPointsColor2="none"
          thickness2={1}
          //
          data3={max_y}
          dataPointsColor3="none"
          color3="#8b0000"
          thickness3={1}
          //
          data4={traget_y}
          dataPointsColor4="none"
          color4="#000746"
          thickness4={1}
          //
          height={250}
          width={windowWidth - 80}
          spacing={125}
          initialSpacing={0}
          // maxValue={10}
          // noOfSections={6}
          dataPointsHeight={6}
          dataPointsWidth={6}
          showFractionalValues
          maxValue={maxs}
          noOfSections={6}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box_chart: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingBottom: 15,
    marginBottom: 15,
    marginTop: 10,
  },
  title: {
    backgroundColor: "#006b0593",
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

export default Brix;
