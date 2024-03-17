<template>
  <div class="w-100">
    <grabbable-div class="overflow-x-hidden">
      <div id="content"></div>
    </grabbable-div>
  </div>
</template>

<style scoped>
#content {
  background: linear-gradient(to right, #ff0000, #0015ff);
  width: 200%;
  height: 50px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import GrabbableDiv from './GrabbableDiv.vue';
const Sample = defineComponent({
  components: { GrabbableDiv },
});
export default Sample;
</script>
