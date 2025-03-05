"use client";

import { getAnalytics } from "@/app/actions/analytics";
import useFetch from "@/app/hooks/use-fetch";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import MoodAnalyticsSkeleton from "./MoodAnalyticsSkeletion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMoodById, getMoodTrend } from "@/app/data/moods";
import { Instrument_Serif } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

const instru = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const timeOptions = [
  { value: "7d", label: "Last 7 Days" },
  { value: "15d", label: "Last 15 Days" },
  { value: "30d", label: "Last 30 Days" },
];

function MoodAnalytics() {
  const user = useUser();

  const [period, setPeriod] = useState("7d");

  const {
    loading,
    data: analytics,
    fn: fetchAnalytics,
  } = useFetch(getAnalytics);

  const { isLoaded } = useUser();

  useEffect(() => {
    fetchAnalytics(period);
  }, [period]);

  if (loading || !analytics?.data || !isLoaded) {
    return <MoodAnalyticsSkeleton />;
  }

  if (!analytics) return null;

  const { timeline, stats } = analytics.data;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium">
            {format(parseISO(label), "MMM d, yyyy")}
          </p>
          <p className="text-orange-600">Average Mood: {payload[0].value}</p>
          <p className="text-blue-600">Entries: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl md:text-4xl bg-gradient-to-t from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent tracking-tight">{`Welcome, ${user.user?.firstName}`}</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[120px] bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="tracking-tight text-sm font-medium">
                Total Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="tracking-tight text-4xl font-bold bg-gradient-to-t from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
                {stats.totalEntries}
              </p>
              <p className="tracking-tight text-sm text-muted-foreground">
                ~{stats.dailyAverage} entries per day
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="tracking-tight text-sm font-medium">
                Mood Summary
              </CardTitle>
            </CardHeader>
            <CardContent
              className={twMerge(instru.className, "text-3xl tracking-tight")}
            >
              {getMoodTrend(stats.averageScore)}{" "}
              {getMoodById(stats.mostFrequentMood ?? "")?.emoji}
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="tracking-tight text-sm font-medium">
                Average Mood
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="tracking-tight text-4xl font-bold bg-gradient-to-t from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
                {stats.averageScore}/10
              </p>
              <p className="tracking-tight text-sm text-muted-foreground">
                Overall mood score
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="border-2 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="tracking-tight text-sm font-medium text-center">
              Mood Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full p-4">
              <ResponsiveContainer width="100%" height="100%" className={"tracking-tight"}>
                <LineChart
                  data={timeline}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => format(parseISO(date), "MMM d")}
                  />
                  <YAxis yAxisId="left" domain={[0, 10]} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, "auto"]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="averageScore"
                    stroke="#f97316"
                    name="Average Mood"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="entryCount"
                    stroke="#3b82f6"
                    name="Number of Entries"
                    strokeWidth={2}
                  />
                  
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MoodAnalytics;
