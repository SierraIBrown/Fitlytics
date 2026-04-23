"use client";

import * as d3 from "d3";

type WeeklyWorkoutPoint = {
    day: string;
    count: number;
};

const mockData: WeeklyWorkoutPoint[] = [
    { day: "Mon", count: 1 },
    { day: "Tue", count: 0 },
    { day: "Wed", count: 2 },
    { day: "Thu", count: 1 },
    { day: "Fri", count: 3 },
    { day: "Sat", count: 2 },
    { day: "Sun", count: 1 },
];

export default function WeeklyWorkoutsLineChart(){
    const width = 600;
    const height = 260;
    const margin = { top: 20, right: 25, bottom: 35, left: 35 };
    const xScale = d3.scalePoint().domain(mockData.map((d) => d.day)).range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear().domain([0, d3.max(mockData, (d) => d.count) ?? 0])
    const line = d3.line<WeeklyWorkoutPoint>().x((d) => xScale(d.day) ?? 0).y((d) => yScale(d.count)).curve(d3.curveMonotoneX);
    const pathData = line(mockData);
    const yTicks = yScale.ticks(4);

    return(
        <div style={{ width: "100%", overflowX: "auto" }}>
            <svg 
                viewBox={`0 0 ${width} ${height}`}
                role="img"
                aria-label="Weekly workouts count line chart"
            >
                {yTicks.map((tick) => (
                    <g key={tick}>
                        <line
                            x1={margin.left}
                            x2={width - margin.right}
                            y1={yScale(tick)}
                            y2={yScale(tick)}
                            stroke="var(--color-border)"
                            strokeDasharray="4 4"
                        />
                        <text
                            x={margin.left - 10}
                            y={yScale(tick)}
                            textAnchor="end"
                            dominantBaseline="middle"
                            fontSize="12"
                            fill="var(--color-text-secondary)"
                        >
                            {tick}
                        </text>
                    </g>
                ))}

                {mockData.map((d) => (
                    <text
                        key={d.day}
                        x={xScale(d.day)}
                        y={height - 10}
                        textAnchor="middle"
                        fontSize="12"
                        fill="var(--color-text-secondary)"
                    >
                        {d.day}
                    </text>
                ))}

                {pathData && (
                    <path
                        d={pathData}
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="3"
                    />
                )}

                {mockData.map((d) => (
                    <circle
                        key={`${d.day}-${d.count}`}
                        cx={xScale(d.day)}
                        cy={yScale(d.count)}
                        r="5"
                        fill="var(--color-accent)"
                    />
                ))}
            </svg>
        </div>
    );
}