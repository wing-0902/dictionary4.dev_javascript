<script lang='ts' setup>
  import { ref } from 'vue';
  import SeeMore from '../Icons/SeeMore.vue';
</script>

<script lang='ts'>
  const hidden = ref(true)

  function changeStatus() {
    hidden.value = !hidden.value;
  }
</script>

<template>
  <div class='root'>
    <button
      @click='changeStatus'
    >
      <SeeMore />
    </button>
  </div>
  <div
    :class="{ hidden: hidden }"
    class='menuSlot'>

  </div>
</template>

<style scoped lang='scss'>
  .root {
    button {
      border: none;
      background: transparent;
      color: var(--foreground);
    }
    position: relative;
  }
  .menuSlot {
    background: color-mix(in srgb, var(--codeBack) 80%);
    border: 1px solid var(--codeBack);
    width: 300px;
    height: 400px;
    max-height: calc(100dvh - 30px);
    max-width: calc(--100dvh - 30px);
    position: absolute;
    right: 7px;
    top: 50px;
    z-index: 1000;
    backdrop-filter: brightness(85%) blur(8px);
    transition: all 0.25s ease;
    &.hidden {
      transform: translate3d(155px, -230px, 0) scale(0);
    }
  }
</style>