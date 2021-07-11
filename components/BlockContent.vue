<template>
  <!-- <div
    class="page-content-wrapper content-wrapper flex flex-grow flex-shrink-0 justify-center m-8 p-8 rounded shadow-xl bg-gray-900"
    v-html="blockContents.content.rendered"
  > -->
  <div
    class="w-full flex flex-grow flex-shrink-0 flex-row flex-wrap items-start justify-center pb-8 bg-gray-900 text-white"
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

<style lang="scss">
h2 {
  position: relative;
  display: block;
  margin: 0.5rem auto;
  padding-bottom: 1rem;
  font-size: 1.5rem;

  &::after {
    position: absolute;
    display: block;
    width: 50px;
    height: 2px;
    left: 50%;
    bottom: 0.75rem;
    transform: translateX(-50%);
    /* @extend .bg-pink-700; */
    background-color: #ed8936;
    content: '';
    transition: width 0.2s ease-out;
  }

  &:hover {
    &::after {
      width: 100%;
    }
  }
}

p {
  margin-bottom: 1rem;
}
</style>
