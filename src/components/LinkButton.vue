<script setup lang="ts">
defineProps<{
  url?: string
}>()
</script>

<template>
  <a class="button-root" :href="url"
    ><div class="button-ripples"></div>
    <div class="button-content"><slot /></div
  ></a>
</template>

<style scoped>
.button-root {
  border-radius: 5px;
  width: 100%;
  line-height: 28px;
  position: relative;
  z-index: 1;
  display: block;
  min-width: 100px;
  padding: 7px 14px;
  text-align: center;
  font-weight: 400;
  font-size: 95%;
  box-shadow: none;
  text-decoration: none;
  background: rgb(52, 58, 60);
  overflow: clip;
  box-sizing: border-box;
  transition: background 0.1s ease;
  appearance: none;
  margin: 0;
  border: none;
  cursor: pointer;
  color: inherit;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  font-size: 1em;
  font-family: inherit;
  max-width: 100%;
  -webkit-touch-callout: none;
}
.button-ripples {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: clip;
  pointer-events: none;
}
.button-content {
  position: relative;
  z-index: 1;
  pointer-events: none;
}
</style>
