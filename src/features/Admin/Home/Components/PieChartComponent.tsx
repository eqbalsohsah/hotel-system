import { useTheme } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IData {
  name: string;
  value: number;
}

interface IPieChartProps {
  data: IData[];
}

// const COLORS = [ "#FFBB28", "#FF8042"];

export default function PieChartComponent({
  data,
}: IPieChartProps) {
       const theme = useTheme();

    const COLORS = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
    ];
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          label
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}