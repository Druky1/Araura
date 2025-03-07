"use client";
import { MOODS } from "@/app/data/moods";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import EntryCard from "./EntryCard";

const JournalEntries = (entries: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [filteredEntries, setFilteredEntries] = useState(entries.entries || []);

  const clearFilters = () => {
    setDate(undefined);
    setSearchQuery("");
    setSelectedMood("");
  };

  useEffect(() => {
    let filtered = Array.isArray(entries.entries) ? [...entries.entries] : [];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (entry: any) =>
          entry.title.toLowerCase().includes(query) ||
          entry.content.toLowerCase().includes(query)
      );
    }

    if (selectedMood) {
      filtered = filtered.filter((entry: any) => entry.mood === selectedMood);
    }

    if (date) {
      filtered = filtered.filter((entry: any) =>
        isSameDay(new Date(entry.createdAt), date)
      );
    }

    setFilteredEntries(filtered);
  }, [entries, searchQuery, selectedMood, date]);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 text-sm"
          />
        </div>
        <Select value={selectedMood} onValueChange={setSelectedMood}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by mood" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(MOODS).map((mood) => (
              <SelectItem key={mood.id} value={mood.id}>
                <span className="flex items-center gap-2">
                  {mood.emoji} {mood.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="h-6 w-6" />
              {date ? format(date, "PPP") : <span>Pick a Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>

        {(searchQuery || date || selectedMood) && (
          <Button
            variant="outline"
            className="text-orange-500"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="text-sm text-muted-foreground">
        Showing {filteredEntries.entries.length} of {entries?.entries.length}{" "}
        entries
      </div>
      {filteredEntries.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-muted-foreground">No entries found!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredEntries.map((entry: any) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </>
  );
};

export default JournalEntries;
