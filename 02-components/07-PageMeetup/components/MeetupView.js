import { defineComponent } from '../vendor/vue.esm-browser.js';

import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupDescription from "./MeetupDescription";
import MeetupCover from "./MeetupCover";
import MeetupAgenda from "./MeetupAgenda";
import MeetupInfo from "./MeetupInfo";

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <MeetupCover :title="meetup.title" :image="meetup.image"/>

      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description" />

            <h3>Программа</h3>
            <MeetupAgenda v-if="meetup.agenda.length" :agenda="meetup.agenda" />
            <UiAlert v-else>Программа пока пуста...</UiAlert>
          </div>
          <div class="meetup__aside">
            <MeetupInfo :date="meetup.date" :organizer="meetup.organizer" :place="meetup.place"/>
          </div>
        </div>
      </UiContainer>
    </div>`,
});
