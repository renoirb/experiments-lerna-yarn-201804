<template>
  <div
    :class="[classes]"
  >
    <a
      :href="productUrl"
    >
      {{ productName }}
    </a>
    &nbsp;
    &copy;
    &nbsp;
    {{ firstYear }}-{{ year }}
    &nbsp;
    <a
      :href="publisherUrl"
    >
      {{ publisherName }}
    </a>
  </div>
</template>

<script>
// @vue/component
export default {
  name: 'u-copyright-links',
  props: {
    productName: {
      type: String,
      default: 'CatFacts',
    },
    productUrl: {
      type: String,
      default: 'http://www.catfacts.co/',
    },
    publisherName: {
      type: String,
      default: 'PiedPiper',
    },
    publisherUrl: {
      type: String,
      default: 'http://www.piedpiper.com/',
    },
    firstYear: {
      type: Number,
      default: 1998,
    },
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    classes () {
      const classes = {
        'u-copyright-links--component': true,
      }

      return classes
    },
  },
}
</script>
