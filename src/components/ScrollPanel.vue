<script setup lang="ts">
defineProps<{
  cards: {
    title: string
    desctription: string
    repo: string
  }[]
}>()
</script>

<template>
  <div>
    <div class="scroll-loop flex flex-col gap-4 ml-auto" v-for="i in 2" :key="i">
      <UCard
        v-for="card in cards"
        :key="card.title + i"
        class="mb-4 content divide-white/10 timeline-note"
      >
        <template #header>
          <h2 class="text-lg font-bold">{{ card.title }}</h2>
        </template>
        <p class="text-sm mb-4">{{ card.desctription }}</p>
        <template #footer>
          <a :href="card.repo" class="text-neutral hover:underline">View Repository</a>
        </template>
      </UCard>
    </div>
  </div>
</template>

<style scoped>
@keyframes timeline-scrollConstant {
  0% {
    transform: translate3d(0, -128px, 0);
  }
  to {
    transform: translate3d(0, calc(-100% - 128px - 16px), 0);
  }
}
.scroll-loop {
  animation: timeline-scrollConstant 30s linear infinite;
}

.timeline:has(.timeline-note:hover) .scroll-loop {
  animation-play-state: paused;
}

.content {
  background: color-mix(in srgb, rgb(40, 45, 46) 65%, transparent);
}
</style>
