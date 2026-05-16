<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <UApp>
    <header v-if="$route.path !== '/'">
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <!---        <RouterLink to="/stream-cave">Stream Cave</RouterLink> --->
        </nav>
      </div>
    </header>

    <RouterView class="text-base" />
  </UApp>
</template>
