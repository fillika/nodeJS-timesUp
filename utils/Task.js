class Task {
  constructor() {
    this.oneDayLength = 86400000;
  }

  createTaskFromNextDay(data) {
    const result = [];
    const dataCopy = JSON.parse(JSON.stringify(data));

    let start = dataCopy.start,
      duration = dataCopy.duration;
    this.createTaskListFromLongDate(data, start, duration, result);
    return result;
  }

  createTaskListFromLongDate(data, start, duration, result) {
    const startDay = {
      day: new Date(start).getDate(),
      month: new Date(start).getMonth() + 1,
      year: new Date(start).getFullYear(),
    };

    const currentDate = `${startDay.year}-${startDay.month}-${startDay.day}`;

    const currentDayInMs = new Date(currentDate).getTime(); // Нахожу начало текущего дня
    const nextDayInMS = currentDayInMs + this.oneDayLength; // Нахожу начало следующего дня
    const restOfCurrentDay = nextDayInMS - new Date(start).getTime(); // Это остаток для текущего дня у задачи.

    result.push({
      ...data,
      start: start,
      stop: nextDayInMS - 1,
      at: nextDayInMS - 1,
      duration: restOfCurrentDay,
    });

    start = nextDayInMS;
    duration -= this.oneDayLength;

    if (duration > 0) {
      this.createTaskListFromLongDate(data, start, duration, result);
    } else {
      start = nextDayInMS;

      result.push({
        ...data,
        start: start,
        stop: new Date(data.stop).getTime(),
        at: new Date(data.stop).getTime() + 1000,
        duration: duration + this.oneDayLength,
      });
    }
  }
}

const taskManager = new Task();

module.exports = taskManager;
