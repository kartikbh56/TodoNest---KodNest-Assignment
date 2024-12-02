export const initialDate = {
  currentDate: new Date(),
};

export function dateReducer(day, action) {
  switch (action.type) {
    case "nextDay": {
      const nextDay = new Date(day.currentDate);
      nextDay.setDate(day.currentDate.getDate() + 1);
      return { ...day, currentDate: nextDay };
    }
    case "previousDay": {
      const previousDay = new Date(day.currentDate);
      previousDay.setDate(day.currentDate.getDate() - 1);
      return { ...day, currentDate: previousDay };
    }
  }
}
