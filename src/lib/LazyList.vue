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
   listData: {
      type: Array,
      default: () => [],
      required: true
   },

   uid: {
      type: String,
      default: null,
      required: true
   },

   initialItems: {
      type: Number,
      default: 10
   },

   buffer: {
      type: Number,
      default: 5
   },

   resetOnChange: Boolean
});

const index = ref(props.initialItems);
const items = computed(() => props.listData.slice(0, index.value)) as ComputedRef<any[]>;

// Methods
function onIntersect() {
   const newIndex = index.value + props.buffer;
   const data = props.listData.slice(index.value, newIndex);

   items.value.push(...data);
   index.value = newIndex;
}

function reset() {
   index.value = Number(props.initialItems);
}

if (props.resetOnChange) {
   const stop = watch(() => props.listData, (newVal, oldVal) => {
      if (shallowEqual((newVal), (oldVal))) return;
      reset();
   });

   onUnmounted(stop);
}

defineExpose({ reset });
</script>
