export function useObserver(
   node: Ref<HTMLElement>,
   callback: IntersectionObserverCallback,
   options?: IntersectionObserverInit
): { stop: VoidFunction } {
   const observer = new IntersectionObserver(callback, options);

   const stop = () => {
      if (node.value) observer.unobserve(node.value);
      observer.disconnect();
   };

   onMounted(() => observer.observe(node.value));
   onUnmounted(stop);

   return { stop };
}
