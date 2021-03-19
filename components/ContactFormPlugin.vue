<template>
  <div
    v-if="panelContents.form_id && panelContents.form_shortcode"
    class="page-content-wrapper"
    :class="panelContents.form_wrapper_class"
  >
    <div class="page-content" :class="panelContents.form_class">
      <p v-if="panelContents.intro_text" class="mb-4">
        {{ panelContents.intro_text }}
      </p>

      <div :id="panelContents.form_id" :ref="panelContents.form_id" class="">
        <p>Form will be displayed here...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',

  props: {
    panelContents: {
      type: Object,
      default() {
        return {}
      },
    },
  },

  data() {
    return {}
  },

  mounted() {
    const formContents = []
    const formFragment = document
      .createRange()
      .createContextualFragment(this.panelContents.form_shortcode)

    const contactForm = formFragment.querySelector('.wpcf7-form')

    const contactFormFields = [...contactForm]
    contactFormFields.forEach((contactFormField) => {
      formContents.push(contactFormField)
    })
  },

  methods: {
    handleSubmit() {
      // event.preventDefault()
      console.warn('Contact Form Submitted')
    },

    encode(data) {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
    },
  },
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  flex: 1 0 100%;
}
</style>
