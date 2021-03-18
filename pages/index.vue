<template>
  <section class="page bg-gradient-to-r from-indigo-600 to-pink-700">
    <div
      v-for="(panel, index) in page.acf.panels"
      :key="panel.acf_fc_layout + index"
      class="panel"
    >
      <component :is="panel.acf_fc_layout" :panel-contents="panel"></component>
    </div>
  </section>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    return await $axios
      .$get(`${process.env.baseUrl}/wp-json/wp/v2/pages?slug=home`)
      .then((response) => {
        console.log({ response })
        return { page: response[0] }
      })
      .catch((error) => {
        return { error }
      })
  },
  data() {
    return {
      page: {},
      error: [],
    }
  },
  head() {
    return {
      title: this.page._yoast_wpseo_title,
      meta: [
        {
          hid: 'description',
          id: 'description',
          name: 'description',
          content: this.page._yoast_wpseo_metadesc,
        },
      ],
    }
  },
}
</script>
