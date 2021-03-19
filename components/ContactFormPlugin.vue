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

      <div
        :id="panelContents.form_id"
        :ref="panelContents.form_id"
        class="w-full"
      >
        <form
          v-if="form.id"
          :id="form.id"
          :name="form.id"
          @submit.prevent="handleSubmit"
        >
          <div
            v-for="formField in form.fields"
            :key="formField.name"
            class="w-full mb-2"
            :class="{ 'pb-8': formField.type == 'textarea' }"
          >
            <input
              v-if="formField.type === 'hidden'"
              :type="formField.type"
              :name="formField.name"
              :value="formField.value"
            />

            <label
              v-else-if="formField.type !== 'submit'"
              class="block"
              :class="{ 'h-full': formField.type == 'textarea' }"
            >
              <span>{{ formField.label }}</span>
              <input
                v-if="formField.type !== 'textarea'"
                :type="formField.type"
                :name="formField.name"
                class="mt-1 block w-full text-black"
              />
              <textarea
                v-if="formField.type == 'textarea'"
                :name="formField.name"
                class="mt-1 block w-full text-black"
                rows="4"
              ></textarea>
            </label>
          </div>

          <button
            type="submit"
            class="px-8 py-4 bg-gray-900 hover:bg-gray-700 text-white uppercase rounded"
          >
            {{ form.submitValue }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
    return {
      form: {
        id: null,
        fields: [],
        submitValue: '',
      },
    }
  },

  mounted() {
    const formFragment = document
      .createRange()
      .createContextualFragment(this.panelContents.form_shortcode)

    const contactForm = formFragment.querySelector('.wpcf7-form')

    const contactFormFields = [...contactForm]
    contactFormFields.forEach((contactFormField) => {
      // console.warn('Field')
      // console.log(contactFormField)

      const formField = {}
      const fieldLabel = contactFormField.closest('label')

      if (contactFormField.name === '_wpcf7') {
        this.form.id = contactFormField.value
      }

      if (contactFormField.type === 'submit') {
        this.form.submitValue = contactFormField.value
      }

      if (contactFormField.type !== 'submit') {
        formField.type = contactFormField.type
        formField.name = contactFormField.name
        formField.value = contactFormField.value
        formField.required = contactFormField['aria-required']
        if (fieldLabel) {
          formField.label = fieldLabel.textContent
        }

        this.form.fields.push(formField)
      }
    })
  },

  methods: {
    async handleSubmit() {
      // event.preventDefault()
      console.warn('Contact Form Submitted')

      const submittedContactForm = document.getElementById(this.form.id)
      // console.log({ submittedContactForm })
      const formData = new FormData(submittedContactForm)
      console.log({ formData })

      const formSubmitUrl = `${process.env.baseUrl}/wp-json/contact-form-7/v1/contact-forms/${this.form.id}/feedback`
      console.log({ formSubmitUrl })
      // const url = `${process.env.baseUrl}/wp-json/contact-form-7/v1/contact-forms/${this.form.id}/feedback`
      // console.log({ url })

      // const formResponse = await axios.post({
      //   method: 'POST',
      //   url: formSubmitUrl,
      //   data: formData,
      //   headers: { 'Content-Type': 'application/json' },
      // })
      // const body = await formResponse.json()
      // console.log({ body })

      const res = await fetch(formSubmitUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      })
      const body = await res
      console.log({ body })
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
