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
        netlify
        :name="panelContents.name"
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
              :type="form_field.type"
              class="mt-1 block w-full"
              :class="{ 'h-full': form_field.type == 'textarea' }"
              :rows="form_field.type == 'textarea' ? 4 : null"
            />
          </label>
        </div>

        <button
          type="submit"
          class="px-8 py-4 bg-gray-900 hover:bg-gray-700 text-white uppercase rounded"
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
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  flex: 1 0 100%;
}
</style>
