"use client";

import * as d3 from "d3";

export type WorkoutTypePoint = {
    type: string;
    count: number;
};

type Props = {
    data: WorkoutTypePoint[];
};

export default function WorkoutTypeBarChart({ data }: Props){
    const width = 600;
    const height = 260;
    const margin = { top: 20, right: 25, bottom: 40, left: 40 };

    const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.type))
        .range([margin.left, width - margin.right])
        .padding(0.3);
        
    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.count) ?? 0])
        .nice()
        .range([height - margin.bottom, margin.top]);

    const yTicks = yScale.ticks(4);

    return(
        <div style={{ width: "100%", overflowX: "auto" }}>
            <svg
                viewBox={`0 0 ${width} ${height}`}
                role="img"
                aria-label="Workout type distribution bar chart"
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

                {data.map((d) => {
                    const x = xScale(d.type) ?? 0;
                    const barWidth = xScale.bandwidth();
                    const y = yScale(d.count);
                    const barHeight = height - margin.bottom - y;

                    return(
                        <g key={d.type}>
                            <rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={barHeight}
                                rx="10"
                                fill="var(--color-primary)"
                            />
                            <text
                                x={x + barWidth / 2}
                                y={y - 8}
                                textAnchor="middle"
                                fontSize="12"
                                fontWeight="600"
                                fill="var(--color-text-primary)"
                            >
                                {d.count}
                            </text>
                            <text
                                x={x + barWidth / 2}
                                y={height - 12}
                                textAnchor="middle"
                                fontSize="12"
                                fill="var(--color-text-secondary)"
                            >
                                {d.type}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}