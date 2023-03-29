import { defineComponent } from '../vendor/vue.esm-browser.js';

import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from "./MeetupView";

import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      meetup: null,
      errorMessage: null,
    }
  },

  methods: {
    async loadMeetup() {
      this.loading = true;

      try {
        const response = await fetchMeetupById(this.meetupId);

        this.meetup = response;
        this.loading = false;

      } catch (e) {
        this.errorMessage = e.message;
        this.loading = false;
      }
    },
  },

  async created() {
    await this.loadMeetup();
  },

  watch: {
    meetupId: {
      async handler(v) {
        await this.loadMeetup(v);
      },
    },
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup && !loading" :meetup="meetup" />

      <UiContainer v-else-if="loading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-else>
        <UiAlert>{{ errorMessage }}</UiAlert>
      </UiContainer>
    </div>`,
});
