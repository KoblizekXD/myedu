"use client";

import { PeriodTimings, createPeriodTimings, days } from "@/util/timetable";
import { Period, PeriodState } from "@prisma/client";
import { useState } from "react";

interface TimetableProps {
  className?: string;
  timings: PeriodTimings;
  periods: Period[];
}

function renderPeriodCell(period: Period, key: number) {
  const [detailsShown, setDetailsShown] = useState(false);
  return (
    <td
      key={key}
      className={`${period.state != PeriodState.Normal && "bg-red-400"}`}
    >
      <div
        onMouseOver={() => setDetailsShown(true)}
        onMouseOut={() => setDetailsShown(false)}
        className={`flex flex-col gap-1`}
      >
        <div
          className={`${
            !detailsShown && `hidden`
          } rounded px-4 py-2 border bg-slate-900 border-[#313537] absolute zobak2`}
        >
          <h1 className={"text-xl font-bold"}>
            {period.name} {period.shortName && `(${period.shortName})`}
          </h1>
          <p>Vyučuje: {period.teacher}</p>
          <p>Místnost: {period.room}</p>
          <p>
            Dodatečné informace k hodině:{" "}
            {period.topic ? period.topic : "Nejsou"}
          </p>
        </div>
        <h2 className={"font-bold text-lg"}>{period.name}</h2>
        <p>{period.teacher}</p>
        <p>{period.room}</p>
      </div>
    </td>
  );
}

export default function Timetable({ className, timings, periods }: TimetableProps) {
  return (
    <table className={`${className} border rounded-md border-[#313537]`}>
      <thead>
        <tr>
          <th></th>
          {timings.periods.map((val, i) => {
            return (
              <th key={i}>
                {val.start} - {val.end}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {days.map((day, i) => {
          const found = periods.filter(
            (period) => period.at.getDay() === i + 1
          );
          return (
            <tr key={i}>
              <td>{day}</td>
              {timings.periods.map((val, i) => {
                if (found) {
                  const per = found.find((period) => period.timing == i + 1);
                  if (per) {
                    return renderPeriodCell(per, i);
                  }
                }
                return <td key={i}></td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
