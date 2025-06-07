import React, { useState } from 'react';
import { Calendar } from './../../../src/components/ui/calendar'; // Adjust path if needed

const CalendarView = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-6 bg-white border rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Upcoming Assesment Dates
      </h2>

      {/* Centered and enlarged calendar */}
      <div className="flex justify-center">
       <Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="text-xl"
  classNames={{
    root: 'border rounded-xl p-6 text-xl',
    table: 'w-full table-fixed', // ensures even width columns
    caption: 'text-xl mb-4 font-semibold text-center',
    head_row: 'text-center',
    head_cell: 'text-md text-gray-700 p-4 font-semibold text-center', // equal padding
    row: 'text-center',
    cell: 'p-4 text-lg text-center cursor-pointer hover:bg-blue-100 rounded-md',
    selected: 'bg-black text-white rounded-full',
    today: 'bg-gray-200 text-black rounded-full',
    outside: 'text-gray-300',
  }}
/>

      </div>
    </div>
  );
};

export default CalendarView;
