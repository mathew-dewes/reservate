
import { TZDate } from "@date-fns/tz";
import { Prisma } from "../generated/prisma/client";
export function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

function generateTimeOptions() {
  const times: string[] = []

  for (let hour = 0; hour < 24; hour++) {
    for (const min of [0, 30]) {
      const h = hour.toString().padStart(2, "0")
      const m = min.toString().padStart(2, "0")
      times.push(`${h}:${m}`)
    }
  }

  return times
}

export const TIME_OPTIONS = generateTimeOptions();

export const DAYS = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];


export function getNZTime() {
  const now = new Date();
  return new TZDate(now, "Pacific/Auckland");
}

type Booking = {
  startTime: Date
  endTime: Date
}

export function getAvailableTimes(
  selectedDate: Date,
  availability: { startTime: string; endTime: string }[],
  allTimes: string[],
  bookings: Booking[],
) {
  if (!availability.length) return [];

  const now = getNZTime();

  const today = new TZDate(now, "Pacific/Auckland");
  today.setHours(0, 0, 0, 0);

  const compareDate = new TZDate(selectedDate, "Pacific/Auckland");
  compareDate.setHours(0, 0, 0, 0);

  const isToday = today.getTime() === compareDate.getTime();
  const isPastDay = compareDate.getTime() < today.getTime();


  if (isPastDay) return [];

  const { startTime, endTime } = availability[0];

  return allTimes

    .filter((timeStr) => {
      return timeStr >= startTime && timeStr < endTime;
    })

    .filter((timeStr) => {
      if (!isToday) return true;

      const [hours, minutes] = timeStr.split(":").map(Number);
      const slotTime = new TZDate(selectedDate, "Pacific/Auckland");
      slotTime.setHours(hours, minutes, 0, 0);

      return slotTime.getTime() > now.getTime();
    })

    .map((timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);

      const slotStart = new TZDate(selectedDate, "Pacific/Auckland");
      slotStart.setHours(hours, minutes, 0, 0);

      const slotEnd = new TZDate(slotStart, "Pacific/Auckland");
      slotEnd.setMinutes(slotEnd.getMinutes() + 30);

      const overlaps = bookings.some((booking) => {
        return slotStart < booking.endTime && slotEnd > booking.startTime;
      });

      return {
        time: timeStr,
        disabled: overlaps, 
      };
    });
}




export function parseBookingDateTime(dateStr: string, timeStr: string) {
  const [day, month, year] = dateStr.split("-").map(Number);
  const [hours, minutes] = timeStr.split(":").map(Number);


  return new TZDate(year, month - 1, day, hours, minutes, 0, "Pacific/Auckland");
}


export function decimalToMoney(value: Prisma.Decimal) {
  return new Intl.NumberFormat('en-NZ',
    { style: 'currency', currency: 'NZD' }
  ).format(value.toNumber())
};