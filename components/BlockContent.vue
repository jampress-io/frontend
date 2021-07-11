<template>
  <!-- <div
    class="page-content-wrapper content-wrapper flex flex-grow flex-shrink-0 justify-center m-8 p-8 rounded shadow-xl bg-gray-900"
    v-html="blockContents.content.rendered"
  > -->
  <div
    class="w-full flex flex-grow flex-shrink-0 flex-row flex-wrap items-start justify-center p-8 bg-gray-900 text-white"
    v-html="blockContents.content.rendered"
  ></div>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'BlockContent',

  props: {
    blockContents: Object,
  },
}
</script>
