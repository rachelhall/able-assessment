import { IClass } from "../App";

export const calculatePercentage = (schedule: IClass[]) => {
  let totalMinutes = 0;
  let instructionalMinutes = 0;
  const instructionalClasses: IClass[] = [];
  schedule.forEach((period) => {
    totalMinutes += period.duration;
    if (period.tags.includes("instructional")) {
      instructionalClasses.push(period);
    }
  });
  if (instructionalClasses.length === 0) {
    return 0;
  }

  instructionalClasses.forEach((period) => {
    instructionalMinutes += period.duration;
  });

  return Math.round((instructionalMinutes / totalMinutes) * 100) / 100;
};
