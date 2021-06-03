export const state = () => ({
  pages: [],
  posts: [],
})

export const mutations = {
  updatePages: (state, pages) => {
    state.pages = pages
  },

  updatePosts: (state, posts) => {
    state.posts = posts
  },
}

export const actions = {
  async getPages({ state, commit }) {
    if (state.pages.length) return
    try {
      let pages = await fetch(
        `${process.env.BASE_URL}/wp-json/wp/v2/pages`
      ).then((res) => res.json())
      pages = pages
        .filter((el) => el.status === 'publish')
        .map(({ id, slug, title, excerpt, date, tags, content, acf }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content,
          acf,
        }))
      commit('updatePages', pages)
    } catch (err) {
      console.log(err)
    }
  },

  async getPosts({ state, commit }) {
    if (state.posts.length) return
    try {
      let posts = await fetch(
        `${process.env.BASE_URL}/wp-json/wp/v2/posts`
      ).then((res) => res.json())
      posts = posts
        .filter((el) => el.status === 'publish')
        .map(({ id, slug, title, excerpt, date, tags, content, acf }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content,
          acf,
        }))
      commit('updatePosts', posts)
    } catch (err) {
      console.log(err)
    }
  },
}
