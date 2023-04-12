<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="handleGoPrevious(currentMonth)"
        ></button>
        <div class="calendar-view__date">{{ currentDateFormatted }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="handleGoNext"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <CalendarDay
        v-for="(item, index) in calendarsItems"
        :key="index"
        :day="item"
        :currentMonth="currentMonth"
        :meetups="currentMeetupsForDay(item.date)"
      />
    </div>
  </div>
</template>

<script>
import CalendarDay from "./CalendarDay.vue";
export default {
  name: 'MeetupsCalendar',

  components: {
    CalendarDay,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(),
    };
  },

  computed: {
    currentDateFormatted() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },

    currentMonth() {
      return this.date.getMonth();
    },

    lastMonthsDayFullDate() {
       return this.getLastMonthsDayFullDate(this.date);
    },

    lastMonthsDay() {
      return this.lastMonthsDayFullDate.getDate();
    },

    firstMonthsDayOfWeek() {
      const firstMonthsDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);

      return firstMonthsDay.getDay();
    },

    lastMonthsDayOfWeek() {
      return this.lastMonthsDayFullDate.getDay();
    },

    currentMonthDays() {
      return this.getCurrentMonthArray(this.date, this.lastMonthsDay);
    },

    lastMonthDays() {
      return this.getLastMonthArray(this.date, this.firstMonthsDayOfWeek);
    },

    nextMonthDays() {
      return this.getNextMonthArray(this.date, this.lastMonthsDayOfWeek);
    },

    calendarsItems() {
      return this.lastMonthDays.concat(this.currentMonthDays, this.nextMonthDays);
    },

    currentMeetupsForMonth() {
      return this.meetups.filter(meetup => new Date(meetup.date).getMonth() === this.currentMonth);
    },
  },

  methods: {
    getLastMonthsDayFullDate(date) {
      const firstDayNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      const previousDay = new Date(firstDayNextMonth.getTime());

      previousDay.setDate(firstDayNextMonth.getDate() - 1);

      return previousDay;
    },

    getCurrentMonthArray(date, lastDay) {
      let currentMonthArray = [];

      for(let i = 1; i <= lastDay; i++) {
        const day = {
          date: i,
          month: date.getMonth(),
        };
        currentMonthArray.push(day);
      };

      return currentMonthArray;
    },

    getLastMonthArray(date, weekDay) {
      const weekDayInteger = weekDay === 0 ? 7 : weekDay;

      const lastMonthArray = [];
      const daysLeft = weekDayInteger - 1;

      if (daysLeft !== 0) {
        const closestMonday = new Date(date.getFullYear(), date.getMonth(), 1 - daysLeft).getDate();

        for(let i = closestMonday; i < (closestMonday + daysLeft); i++) {
          const day = {
            date: i,
            month: date.getMonth() - 1 > 0 ? date.getMonth() - 1 : 11,
          };

          lastMonthArray.push(day);
        }
      }

      return lastMonthArray
    },

    getNextMonthArray(date, weekDay) {
      const nextMonthArray = [];
      const daysLeft = 7 - weekDay;

      if (daysLeft !== 7) {
        for(let i = 1; i <= daysLeft; i++) {
          const day = {
            date: i,
            month: date.getMonth() + 1 > 11 ? 0 : date.getMonth() - 1,
          };

          nextMonthArray.push(day);
        }
      }

      return nextMonthArray;
    },

    handleGoPrevious() {
      this.date = new Date(this.date.getFullYear(), this.currentMonth - 1, 1);
    },

    handleGoNext() {
      this.date = new Date(this.date.getFullYear(), this.currentMonth + 1, 1);
    },

    currentMeetupsForDay(date) {
      return this.currentMeetupsForMonth.filter(meetup => new Date(meetup.date).getDate() === date);
    }
  },
};
</script>

<style scoped>
.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
