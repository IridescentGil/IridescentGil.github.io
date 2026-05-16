<script setup lang="ts">
import LinkButton from '@/components/LinkButton.vue'
import ScrollPanel from '@/components/ScrollPanel.vue'

const links = [
  { platform: 'Github', url: 'https://gtithub.com/IridescentGil/' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/apile-tyumre-875b28119' },
  { platform: 'Email', url: 'mailto:apiletyumre@iridescentsun.com' },
]

const cards = [
  {
    title: 'TheLab',
    desctription:
      'A C++ library for workout tracking built with modern standards. Utilizes GTest \
    for testing and CMake for building.',
    repo: 'https://github.com/IridescentGil/TheLab',
  },
  {
    title: 'StardomCalendar',
    desctription:
      'TypeScript applet to scrape the Stardom site and create a .ics file based on \
    their online calendar.',
    repo: 'https://github.com/IridescentGil/wwr-stardomCalendar',
  },
  {
    title: 'Stream-Cave',
    desctription:
      'Rust CLI application utilizing websockets to watch Twitch channels and play the \
    stream when a streamer goes live.',
    repo: 'https://github.com/IridescentGil/stream-cave',
  },
]
</script>

<template>
  <UMain>
    <div class="background-right" />
    <div class="shape" />
    <div class="py-25 ml-10 lg:ml-32">
      <div class="rounded-sm bg-[#282D2E]" style="width: min(430px, 100% - 32px)">
        <h1 class="text-center m-0 px-8 pt-4 pb-6 block text-2xl main-title">
          <span>Iridescent Sun</span>
        </h1>
        <div class="main-about px-8">
          <div class="text-center">
            Apile Tyumre is a Junior Software developer with knowledge in backend and web
            development.
          </div>
        </div>
        <div class="main-actions p-8 flex flex-col">
          <div v-for="link in links" :key="link.platform">
            <LinkButton class="button-root" :url="link.url"
              ><div class="button-ripples"></div>
              <div class="button-content">{{ link.platform }}</div></LinkButton
            >
            <br />
          </div>
        </div>
      </div>
    </div>
    <ScrollPanel
      class="hidden lg:flex fixed top-0 bottom-0 right-16 m-auto py-28 w-[500px] timeline flex-col text-right gap-4 overflow-hidden"
      :cards="cards"
    />
  </UMain>
</template>

<style scoped>
.background-right {
  position: fixed;
  top: 0;
  right: 0;
  width: 80vw;
  height: 100vh;
  background-image: url('/background-spooky.png');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.shape {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(71, 191, 232);
  clip-path: polygon(0% 0%, 45% 0%, 20% 100%, 0% 100%);
  z-index: -1;
}

.timeline {
  mask-image: linear-gradient(0deg, #0000, #000 128px calc(100% - 128px), #0000);
  -webkit-mask-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgb(0, 0, 0) 128px,
    rgb(0, 0, 0) calc(100% - 128px),
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
