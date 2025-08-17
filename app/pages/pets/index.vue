<script setup lang="ts">
const { data: pets } = await useAsyncData('pets', () => {
  return queryCollection('pets')
    .order('name', 'DESC')
    .all()
})
</script>

<template>
    <div class="flex flex-col gap-2">
        <UCard v-for="pet in pets" :key="pet.name" class="w-full">
            <pre class="text-xs">{{ pet }}</pre>
        </UCard>
    </div>
</template>
