<template>
   <template v-for="(data, key) in items" :key="data?.[uid] || key">
      <slot v-bind="{ data, index: key }" />
   </template>

   <LazyListObserver @intersect="onIntersect" />
</template>

<script lang="ts">
export default {
   name: 'LazyList'
};
</script>

<script lang="ts" setup>
import { ComputedRef } from 'vue';
import { shallowEqual } from 'fast-equals';
import LazyListObserver from './LazyListObserver.vue';

const props = defineProps({
   /** List dataset to use */
   dataset: {
      type: Array,
      default: () => [],
      required: true
   },

   /** UID to set as key. Defaults to index value */
   uid: {
      type: String,
      default: null,
   },

   /** Number of loaded on initial render */
   initialItems: {
      type: Number,
      default: 10
   },

   /** Number of items to load on intersection */
   buffer: {
      type: Number,
      default: 5
   },

   /** Creates a watcher to reset index when whole data updates */
   resetOnChange: Boolean
});

const index = ref(props.initialItems);
const items = computed(() => props.dataset.slice(0, index.value)) as ComputedRef<any[]>;

// Methods
function onIntersect() {
   const newIndex = index.value + props.buffer;
   const data = props.dataset.slice(index.value, newIndex);

   items.value.push(...data);
   index.value = newIndex;
}

function reset() {
   index.value = Number(props.initialItems);
}

if (props.resetOnChange) {
   const stop = watch(() => props.dataset, (newVal, oldVal) => {
      if (shallowEqual((newVal), (oldVal))) return;
      reset();
   });

   onUnmounted(stop);
}

defineExpose({ reset });
</script>
