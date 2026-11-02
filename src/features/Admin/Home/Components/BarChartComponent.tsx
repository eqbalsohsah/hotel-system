
import { useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

interface IData {
  name: string;
  value: number;
}

interface IBarChartProps {
  data: IData[];
}


export default function BarChartComponent({
  data,
}: IBarChartProps) {

    const theme = useTheme();

const COLORS = [
  theme.palette.primary.main,
  theme.palette.secondary.main,
];
  return (
  <ResponsiveContainer width="80%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}