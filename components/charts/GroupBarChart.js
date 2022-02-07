import React from 'react';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryAxis, VictoryLegend } from "victory-native";
import moment from "moment";
import { View, StyleSheet,Dimensions } from "react-native";

const GroupBarChart = (props) => {

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
        }
    });

    const screenHeight = Dimensions.get("window").height;

    return (
        <View>
            <VictoryChart  domainPadding={10} minDomain={{ y: 0 }} height={screenHeight > 700 ? 320 : 210}>
                <VictoryAxis dependentAxis tickFormat={xAxisTickFormatter()} offsetX={45} />
                <VictoryAxis tickFormat={(x) => {return moment(x).format(`D MMM`)}} style={{ tickLabels: { fontSize: 12 } }} />
                <VictoryGroup offset={10} colorScale={["#FF4757", "#EE5A24", "#7BED9F"]}>
                    <VictoryBar data={props.deaths} />
                    <VictoryBar data={props.active} />
                    <VictoryBar data={props.recovered} />
                </VictoryGroup>

                <VictoryLegend x={40} y={300} orientation="horizontal"
                    centerTitle
                    colorScale={["#FF4757", "#EE5A24", "#7BED9F"]}
                    gutter={30}
                    style={{ labels: { fontSize: 14 } }}
                    data={[{ name: "Deaths" }, { name: "Active" }, { name: "Recovered" }]}
                />
            </VictoryChart>
        </View>
    );
};

const xAxisTickFormatter = () => {
     return x => (x >= 1000000 ? `${x / 1000000}m` : x >= 1000 ? `${x / 1000}k` : `${x}`);
}

export default GroupBarChart;