<template>
  <div
    v-if="panelContents.form_fields"
    :id="panelContents.form_id"
    class="page-content-wrapper"
    :class="panelContents.form_wrapper_class"
  >
    <div class="page-content" :class="panelContents.form_class">
      <p v-if="panelContents.intro_text" class="mb-4">
        {{ panelContents.intro_text }}
      </p>

      <form
        :id="`form-${panelContents.name}`"
        :name="panelContents.name"
        netlify
        method="post"
        data-netlify-honeypot="bot-field"
        class="w-full grid grid-cols-1 gap-6"
        @submit.prevent="handleSubmit"
      >
        <input type="hidden" name="form-name" :value="panelContents.name" />

        <div
          v-for="form_field in panelContents.form_fields"
          :key="form_field.name"
          class="w-full mb-2"
          :class="{ 'pb-8': form_field.type == 'textarea' }"
        >
          <label
            class="block"
            :class="{ 'h-full': form_field.type == 'textarea' }"
          >
            <span>{{ form_field.label }}</span>
            <input
              v-if="form_field.type !== 'textarea'"
              :type="form_field.type"
              :name="form_field.name"
              class="mt-1 block w-full text-black"
            />
            <textarea
              v-if="form_field.type == 'textarea'"
              :name="form_field.name"
              class="mt-1 block w-full text-black"
              rows="4"
            ></textarea>
          </label>
        </div>

        <button
          type="submit"
          class="px-8 py-4 bg-pink-700 hover:bg-indigo-600 transition duration-500 ease-out text-gray-900 uppercase rounded font-bold"
        >
          {{ panelContents.submit_button_text }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',

  props: {
    panelContents: Object,
  },

  methods: {
    handleSubmit(event) {
      event.preventDefault()
      const contactForm = document.getElementById(
        `form-${this.panelContents.name}`
      )
      const formData = new FormData(contactForm)
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      })
        .then((formResponse) => {
          console.warn({ formResponse })
          this.$nuxt.$options.router.push('thanks')
        })
        .catch((error) => {
          console.warn(error)
          this.$nuxt.$options.router.push('error')
        })
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
