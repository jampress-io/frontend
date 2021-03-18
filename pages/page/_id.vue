<template>
  <section class="page">
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
  async asyncData({ params, error, payload }) {
    if (payload) {
      console.warn('Payload')
      console.log({ payload })
      // return { page: payload }
    } else {
      // return { user: await backend.fetchUser(params.id) }
      return await axios
        .get(`${process.env.baseUrl}/wp-json/wp/v2/pages?slug=${params.id}`)
        .then((response) => {
          console.log(response.data[0])
          return { post: response.data[0] }
        })
        .catch((error) => {
          return { error }
        })
    }
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
