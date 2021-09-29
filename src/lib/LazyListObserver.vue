<template>
   <div ref="root" class="observer" />
</template>

<script lang="ts">
export default {
   name: 'LazyListObserver'
};
</script>

<script lang="ts" setup>
import { PropType } from 'vue';
import { useObserver } from './utils';

const props = defineProps({
   options: {
      type: Object as PropType<IntersectionObserverInit>,
      default: () => ({
         rootMargin: '300px'
      })
   }
});
const emit = defineEmits(['intersect']);
const root = ref();

useObserver(root, ([entry]) => {
   if (entry && entry.isIntersecting) {
      emit('intersect');
   }
}, props.options);
</script>
