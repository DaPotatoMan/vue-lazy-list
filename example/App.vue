<template>
   <main class="list">
      <h1 class="title">
         Vue Lazy List
      </h1>

      <div>
         <button @click="updateList">
            Update List
         </button>
         <button @click="reset">
            Reset
         </button>
         <br>
         <span>Total items: {{ items?.length }}</span>
      </div>
      <br>

      <LazyList
         v-slot="{ data }"
         ref="list"
         :dataset="items"
         :buffer="3"
         :reset-on-change="true"
      >
         <LazyListItem :unrender-delay="1500" :min-height="50" class="item">
            {{ data }}
         </LazyListItem>
      </LazyList>
   </main>
</template>

<script lang="ts" setup>
import { LazyList, LazyListItem } from '~/index';

const list = ref();
const items = shallowRef([] as number[]);

// Methods
function updateList() {
   items.value = [...Array(Math.round(Math.random() * 10000)).keys()];
}

function reset() {
   list.value?.reset?.();
}

updateList();
</script>

<style lang="postcss">
#app {
   @apply h-screen w-screen overflow-hidden
   flex items-center justify-center
   bg-[#101010] text-white;
}

button {
   @apply px-5 py-2 my-5 not-last-of-type:mr-4
   bg-[#222222] hover:bg-[#262626]
   focus:outline-none shadow-md rounded
   active:(transform scale-99);
}

.list {
   @apply h-80vh w-70vw py-6 px-10 mx-auto
   overflow-hidden overflow-y-auto
   bg-true-gray-900 rounded-md;
   scrollbar-width: thin;

   .title {
      @apply mb-5 text-2xl leading-relaxed;
   }

   .item {
      @apply py-5 px-7 w-full
      bg-true-gray-800
      rounded-md shadow not-last-of-type:mb-5;
   }
}
</style>
