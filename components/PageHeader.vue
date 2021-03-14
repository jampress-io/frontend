<template>
  <div
    :id="panelContents.header_id"
    class="page-header-wrapper"
    :class="panelContents.header_wrapper_class"
    :style="{
      backgroundImage:
        panelContents.background_image.url &&
        'url(' + panelContents.background_image.url + ')',
    }"
  >
    <div class="page-header" :class="panelContents.header_class">
      <h1
        v-if="panelContents.title"
        class="page-header__title"
        :class="panelContents.header_title_class"
      >
        {{ panelContents.title }}
      </h1>

      <h2
        v-if="panelContents.subtitle"
        class="page-header__subtitle"
        :class="panelContents.header_subtitle_class"
      >
        {{ panelContents.subtitle }}
      </h2>

      <div
        v-if="panelContents.content"
        class="page-header__content"
        :class="panelContents.header_content_class"
        v-html="panelContents.content"
      ></div>

      <NuxtLink
        v-if="panelContents.cta_button_link && panelContents.cta_button_text"
        class="page-header__cta"
        :class="panelContents.header_cta_button_class"
        :to="panelContents.cta_button_link"
        >{{ panelContents.cta_button_text }}</NuxtLink
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',

  props: {
    panelContents: Object,
  },
}
</script>

<style lang="scss" scoped>
.page-header-wrapper {
  min-height: 400px;
}
</style>
