<script>
  import { onMount } from "svelte";
  import { PagefindUI } from "@pagefind/default-ui";
  import "@pagefind/default-ui/css/ui.css";

  onMount(() => {
    new PagefindUI({
      element: "#search",
      language: 'ja',
      showSubResults: false,
      showImages: false,
      bundlePath: 'https://js.dictionary4.dev/h1_only_search/',
      baseUrl: "/content/",
      pageSize: 8,
    });
  });
</script>

<section class="searchBox">
  <div id="search" class='pgSearch'></div>
</section>