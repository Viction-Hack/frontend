import { ResponsivePie } from "@nivo/pie";
import React from "react";

interface PieDataItem {
  id: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieDataItem[];
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <div style={{ width: '300px', height: '250px' }}>
      <ResponsivePie
        data={data}
        sortByValue
        margin={{ top: 30, right: 60, bottom: 60, left: 60 }}
        cornerRadius={0}
        activeOuterRadiusOffset={2}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLabel="id"
        arcLabelsRadiusOffset={0.6}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        enableArcLinkLabels={false}
        colors={{ datum: 'data.color' }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 40,
            itemWidth: 50,
            itemHeight: 18,
            itemDirection: "left-to-right",
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
        theme={{
          tooltip: {
            container: {
              fontSize: "10px",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}
