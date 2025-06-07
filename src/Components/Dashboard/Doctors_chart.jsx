

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {

  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import WheeelChairIcon from "../../assets/Wheelchair man.png"; // Assuming this is the accessibility icon

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
    color: "hsl(var(--chart-1))",
  },
};

export function DisabilityAssessmentChart() {
  const [selectedMonth, setSelectedMonth] = React.useState("june"); // State for month filter

  // Function to render custom labels on the bars
  const renderCustomBarLabel = ({ x, y, width, height, value }) => {
    // Adjust position based on whether the bar is very small
    const offset = value > 0 ? 10 : 0; // Small offset for non-zero values
    return (
      <text
        x={x + width + offset} // Position text to the right of the bar
        y={y + height / 2}
        dy={3} // Adjust vertical alignment
        fill="#4A5568" // Gray text color
        fontSize={12}
        textAnchor="start"
      >
        {value}
      </text>
    );
  };

  return (
    <Card className="col-span-1"> {/* Or adjust col-span for your layout */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          {/* Apply green color to title */}
          <CardTitle className="text-xl font-semibold text-green-700">
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
                {/* Add more months */}
              </SelectContent>
            </Select>
          </CardDescription>
        </div>
        {/* Placeholder for potential header icon if any */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical" // Important for horizontal bars
            margin={{
              left: 10,
              right: 25, // Give some space for labels on the right
              top: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" /> {/* Vertical dashed lines */}
            <XAxis
              type="number" // X-axis is numeric for values
              hide // Hide the X-axis line/ticks if not desired
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              dataKey="disability" // Y-axis displays disability names
              type="category"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={100} // Adjust width for long labels
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />} // Hide default label in tooltip
            />
            <Bar
              dataKey="value"
              fill="var(--color-value)" // Uses color from chartConfig
              radius={[0, 4, 4, 0]} // Rounded corners on the right side
              label={renderCustomBarLabel} // Apply custom labels
              minPointSize={1} // Ensure even 0-value bars are slightly visible or remove if you want them invisible
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <div className="flex items-end justify-between px-6 pb-4">
        <div className="text-sm text-gray-600">
          <p className="font-semibold text-green-700">Down by 12% this month</p>
          <p>Showing Total Booked Assessment for the month of June</p>
        </div>
        <img src={WheeelChairIcon} alt="Accessibility Icon" className="w-8 h-8 opacity-70" />
      </div>
    </Card>
  );
}