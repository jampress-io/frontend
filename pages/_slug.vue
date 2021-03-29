<template>
  <section
    v-if="page"
    class="page bg-gradient-to-r from-indigo-600 to-pink-700"
  >
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
import axios from 'axios'
export default {
  async asyncData({ params, error, payload }) {
    if (payload) return { user: payload }
    else
      return await axios
        .get(`https://cms.jampress.dev/wp-json/wp/v2/posts?slug=${params.id}`)
        .then((response) => {
          console.log(response.data[0])
          return { post: response.data[0] }
        })
        .catch((error) => {
          return { error }
        })
  },
  data() {
    return {
      slug: this.$route.params.slug,
    }
  },
  computed: {
    pages() {
      return this.$store.state.pages
    },

    page() {
      return this.pages.find((el) => el.slug === this.slug)
    },
  },
  created() {
    if (!this.$store.state.pages.length) {
      this.$store.dispatch('getPages')
    }
  },
  head() {
    if (this.page) {
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
    }
  },
}
</script>
