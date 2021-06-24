class Task {
  constructor() {}

  createTaskFromNextDay(data) {
    const { start } = data;

    // Если это разные дни (следующий день), тогда мы разбиваем таск и создаем 2 задачи
    const startDay = {
      day: new Date(start).getDate(),
      month: new Date(start).getMonth() + 1,
      year: new Date(start).getFullYear(),
    };

    const currentDayInMs = new Date(
      `${startDay.year}-${startDay.month}-${startDay.day}`
    ).getTime(); // Нахожу начало текущего дня
    const nextDayInMS = currentDayInMs + 86400000; // Нахожу начало следующего дня
    const restOfCurrentDay = nextDayInMS - new Date(start).getTime(); // Это остаток для текущего дня у задачи.

    const currentTask = {
      ...data,
      stop: nextDayInMS - 1,
      at: nextDayInMS - 1,
      duration: restOfCurrentDay,
    };

    const nextDayTask = {
      ...data,
      start: nextDayInMS, // начало дня
      duration: data.duration - restOfCurrentDay, // Высчитываем оставшуюся длительность
      stop: nextDayInMS + data.duration - restOfCurrentDay, // Получаем время, когда таск закончился
      at: nextDayInMS + data.duration - restOfCurrentDay + 1000, // Дата для сортировки, всегда на 1 сек больше
    };

    return [currentTask, nextDayTask];
  }
}

const taskManager = new Task();

module.exports = taskManager;
