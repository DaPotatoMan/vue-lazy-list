<template>
   <main class="list">
      <h1 class="title">
         Vue Lazy List
      </h1>
      <LazyList v-slot="{ data }" :list-data="list" :buffer="3">
         <LazyListItem :unrender-delay="1500" :min-height="50" class="item">
            {{ data }}
         </LazyListItem>
      </LazyList>
   </main>
</template>

<script lang="ts" setup>
import { LazyList, LazyListItem } from '~/index';

const list = [...Array(10000).keys()];
</script>

<style lang="postcss">
#app {
   @apply h-screen w-screen overflow-hidden
   flex items-center justify-center
   bg-[#101010] text-white;
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
