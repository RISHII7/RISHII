import { useEffect, useState } from "react";

export interface Clock {
  time: string;
  offset: string;
}

/** Live local wall clock (HH:MM:SS) plus UTC-offset label, e.g. “+05:30”. */
export function useClock(): Clock {
  const [clock, setClock] = useState<Clock>(() => read());

  useEffect(() => {
    const id = setInterval(() => setClock(read()), 1000);
    return () => clearInterval(id);
  }, []);

  return clock;
}

function read(): Clock {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const total = -now.getTimezoneOffset();
  const sign = total >= 0 ? "+" : "−";
  const abs = Math.abs(total);
  const offset = `${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
  return { time, offset };
}
