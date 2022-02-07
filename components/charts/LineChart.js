import React from 'react';
import { VictoryGroup, VictoryVoronoiContainer, VictoryArea, VictoryLabel } from "victory-native";
import { View,Platform } from "react-native";

const LineChart = (props) => {

    return (
        <View style={{ justifyContent: "center", alignItems: "center" }} top={0} height={100}>
            <VictoryGroup
                minDomain={{ y: 0 }}
                width={520} height={300}
                containerComponent={
                    <VictoryVoronoiContainer
                        mouseFollowTooltips
                        voronoiDimension="x"
                        labels={({ datum }) => `${datum.y.toLocaleString()}`}
                        labelComponent={CustomTooltip()}
                    />
                }>
                <VictoryArea
                    interpolation="natural"
                    data={props.data}
                    fixLabelOverlap={false}
                    style={{
                        data: { stroke: "#fff", fill: "rgba(52, 52, 52, 0.5)" }, strokeLinecap: "round", parent: { border: "1px solid #fff" }
                    }}
                />
            </VictoryGroup>
        </View>
    );
};

const CustomTooltip = () => {
    return (<VictoryLabel dy={-20} dx={-80} style={[{ fill: "black", fontSize: 16 },]} lineHeight={2}
		backgroundPadding={Platform.OS === 'android' ? 15: 5} backgroundStyle={[{ fill: "white" },]}
    />)
};

export default LineChart;