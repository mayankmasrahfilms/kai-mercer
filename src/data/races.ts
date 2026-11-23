export type Race = {
  round: number;
  name: string; // display location
  country: string; // ISO 3166 alpha-2 for flag
  circuit: string;
  city: string;
  when: string; // display date
  startISO: string; // race start (UTC)
  finish?: string; // e.g. "1ST", "DNF"
  fastestLap?: string;
  laps: number;
  distance: string; // km
  image: string;
};

const img = (n: number) => `/images/${["race-car-01", "race-car-02", "race-car-03", "race-car-04", "collage-01", "collage-06"][n % 6]}.jpg`;

export const races: Race[] = [
  { round: 1, name: "Australia", country: "AU", circuit: "Albert Park Circuit", city: "Melbourne", when: "8 MAR 26", startISO: "2026-03-08T04:00:00Z", finish: "4TH", fastestLap: "1:21.903", laps: 58, distance: "306.124", image: img(0) },
  { round: 2, name: "China", country: "CN", circuit: "Shanghai International Circuit", city: "Shanghai", when: "15 MAR 26", startISO: "2026-03-15T07:00:00Z", finish: "2ND", fastestLap: "1:34.118", laps: 56, distance: "305.066", image: img(1) },
  { round: 3, name: "Japan", country: "JP", circuit: "Suzuka International Racing Course", city: "Suzuka", when: "29 MAR 26", startISO: "2026-03-29T05:00:00Z", finish: "5TH", fastestLap: "1:31.442", laps: 53, distance: "307.471", image: img(2) },
  { round: 4, name: "Bahrain", country: "BH", circuit: "Bahrain International Circuit", city: "Sakhir", when: "12 APR 26", startISO: "2026-04-12T15:00:00Z", finish: "3RD", fastestLap: "1:35.870", laps: 57, distance: "308.238", image: img(3) },
  { round: 5, name: "Saudi Arabia", country: "SA", circuit: "Jeddah Corniche Circuit", city: "Jeddah", when: "19 APR 26", startISO: "2026-04-19T17:00:00Z", finish: "DNF", laps: 50, distance: "308.450", image: img(4) },
  { round: 6, name: "Miami", country: "US", circuit: "Miami International Autodrome", city: "Miami", when: "3 MAY 26", startISO: "2026-05-03T20:00:00Z", finish: "2ND", fastestLap: "1:29.981", laps: 57, distance: "308.326", image: img(5) },
  { round: 7, name: "Canada", country: "CA", circuit: "Circuit Gilles Villeneuve", city: "Montréal", when: "24 MAY 26", startISO: "2026-05-24T18:00:00Z", finish: "6TH", fastestLap: "1:14.702", laps: 70, distance: "305.270", image: img(0) },
  { round: 8, name: "Monaco", country: "MC", circuit: "Circuit de Monaco", city: "Monte Carlo", when: "7 JUN 26", startISO: "2026-06-07T13:00:00Z", finish: "4TH", fastestLap: "1:13.655", laps: 78, distance: "260.286", image: img(1) },
  { round: 9, name: "Catalunya", country: "ES", circuit: "Circuit de Barcelona-Catalunya", city: "Barcelona", when: "14 JUN 26", startISO: "2026-06-14T13:00:00Z", finish: "3RD", fastestLap: "1:16.330", laps: 66, distance: "307.236", image: img(2) },
  { round: 10, name: "Austria", country: "AT", circuit: "Red Bull Ring", city: "Spielberg", when: "28 JUN 26", startISO: "2026-06-28T13:00:00Z", finish: "2ND", fastestLap: "1:07.912", laps: 71, distance: "306.452", image: img(3) },
  { round: 11, name: "United Kingdom", country: "GB", circuit: "Silverstone Circuit", city: "Silverstone", when: "5 JUL 26", startISO: "2026-07-05T14:00:00Z", finish: "1ST", fastestLap: "1:27.402", laps: 52, distance: "306.198", image: img(4) },
  { round: 12, name: "Belgium", country: "BE", circuit: "Circuit de Spa-Francorchamps", city: "Spa", when: "19 JUL 26", startISO: "2026-07-19T13:00:00Z", finish: "5TH", fastestLap: "1:44.731", laps: 44, distance: "308.052", image: img(5) },
  { round: 13, name: "Hungary", country: "HU", circuit: "Hungaroring", city: "Budapest", when: "26 JUL 26", startISO: "2026-07-26T13:00:00Z", finish: "7TH", fastestLap: "1:19.884", laps: 70, distance: "306.630", image: img(0) },
  { round: 14, name: "Netherlands", country: "NL", circuit: "Circuit Zandvoort", city: "Zandvoort", when: "23 AUG 26", startISO: "2026-08-23T13:00:00Z", finish: "3RD", fastestLap: "1:11.204", laps: 72, distance: "305.880", image: img(1) },
  { round: 15, name: "Italy", country: "IT", circuit: "Autodromo Nazionale Monza", city: "Monza", when: "6 SEP 26", startISO: "2026-09-06T13:00:00Z", finish: "6TH", fastestLap: "1:21.567", laps: 53, distance: "306.720", image: img(2) },
  { round: 16, name: "Spain", country: "ES", circuit: "Madring", city: "Madrid", when: "13 SEP 26", startISO: "2026-09-13T13:00:00Z", finish: "4TH", fastestLap: "1:28.011", laps: 57, distance: "308.102", image: img(3) },
  { round: 17, name: "Azerbaijan", country: "AZ", circuit: "Baku City Circuit", city: "Baku", when: "26 SEP 26", startISO: "2026-09-26T11:00:00Z", finish: "DNF", laps: 51, distance: "306.049", image: img(4) },
  { round: 18, name: "Singapore", country: "SG", circuit: "Marina Bay Street Circuit", city: "Singapore", when: "11 OCT 26", startISO: "2026-10-11T12:00:00Z", finish: "1ST", fastestLap: "1:33.960", laps: 62, distance: "306.143", image: img(5) },
  { round: 19, name: "United States", country: "US", circuit: "Circuit of the Americas", city: "Austin", when: "25 OCT 26", startISO: "2026-10-25T19:00:00Z", finish: "5TH", fastestLap: "1:37.215", laps: 56, distance: "308.405", image: img(0) },
  { round: 20, name: "Mexico", country: "MX", circuit: "Autódromo Hermanos Rodríguez", city: "Mexico City", when: "1 NOV 26", startISO: "2026-11-01T20:00:00Z", finish: "3RD", fastestLap: "1:20.448", laps: 71, distance: "305.354", image: img(1) },
  { round: 21, name: "Brazil", country: "BR", circuit: "Autódromo José Carlos Pace", city: "São Paulo", when: "8 NOV 26", startISO: "2026-11-08T17:00:00Z", finish: "8TH", fastestLap: "1:12.390", laps: 71, distance: "305.879", image: img(2) },
  { round: 22, name: "Las Vegas", country: "US", circuit: "Las Vegas Strip Circuit", city: "Las Vegas", when: "21 NOV 26", startISO: "2026-11-22T06:00:00Z", finish: "2ND", fastestLap: "1:35.802", laps: 50, distance: "309.958", image: img(3) },
  { round: 23, name: "Qatar", country: "QA", circuit: "Lusail International Circuit", city: "Lusail", when: "27-29 NOV", startISO: "2026-11-29T16:00:00Z", laps: 57, distance: "308.611", image: img(4) },
  { round: 24, name: "Abu Dhabi", country: "AE", circuit: "Yas Marina Circuit", city: "Abu Dhabi", when: "04-06 DEC", startISO: "2026-12-06T13:00:00Z", laps: 58, distance: "306.183", image: img(5) },
];

