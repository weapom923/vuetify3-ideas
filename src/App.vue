<template>
  <v-app>
    <v-main>
      <auto-scroll-button-sample>
      </auto-scroll-button-sample>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AutoScrollButtonSample from './components/AutoScrollButton/Sample.vue';
const App = defineComponent({
  components: {
    AutoScrollButtonSample,
  },

});
export default App;
</script>
