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

export const TIME_OPTIONS = generateTimeOptions()