/** The race shown in "next race" cards. Content is authored for the Lusail weekend. */
export const nextRace = {
  round: 23,
  venue: "Lusail",
  name: "Qatar",
  gp: "Lusail GP",
  country: "QA",
  dates: "27-29",
  month: "NOV",
  length: "5.419",
  distance: "308.611",
  firstCompeted: "2021",
  laps: "57",
  blurb:
    "Kai has scored points at Lusail every year since 2022, including a podium under the floodlights in 2024 after a late-race charge from ninth on the grid.",
  schedule: [
    { label: "Practice 1", day: "27 NOV", time: "13:30" },
    { label: "Practice 2", day: "27 NOV", time: "17:00" },
    { label: "Practice 3", day: "28 NOV", time: "14:30" },
    { label: "Qualifying", day: "28 NOV", time: "18:00" },
    { label: "Race", day: "29 NOV", time: "16:00" },
  ],
};

export const standing = { position: "4", suffix: "TH", round: "23" };

export const seasons = [
  { year: "2026", finish: "4", suffix: "TH", podiums: 10, wins: 2, points: 287, note: "Season in progress — two wins, including a first home victory at Silverstone." },
  { year: "2025", finish: "1", suffix: "ST", podiums: 12, wins: 5, points: 412, note: "World Drivers' Champion, with five wins and twelve podiums." },
  { year: "2024", finish: "5", suffix: "TH", podiums: 6, wins: 1, points: 244, note: "Maiden Formula 1 victory in Miami and six trips to the podium." },
  { year: "2023", finish: "7", suffix: "TH", podiums: 5, wins: 0, points: 167, note: "Five podiums as Vantor Racing found its feet with a new aero concept." },
  { year: "2022", finish: "9", suffix: "TH", podiums: 3, wins: 0, points: 102, note: "First front-row start and three podium finishes." },
  { year: "2021", finish: "12", suffix: "TH", podiums: 1, wins: 0, points: 38, note: "Rookie season, capped with a podium in the Brazilian rain." },
];

