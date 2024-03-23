"use client";
import { format } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface View {
  date: Date;
  views: number;
}

function generateDataObjects(
  startDate: Date,
  endDate: Date,
  increment: number,
): View[] {
  const dataObjects: View[] = [];

  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + increment)
  ) {
    const views = Math.floor(Math.random() * 10);
    dataObjects.push({
      date: new Date(currentDate),
      views: views,
    });
  }

  return dataObjects;
}

export default function ViewsGraph() {
  const startDate = new Date("2024-02-01");
  const endDate = new Date("2024-02-8");
  const increment = 1; // korak u danima

  const data = generateDataObjects(startDate, endDate, increment);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area dataKey="views" stroke="#2451B7" fill="url(#color)" />

        <XAxis
          dataKey="date"
          tickLine={false}
          tickFormatter={(date: Date) => {
            if (date.getDate() % 2 === 0) {
              return format(date, "MMM, d");
            }
            return "";
          }}
        />

        <YAxis dataKey="views" format={"formatted name"} />

        <Tooltip
          contentStyle={{
            background: "transparent",
            border: "none",
            width: "90px",
            overflow: "hidden",
          }}
          itemStyle={{ color: "primary", fontWeight: "bolder" }}
        />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
