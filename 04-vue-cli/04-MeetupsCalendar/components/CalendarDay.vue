<template>
    <div class="calendar-view__cell" :class="inactiveCell" tabindex="0">
      <div class="calendar-view__cell-day">{{ day.date }}</div>
      <div v-if="currentMeetups.length" class="calendar-view__cell-content">
          <a
            v-for="meetup in currentMeetups"
            :key="meetup.id" href="/meetups/1"
            class="calendar-event"
          >
            {{ meetup.title }}
          </a>
      </div>

    </div>
</template>

<script>
export default {
  name: 'CalendarDay',

  props: {
    day: {
      type: Object,
      required: true,
    },

    currentMonth: {
      type: Number,
      required: true,
    },

    meetups: {
      type: Array,
      default: () => [],
    }
  },

  computed: {
    isCurrentMonthDay() {
      return this.currentMonth === this.day.month;
    },

    inactiveCell() {
      return ({
        'calendar-view__cell_inactive': !this.isCurrentMonthDay,
      });
    },

    currentMeetups() {
      return this.meetups.filter(meetup => new Date(meetup.date).getDate() === this.day.date);
    },
  },
}
</script>

<style scoped>
.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