export const career = { podiums: 37, wins: "08", poles: "09", avgFinish: "6.4", fastestLaps: "11", seasons: 6 };

export const highlights = [
  { series: "F1", name: "United Kingdom", country: "GB", when: "5 JUL 26", finish: "1ST", time: "1:27:31.442", image: "/images/social-02.jpg" },
  { series: "F1", name: "Singapore", country: "SG", when: "11 OCT 26", finish: "1ST", time: "1:40:52.571", image: "/images/collage-03.jpg" },
  { series: "F1", name: "Abu Dhabi", country: "AE", when: "7 DEC 25", finish: "1ST", time: "1:26:33.291", image: "/images/race-car-02.jpg" },
  { series: "F1", name: "Austria", country: "AT", when: "29 JUN 25", finish: "1ST", time: "1:22:06.304", image: "/images/collage-06.jpg" },
  { series: "F1", name: "Monaco", country: "MC", when: "25 MAY 25", finish: "1ST", time: "1:40:33.843", image: "/images/race-car-03.jpg" },
  { series: "F1", name: "Miami", country: "US", when: "5 MAY 24", finish: "1ST", time: "1:30:49.876", image: "/images/social-03.jpg" },
];

export const juniorTitles = [
  "Formula Regional European Champion",
  "British F4 Champion",
  "CIK-FIA European Karting Champion",
  "WSK Super Master Series Champion",
  "Super One British Karting Champion",
  "Formula 3 Race Winner",
];

/** Simplified circuit outline used by the track visualiser and the small track icons. */
export const TRACK_PATH =
  "M 120 380 L 700 410 C 760 414 800 400 830 370 L 880 300 C 895 280 880 262 860 262 L 760 270 C 730 272 712 255 720 228 L 760 150 C 770 128 755 110 732 112 L 600 128 C 575 131 560 150 548 170 L 520 220 C 505 245 480 248 460 232 L 400 180 C 380 163 352 165 335 182 L 260 250 C 240 268 210 266 196 245 L 170 205 C 155 182 125 185 112 208 L 80 300 C 70 340 85 377 120 380 Z";
