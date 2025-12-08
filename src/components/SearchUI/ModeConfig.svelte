<script lang='ts'>
  import { onMount } from "svelte";

  export let searchMode: string;
  function changeMode(toMode: string) {
    searchMode = toMode;
    updateUrl(toMode);
  }

  onMount(async () => {
    //1. URLから初期クエリを取得
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('m') ?? '見出し';
    searchMode = initialQuery;
  })

  function updateUrl(newQuery: string) {
    if (typeof window === 'undefined') return;

    const newUrl = new URL(window.location.href);
    if (newQuery) {
      newUrl.searchParams.set('m', newQuery);
    }
    window.history.replaceState({}, '', newUrl.toString());
  }
</script>

<div class='root'>
  <button
    on:click={() => changeMode('見出し')}
    disabled={searchMode === '見出し'}
  >
    見出し
  </button>
  <button
    on:click={() => changeMode('用例')}
    disabled={searchMode === '用例'}
  >
    用例
  </button>
  <button
    on:click={() => changeMode('全文')}
    disabled={searchMode === '全文'}
  >
    全文
  </button>
</div>

<style lang='scss'>
  .root {
    --side-margin: 7px;
    margin: 0 var(--side-margin);
    width: calc(100% - 2 * var(--side-margin));
    display: flex;
    button {
      flex: 1;
      font-family: var(--font-zen-kaku-gothic-new);
      font-size: 14px;
      margin: 0;
      height: 28px;
      border: solid var(--themeColor);
      border-width: 1px 0.5px;
      background: var(--codeBack);
      &:first-child {
        border-radius: 7px 0 0 7px;
        border-left-width: 1px !important;
      }
      &:last-child {
        border-radius: 0 7px 7px 0;
        border-right-width: 1px !important;
      }
      &:disabled {
        color: var(--codeBack);
        font-weight: 700;
        background-color: var(--themeColor);
      }
    }
  }
</style>