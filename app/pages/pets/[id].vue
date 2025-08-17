<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig();
const appColorMode = useColorMode();

const { data: pet } = await useAsyncData(route.path, () => {
  return queryCollection('pets').path(route.path).first()
})

if (pet.value) {
  const { primary, neutral, colorMode } = pet.value.theme;

  appConfig.ui.colors.primary = primary;
  appConfig.ui.colors.neutral = neutral;
  appColorMode.preference = colorMode;
}

useSeoMeta({
  title: pet.value?.name || 'Питомец',
  description: pet.value?.description || 'Досье на питомца'
});

const copyPageLink = async () => {
  await navigator.clipboard.writeText(location.href)
}
</script>

<template>
  <div class="pet-info w-full h-full overflow-scroll">
    <UAlert v-if="!pet"
      title="Pet not found"
      description="Try again later"
      variant="outline"
      icon="i-lucide-cat"
    />

  <div v-else class="profile p-2">
    <div class="relative">
      <img
        :src="pet.cover"
        alt="cover"
        class="w-full h-48 object-cover rounded-xl"
      />
      <UAvatar
        :src="pet.avatar"
        :alt="pet.name"
        class="absolute -bottom-6 left-4 h-24 w-24 border-2 border-primary"
      />

      <div class="flex items-center absolute bottom-2 right-2 gap-1">
        <UButton icon="i-lucide-pencil" variant="soft" color="neutral" size="xs" label="Изменить" to="https://tsivx.t.me" />
      </div>
    </div>

    <div class="mt-8 space-y-4">

      <div class="info flex flex-col gap-1">
        <div class="name text-2xl font-bold text-primary">
          {{ pet.name }}
          <UBadge variant="soft" color="neutral" icon="i-lucide-cake" :label="pet.birthday" />
        </div>
        <div class="description text-muted">{{ pet.description }}</div>
      </div>

      <div class="fun-facts flex flex-col">
        <div class="title text-lg font-medium text-primary">Забавные факты</div>
        <ul class="list-disc list-inside text-sm space-y-1">
          <li v-for="fact in pet.funFacts" :key="fact">{{ fact }}</li>
        </ul>
      </div>

      <!-- Favorites -->
      <div v-if="pet.favorites.length">
        <h3 class="text-lg font-medium mb-2 text-primary">Любимое</h3>
        <div class="grid grid-cols-2 gap-2">
          <UCard
            v-for="fav in pet.favorites"
            :key="fav.label"
            class="p-2"
          >
            <div class="flex flex-col items-start gap-2">
              <UIcon :name="fav.icon" class="w-4 h-4" />
              <div>
                <p class="text-xs font-medium">{{ fav.label }}</p>
                <p class="text-xs text-muted">{{ fav.content }}</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Photos -->
      <div v-if="pet.photos.length">
        <h3 class="text-lg font-medium mb-2 text-primary">Моменты</h3>
        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="photo in pet.photos"
            :key="photo.url"
            class="relative"
          >
            <img
              :src="photo.url"
              :alt="photo.caption"
              class="w-full object-cover rounded-md"
            />
            <p class="absolute bottom-1 left-1 text-[10px] px-1 rounded bg-background/70">
              {{ photo.caption }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>