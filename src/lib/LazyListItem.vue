<template>
   <div ref="targetEl">
      <slot v-if="isActive" />
   </div>
</template>

<script lang="ts">
export default {
   name: 'LazyListItem'
};
</script>

<script lang="ts" setup>
import { useObserver } from './utils';

const props = defineProps({
   minHeight: {
      type: Number,
      default: 0,
      required: true
   },
   unrenderDelay: {
      type: Number,
      default: 10000,
   },
});

const targetEl = ref() as Ref<HTMLElement>;
const isActive = ref(true);

let unrenderTimer: NodeJS.Timeout;
let renderTimer: NodeJS.Timeout;

// Methods
const render = (value = true) => {
   isActive.value = value;
};

// Observe For Changes
useObserver(targetEl, ([entry]) => {
   const node = targetEl.value;

   if (entry.isIntersecting) {
      // Clear Styles
      node.removeAttribute('style');

      // Render Element
      clearTimeout(unrenderTimer);
      renderTimer = setTimeout(render, 200);
      render();
   } else {
      clearTimeout(renderTimer);
      unrenderTimer = setTimeout(() => {
         node.style.minHeight = `${entry.boundingClientRect.height}px`;
         render(false);
      }, props.unrenderDelay);
   }
}, { rootMargin: '600px' });
</script>
