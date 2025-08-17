<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const router = useRouter();
const items: NavigationMenuItem[] = [];

</script>

<template>
  <UApp>
    <div class="app flex flex-col h-screen w-screen items-center">
      <div class="main flex-1 overflow-y-scroll w-full max-w-2xl px-2">
        <NuxtPage />
      </div>

      <UNavigationMenu color="neutral" variant="link" :items="items" class="w-full" />

      <div class="footer text-xs w-full text-center text-muted p-2">
        лапки в рамке! with love by @tsivx
      </div>
    </div>
  </UApp>
</template>