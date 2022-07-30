import { calculatePercentage } from "../utils/calculatePercentage";

const testSchedule = [
  {
    id: 1,
    period: 0,
    days_of_week: ["regular_day", "short_day"],
    duration: 30,
    name: "Arrival",
    tags: [],
  },
  {
    id: 2,
    period: 1,
    days_of_week: ["regular_day", "short_day"],
    duration: 45,
    name: "Music Theory",
    tags: ["instructional"],
  },
  {
    id: 3,
    period: 2,
    days_of_week: ["regular_day", "short_day"],
    duration: 45,
    name: "Jazz Band",
    tags: ["instructional"],
  },
];
const testSchedule2 = [
  {
    id: 1,
    period: 0,
    days_of_week: ["regular_day", "short_day"],
    duration: 30,
    name: "Arrival",
    tags: ["instructional"],
  },
  {
    id: 2,
    period: 1,
    days_of_week: ["regular_day", "short_day"],
    duration: 45,
    name: "Music Theory",
    tags: ["instructional"],
  },
  {
    id: 3,
    period: 2,
    days_of_week: ["regular_day", "short_day"],
    duration: 45,
    name: "Jazz Band",
    tags: ["instructional"],
  },
];

test("gets percentage of student schedule tagged instructional", () => {
  expect(calculatePercentage(testSchedule)).toBe(0.75);
  expect(calculatePercentage(testSchedule2)).toBe(1.0);
});
