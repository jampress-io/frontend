<template>
  <section class="page bg-gradient-to-r from-indigo-600 to-pink-700">
    <div
      v-for="(panel, index) in post.acf.panels"
      :key="panel.acf_fc_layout + index"
      class="panel"
    >
      <component :is="panel.acf_fc_layout" :panel-contents="panel"></component>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
export default {
  asyncData({ params }) {
    console.log({ params })
    const pageSlug =
      params.id === '/' || params.id === ''
        ? 'vue-wordpress-headless'
        : params.id
    console.log({ pageSlug })
    return axios
      .get(`${process.env.baseUrl}/wp-json/wp/v2/pages?slug=${pageSlug}`)
      .then((response) => {
        return { post: response.data[0] }
      })
      .catch((error) => {
        return { error }
      })
  },
  data() {
    return {
      post: {},
      error: [],
    }
  },
  head() {
    return {
      title: this.post._yoast_wpseo_title,
      meta: [
        {
          hid: 'description',
          id: 'description',
          name: 'description',
          content: this.post._yoast_wpseo_metadesc,
        },
      ],
    }
  },
}
</script>
