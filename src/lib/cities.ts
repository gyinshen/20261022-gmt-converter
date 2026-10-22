export type City = {
  id: string;
  name: string;
  country: string;
  timeZone: string;
};

export const CITIES: City[] = [
  { id: "singapore", name: "Singapore", country: "Singapore", timeZone: "Asia/Singapore" },
  { id: "kuala-lumpur", name: "Kuala Lumpur", country: "Malaysia", timeZone: "Asia/Kuala_Lumpur" },
  { id: "jakarta", name: "Jakarta", country: "Indonesia", timeZone: "Asia/Jakarta" },
  { id: "bangkok", name: "Bangkok", country: "Thailand", timeZone: "Asia/Bangkok" },
  { id: "manila", name: "Manila", country: "Philippines", timeZone: "Asia/Manila" },
  { id: "hong-kong", name: "Hong Kong", country: "Hong Kong", timeZone: "Asia/Hong_Kong" },
  { id: "taipei", name: "Taipei", country: "Taiwan", timeZone: "Asia/Taipei" },
  { id: "shanghai", name: "Shanghai", country: "China", timeZone: "Asia/Shanghai" },
  { id: "beijing", name: "Beijing", country: "China", timeZone: "Asia/Shanghai" },
  { id: "tokyo", name: "Tokyo", country: "Japan", timeZone: "Asia/Tokyo" },
  { id: "seoul", name: "Seoul", country: "South Korea", timeZone: "Asia/Seoul" },
  { id: "mumbai", name: "Mumbai", country: "India", timeZone: "Asia/Kolkata" },
  { id: "delhi", name: "Delhi", country: "India", timeZone: "Asia/Kolkata" },
  { id: "dubai", name: "Dubai", country: "UAE", timeZone: "Asia/Dubai" },
  { id: "riyadh", name: "Riyadh", country: "Saudi Arabia", timeZone: "Asia/Riyadh" },
  { id: "istanbul", name: "Istanbul", country: "Turkey", timeZone: "Europe/Istanbul" },
  { id: "moscow", name: "Moscow", country: "Russia", timeZone: "Europe/Moscow" },
  { id: "cairo", name: "Cairo", country: "Egypt", timeZone: "Africa/Cairo" },
  { id: "johannesburg", name: "Johannesburg", country: "South Africa", timeZone: "Africa/Johannesburg" },
  { id: "london", name: "London", country: "United Kingdom", timeZone: "Europe/London" },
  { id: "paris", name: "Paris", country: "France", timeZone: "Europe/Paris" },
  { id: "berlin", name: "Berlin", country: "Germany", timeZone: "Europe/Berlin" },
  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", timeZone: "Europe/Amsterdam" },
  { id: "madrid", name: "Madrid", country: "Spain", timeZone: "Europe/Madrid" },
  { id: "rome", name: "Rome", country: "Italy", timeZone: "Europe/Rome" },
  { id: "stockholm", name: "Stockholm", country: "Sweden", timeZone: "Europe/Stockholm" },
  { id: "zurich", name: "Zurich", country: "Switzerland", timeZone: "Europe/Zurich" },
  { id: "new-york", name: "New York", country: "United States", timeZone: "America/New_York" },
  { id: "chicago", name: "Chicago", country: "United States", timeZone: "America/Chicago" },
  { id: "denver", name: "Denver", country: "United States", timeZone: "America/Denver" },
  { id: "los-angeles", name: "Los Angeles", country: "United States", timeZone: "America/Los_Angeles" },
  { id: "toronto", name: "Toronto", country: "Canada", timeZone: "America/Toronto" },
  { id: "vancouver", name: "Vancouver", country: "Canada", timeZone: "America/Vancouver" },
  { id: "mexico-city", name: "Mexico City", country: "Mexico", timeZone: "America/Mexico_City" },
  { id: "sao-paulo", name: "São Paulo", country: "Brazil", timeZone: "America/Sao_Paulo" },
  { id: "buenos-aires", name: "Buenos Aires", country: "Argentina", timeZone: "America/Argentina/Buenos_Aires" },
  { id: "sydney", name: "Sydney", country: "Australia", timeZone: "Australia/Sydney" },
  { id: "melbourne", name: "Melbourne", country: "Australia", timeZone: "Australia/Melbourne" },
  { id: "perth", name: "Perth", country: "Australia", timeZone: "Australia/Perth" },
  { id: "auckland", name: "Auckland", country: "New Zealand", timeZone: "Pacific/Auckland" },
  { id: "honolulu", name: "Honolulu", country: "United States", timeZone: "Pacific/Honolulu" },
  { id: "utc", name: "UTC", country: "GMT+0", timeZone: "UTC" },
];

export const DEFAULT_CITY_ID = "singapore";

export function getCityById(id: string): City {
  return CITIES.find((city) => city.id === id) ?? CITIES[0];
}

export function filterCities(query: string): City[] {
  const q = query.trim().toLowerCase();
  if (!q) return CITIES;
  return CITIES.filter((city) =>
    [city.name, city.country, city.timeZone].some((value) =>
      value.toLowerCase().includes(q),
    ),
  );
}
