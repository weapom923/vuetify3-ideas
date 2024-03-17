<template>
  <div class="d-flex flex-row">
    <auto-scroll-button
      direction="left"
      scroll-size="100"
      v-bind:target="$data.$_autoScrollTarget"
    >
    </auto-scroll-button>
    <div
      ref="scrollArea"
      class="flex-grow-1 overflow-x-hidden"
    >
      <div id="scroll-area-content"></div>
    </div>
    <auto-scroll-button
      direction="right"
      scroll-size="100"
      v-bind:target="$data.$_autoScrollTarget"
    >
    </auto-scroll-button>
  </div>
</template>

<style scoped>
#scroll-area-content {
  background: linear-gradient(to right, #ff0000, #0015ff);
  width: 200%;
  height: 100%;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import AutoScrollButton from './AutoScrollButton.vue';
const Sample = defineComponent({
  components: { AutoScrollButton },
  data(): {
    $_autoScrollTarget?: HTMLDivElement,
  } {
    return {
      $_autoScrollTarget: undefined
    };
  },
  mounted() {
    this.$data.$_autoScrollTarget = this.$refs.scrollArea as HTMLDivElement;
  },
});
export default Sample;
</script>