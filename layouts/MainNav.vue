<template>
  <nav class="main-nav">
    <ul class="main-nav__list">
      <li
        v-for="navItem in navItems"
        :key="navItem.ID"
        class="main-nav__list__item"
      >
        <NuxtLink
          :to="parseRoute(navItem.url)"
          class="main-nav__list__item__link"
        >
          {{ navItem.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MainNav',

  data() {
    return {
      navItems: {},
      error: [],
    }
  },

  beforeMount() {
    axios
      .get(`${process.env.baseUrl}/wp-json/menus/v1/menus/main-menu`)
      .then((response) => {
        this.navItems = response.data.items
      })
      .catch((error) => {
        this.error = error
      })
  },

  methods: {
    parseRoute(route) {
      return route.replace(process.env.baseUrl, '')
    },
  },
}
</script>

<style lang="scss" scoped>
.main-nav {
  position: relative;
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
  background-color: #444444;

  &__list {
    display: flex;
    width: 100%;
    max-width: 1200px;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    padding: 0;
    list-style: none;

    &__item {
      flex: 0 0 auto;
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: center;

      &__link {
        display: flex;
        align-items: center;
        justify-content: stretch;
        width: 100%;
        height: 100%;
        padding: 0 2rem;
        font-weight: 700;
        color: white;
        text-decoration: none;
        transition: all 0.2s ease-in-out;

        &:hover {
          color: #222222;
          background-color: #ed8936;
        }
      }
    }
  }
}
</style>
