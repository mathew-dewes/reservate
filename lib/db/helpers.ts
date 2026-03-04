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



export function getAvailableTimes(
  selectedDate: Date,       // the date user selected
  availability: { startTime: string; endTime: string }[], // for that day
  allTimes: string[]        // your '00:00', '00:30', ... array
) {
  if (!availability.length) return [];

  const now = new Date();
  const isToday =
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getDate() === now.getDate();

  const dayAvailability = availability[0]; // assuming one range per day

  return allTimes.filter((timeStr) => {
    // Only keep times inside business hours
    if (timeStr < dayAvailability.startTime || timeStr >= dayAvailability.endTime) {
      return false;
    }

    // Remove past times if selected date is today
    if (isToday) {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hours, minutes, 0, 0);

      if (slotTime <= now) return false;
    }

    return true;
  });
}