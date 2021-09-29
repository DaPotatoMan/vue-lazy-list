<h3 align="center">Vue Lazy List</h3>
<p align="center">
Lazily load your list! <b>Supports only Vue 3</b>
</p>

## 🚀 Features

- ⚡ **Ultra-fast & Lightweight**: ~1.3kB when minified/gzipped, [see bundle stats.](https://bundlephobia.com/package/vue-lazy-list)
- 🦾 **Type Strong**: Written in [Typescript](https://www.typescriptlang.org/), with [TS Docs.](https://github.com/microsoft/tsdoc)
- 🔋 **Automatic Unload**: Invisible elements are unloaded.

## 📦 Install

```bash
npm i vue-lazy-list
```

## 🦄 Usage

```vue
<template>
  <LazyList v-slot="{ data, index }" :dataset="list" :initial-items="15" :buffer="5">
    <LazyListItem :unrender-delay="3000" :min-height="50" class="item-wrapper">
      {{ data }}
    </LazyListItem>
  </LazyList>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LazyList, LazyListItem } from 'vue-lazy-list';

const list = ref([...Array(10000).keys()]);
</script>
```
> **Note:** Always apply margin styles on the item wrapper to accurately calculate height.

## 📄 License

[MIT License](https://github.com/dapotatoman/vue-lazy-list/blob/main/LICENSE) © 2021-PRESENT [dapotatoman](https://github.com/dapotatoman)
