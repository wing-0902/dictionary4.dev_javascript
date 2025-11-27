<script lang='ts'>
  import { onMount } from "svelte";
  import { addQuery } from "../SearchUI/addQuery.mts";

  import ArrowBack from "../Icons/ArrowBack.svg.svelte";

  let query: string = '';
  let mode: string = '';

  export let href: string;
  export let show: boolean;

  const linkHref =
    href === '検索' ? "/" :
    "/";
  
  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q') ?? '';
    const initialMode = urlParams.get('m') ?? '見出し';
    query = initialQuery;
    mode = initialMode;
  })
</script>

{#if show}
  <div class='root'>
    <p>
      <a
        href={addQuery(linkHref, {
          'q': query,
          'm': mode,
        })}
      >
        <ArrowBack />
        <span>戻る</span>
      </a>
    </p>
  </div>
{/if}

<style lang="scss">
  .root {
    width: 100%;
    display: flex;
    align-items: center;
    p {
      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        span:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>