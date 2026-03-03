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

type Availability = {
  daysOfWeek: number
  startTime: string
  endTime: string
}

export function getAvailableTimesForDay(
  selectedDay: number,
  availability: Availability[],
  allTimes: string[]
) {
  const day = availability.find(d => d.daysOfWeek === selectedDay)

  if (!day) return [];

    const now = new Date();
  const todayDayNumber = now.getDay();

  

  return allTimes.filter(time => {
    if (time < day.startTime || time >= day.endTime) return false;
        if (selectedDay === todayDayNumber) {
      const [hours, minutes] = time.split(":").map(Number);
      const timeMinutes = hours * 60 + minutes;
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      if (timeMinutes <= nowMinutes) return false; 
    }

    return true
  });
  
}