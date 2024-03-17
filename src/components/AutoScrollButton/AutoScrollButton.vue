<template>
  <v-btn
    v-bind:icon="$_buttonIconName"
    v-bind:disabled="$data.$_scrollOffset === 0"
    v-on:pointerover="$_onPointerover"
    v-on:pointerout="$_stopScroll"
  >
  </v-btn>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';

enum ScrollDirection {
  Right = "right",
  Left = "left",
};

const AutoScrollButton = defineComponent({
  watch: {
    target: {
      handler(currentTarget?: HTMLElement, previousTarget?: HTMLElement) {
        if (previousTarget) {
          previousTarget.removeEventListener('scroll', this.$_updateTimelineScrollOffset);
          this.$data.$_targetResizeObserver.unobserve(previousTarget);
        }
        if (currentTarget) {
          currentTarget.addEventListener('scroll', this.$_updateTimelineScrollOffset);
          this.$data.$_targetResizeObserver.observe(currentTarget);
          this.$_updateTimelineScrollOffset();
        }
      },
      deep: true,
      immediate: true,
    },
  },

  props: {
    target:     { type: HTMLElement },
    icon:       { type: String },
    direction:  { type: String as PropType<ScrollDirection>, required: true },
    scrollSize: {
      type: [ Number, String ],
      default: 10,
      validator: (scrollSize: number | string): boolean => {
        return !Number.isNaN(Number(scrollSize));
      },
    },
  },

  data(): {
    $_targetResizeObserver: ResizeObserver,
    $_scrollOffset: number,
    $_scrollTimeoutId?: number,
  } {
    return {
      $_targetResizeObserver: new ResizeObserver(() => {
        this.$_updateTimelineScrollOffset();
      }),
      $_scrollOffset: 0,
      $_scrollTimeoutId: undefined,
    };
  },

  computed: {
    $_scrollSizeInternal(): number {
      return Number(this.scrollSize);
    },

    $_buttonIconName(): string {
      if (this.icon) return this.icon;
      switch (this.direction) {
        case ScrollDirection.Left:
          return 'mdi-chevron-double-left';
        case ScrollDirection.Right:
          return 'mdi-chevron-double-right';
        default:
          return '';
      }
    },
  },

  beforeUnmount() {
    if (this.target) {
      this.target.removeEventListener('scroll', this.$_updateTimelineScrollOffset);
      this.$data.$_targetResizeObserver.unobserve(this.target);
    }
  },

  methods: {
    $_onPointerover() {
      if (this.$data.$_scrollTimeoutId !== undefined) return;
      this.$_keepScroll();
    },

    $_onPointerout() {
      if (this.$data.$_scrollTimeoutId === undefined) return;
      this.$_stopScroll();
    },

    $_keepScroll() {
      this.$data.$_scrollTimeoutId = window.setTimeout(
        () => {
          if (this.target === undefined) return;
          switch (this.direction) {
            case ScrollDirection.Left:
              this.target.scrollTo(
                this.target.scrollLeft - this.$_scrollSizeInternal,
                this.target.scrollTop,
              );
              break;
            case ScrollDirection.Right:
              this.target.scrollTo(
                this.target.scrollLeft + this.$_scrollSizeInternal,
                this.target.scrollTop,
              );
              break;
          }
          this.$_keepScroll();
        },
        50,
      );
    },

    $_stopScroll() {
      window.clearTimeout(this.$data.$_scrollTimeoutId);
      this.$data.$_scrollTimeoutId = undefined;
    },

    $_updateTimelineScrollOffset() {
      if (this.target === undefined) return;
      switch (this.direction) {
        case ScrollDirection.Left:
          this.$data.$_scrollOffset = this.target.scrollLeft;
          break;
        case ScrollDirection.Right:
          this.$data.$_scrollOffset = this.target.scrollWidth - (this.target.offsetWidth + this.target.scrollLeft);
          break;
      }
    },
  }
});

export default AutoScrollButton;
</script>