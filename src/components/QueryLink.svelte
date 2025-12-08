<script lang='ts'>
  export let href: string;

  import { addAutoQuery } from "./SearchUI/addQuery.mts";
</script>

<a
  href={addAutoQuery(href)}
>
  <slot />
</a>

<style lang="scss">
  a {
    text-decoration: none;
    &:active {
      text-decoration: underline;
    }
  }
</style>