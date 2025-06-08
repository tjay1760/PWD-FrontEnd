
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import WheeelChairIcon from "../../../assets/Wheelchair man.png"; // Assuming this is the accessibility icon

const chartData = [
  { disability: "Disability 1", value: 4 },
  { disability: "Disability 2", value: 2 },
  { disability: "Disability 3", value: 1 },
  { disability: "Disability 4", value: 1 },
  { disability: "Disability 5", value: 0 },
  { disability: "Disability 6", value: 3 },
  { disability: "Disability 7", value: 1 },
];

const chartConfig = {
  value: {
    label: "Assessments",
    color: "#2563eb", // This will be used by shadcn's internal chart.tsx
  },
};

export function DisabilityAssessmentChart() {
  const [selectedMonth, setSelectedMonth] = React.useState("june");

  const renderCustomBarLabel = ({ x, y, width, height, value }) => {
    const offset = value > 0 ? 10 : 0;
    return (
      <text
        x={x + width + offset}
        y={y + height / 2}
        dy={3}
        fill="hsl(var(--muted-foreground))" // Use a foreground color for better contrast
        fontSize={12}
        textAnchor="start"
      >
        {value}
      </text>
    );
  };

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
        <div>
          {/* Apply the custom green color to title using a direct CSS variable reference */}
          <CardTitle className="text-xl font-semibold" style={{ color: 'var(--green-title)' }}>
            Total Assessments by Disability Type
          </CardTitle>
          <CardDescription>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[120px] h-auto p-1 text-sm">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="january">January</SelectItem>
                <SelectItem value="february">February</SelectItem>
                <SelectItem value="march">March</SelectItem>
                <SelectItem value="april">April</SelectItem>
                <SelectItem value="may">May</SelectItem>
                <SelectItem value="june">June</SelectItem>
              </SelectContent>
            </Select>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 10,
              right: 25,
              top: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid horizontal={false} stroke="hsl(var(--border))" strokeDasharray="3 3" /> {/* Use border color */}
            <XAxis
              type="number"
              hide
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              dataKey="disability"
              type="category"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={100}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="value"
               fill="#2A5CAA" 
              radius={[0, 4, 4, 0]}
              label={renderCustomBarLabel}
              minPointSize={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <div className="flex items-end justify-between px-6 pb-4">
        <div className="text-sm text-gray-600">
          {/* Apply the custom green color to the percentage text */}
          <p className="font-semibold" style={{ color: 'var(--green-title)' }}>Down by 12% this month</p>
          <p>Showing Total Booked Assessment for the month of June</p>
        </div>
        <img src={WheeelChairIcon} alt="Accessibility Icon" className="w-8 h-8 opacity-70" />
      </div>
    </Card>
  );
}