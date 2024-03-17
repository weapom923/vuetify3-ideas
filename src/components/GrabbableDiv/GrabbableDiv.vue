<template>
  <div
    v-on:mousedown.stop="$_onMousedown"
    v-on:mousemove="$_onMousemove"
    v-on:mouseleave="$_onMouseleave"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  user-select: none;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

class MousedownContext {
  constructor(
    readonly clientX: number,
    readonly clientY: number,
    readonly scrollTop: number,
    readonly scrollLeft: number,
    readonly scrollElement: HTMLElement,
  ) {}
}

const GrabbableDiv = defineComponent({
  data(): {
    $_mousedownContext?: MousedownContext,
  } {
    return {
      $_mousedownContext: undefined,
    };
  },

  props: {
    target: { type: HTMLElement, default: (): HTMLElement => (document.body) },
  },

  watch: {
    target(currentTarget?: Element, previousTarget?: Element) {
      if (this.$data.$_mousedownContext) {
        if (previousTarget) this.$_removeEventListener(previousTarget);
        if (currentTarget) this.$_addEventListener(currentTarget);
      }
    }
  },

  methods: {
    $_addEventListener(target: Element) {
      target.addEventListener('mousemove', this.onMousemove);
      target.addEventListener('mouseup', this.onMouseup);
    },

    $_removeEventListener(target: Element) {
      target.removeEventListener('mousemove', this.onMousemove);
      target.removeEventListener('mouseup', this.onMouseup);
    },

    $_onMousedown(event: Event) {
      if (!(event instanceof MouseEvent)) return;
      const element = event.target as HTMLDivElement;
      if (!element.parentElement) return;
      this.$data.$_mousedownContext = new MousedownContext(
        event.clientX,
        event.clientY,
        element.parentElement.scrollTop,
        element.parentElement.scrollLeft,
        element.parentElement,
      );
      this.$_addEventListener(this.target);
    },

    $_onMousemove() {
      if (this.$data.$_mousedownContext) return;
      this.target.style.cursor = 'grab';
    },

    $_onMouseleave() {
      if (this.$data.$_mousedownContext) return;
      this.target.style.cursor = '';
    },

    /* public */
    onMousemove(event: Event) {
      if (!this.$data.$_mousedownContext) return;
      if (!(event instanceof MouseEvent)) return;
      if (event.buttons === 0) {
        this.onMouseup(event);
        return;
      }
      const offsetX = event.clientX - this.$data.$_mousedownContext.clientX;
      const offsetY = event.clientY - this.$data.$_mousedownContext.clientY;
      this.$data.$_mousedownContext.scrollElement.scroll({
        left: this.$data.$_mousedownContext.scrollLeft - offsetX, 
        top: this.$data.$_mousedownContext.scrollTop - offsetY,
      });
      this.target.style.cursor = 'grabbing';
    },

    onMouseup(event: Event) {
      if (!(event instanceof MouseEvent)) return;
      this.$data.$_mousedownContext = undefined;
      this.target.style.cursor = '';
      this.$_removeEventListener(this.target);
    },
  },
});
export default GrabbableDiv;
</script>