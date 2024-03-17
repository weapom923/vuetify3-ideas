<template>
  <v-app>
    <v-main>
      <auto-scroll-button-sample>
      </auto-scroll-button-sample>
      <grabbable-div-sample>
      </grabbable-div-sample>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AutoScrollButtonSample from './components/AutoScrollButton/Sample.vue';
import GrabbableDivSample from './components/GrabbableDiv/Sample.vue';
const App = defineComponent({
  components: {
    AutoScrollButtonSample,
    GrabbableDivSample,
  },
});
export default App;
</script>
