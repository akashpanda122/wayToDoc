'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from "@/lib/utils"
import clsxm from '@/app/lib';
import { Button } from '@/components/ui/button';
import { Calendar } from '../Calender';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DatePickerWithPresets() {
    const [date, setDate] = React.useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-gray-100",
                      !date && "text-gray-400"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                <div className="rounded-md border">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="bg-gray-800 text-gray-100"
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}