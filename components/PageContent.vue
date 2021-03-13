<template>
  <div
    v-if="panelContents.body"
    :id="panelContents.content_id"
    class="page-content-wrapper"
    :class="panelContents.content_wrapper_class"
  >
    <div
      class="page-content"
      :class="panelContents.content_class"
      v-html="panelContents.body"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'PageContent',

  props: {
    panelContents: Object
  }
}
</script>

<style lang="scss" scoped>
</style>
