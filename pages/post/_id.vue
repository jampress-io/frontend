<template>
  <section class="container">
    <div>
      <h1 class="title">
        {{ post.acf.page_header_title }}
      </h1>
      <span v-html="post.acf.page_header_subtitle"></span>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
export default {
  asyncData({ params }) {
    return axios
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
<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
