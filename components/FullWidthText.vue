<template>
  <div
    :id="panelContents.full_width_text_id"
    class="full-width-text-wrapper"
    :class="panelContents.full_width_text_wrapper_class"
  >
    <div
      class="full-width-text"
      :class="panelContents.full_width_text_class"
    >
      <h1
        class="full-width-text__title"
        :class="panelContents.full_width_text_title_class"
      >{{ panelContents.title }}</h1>

      <h2
        class="full-width-text__subtitle"
        :class="panelContents.full_width_text_subtitle_class"
      >{{ panelContents.subtitle }}</h2>

      <div
        class="full-width-text__content"
        :class="panelContents.full_width_text_content_class"
        v-html="panelContents.content"
      ></div>

      <a
        class="full-width-text__cta"
        :class="panelContents.full_width_text_cta_button_class"
        :href="panelContents.cta_button_link"
      >{{ panelContents.cta_button_text }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',

  props: {
    panelContents: Object
  }
}
</script>

<style lang="scss" scoped>
</style>
