<template>
  <section
    v-if="post"
    class="page bg-gradient-to-r from-indigo-600 to-pink-700"
  >
    <!-- <h1>{{ post.title.rendered }}</h1> -->
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
    if (payload) return { post: payload }
    else
      return await axios
        .get(`${process.env.BASE_URL}/wp-json/wp/v2/posts?slug=${params.id}`)
        .then((response) => {
          const page = response.data[0]
          return { page }
        })
        .catch((error) => {
          return { error }
        })
  },
  // data() {
  //   return {
  //     slug: this.$route.params.slug,
  //   }
  // },
  // computed: {
  //   posts() {
  //     return this.$store.state.posts
  //   },

  //   post() {
  //     return this.posts.find((el) => el.slug === this.slug)
  //   },
  // },
  // created() {
  //   if (!this.$store.state.posts.length) {
  //     this.$store.dispatch('getPosts')
  //   }
  // },
  head() {
    if (this.post) {
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
    }
  },
}
</script>
