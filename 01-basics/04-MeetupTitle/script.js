import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const MeetupTitle = createApp({
  data() {
    return {
      meetupId: null,
      meetupTitle: null,
    }
  },

  watch: {
    meetupId: {
      async handler(v) {
        const meetup = await fetchMeetupById(v);
        this.meetupTitle = meetup.title;
      }
    }
  }
});

MeetupTitle.mount('#app');
