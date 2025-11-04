<script setup lang="ts">
import { useDateSpan } from '@/composables/useDateSpan'

const { data: posts } = await useAsyncData("posts", () =>
  queryCollection("content").all(),
)

const { calculateDateSpan } = useDateSpan()

const isHovered = ref(false)
</script>

<template>
  <UCard v-for="(experience, index) in posts" :key="index" variant="soft" class="rounded-xl group">
    <NuxtLink :to="experience.path">
      <div class="flex items-center justify-between">
      <h2 class="text-xl font-medium font-display mr-2">{{ experience.title }}</h2>
      <UButton
        trailing-icon="i-lucide-arrow-right"
        size="sm"
        color="primary"
        variant="soft"
        class="invisible w-fit rounded-full group-hover:visible"
      />
    </div>

    <div class="my-2">
      <div class="flex">
        <ULink :to="experience.details.companyPageUrl" class="mr-1">@{{ experience.details.company }}</ULink>
        <p class="text-muted">| {{ experience.details.location }}</p>
      </div>
        
        <p class="text-muted w-fit">
          {{ experience.details.to === 'today' ? 'Since' : '' }}
          {{ calculateDateSpan(experience.details.from, experience.details.to) }}
        </p>
    </div>

    <p class="my-2 mb-4">{{ experience.description }}</p>

    <div class="flex flex-col">
      <div>
        <UBadge v-for="(tech, index) in experience.technologies" :key="index" :label="tech" color="secondary" variant="soft" class="font-mono rounded-full mr-2" />
      </div>
    </div>
  </NuxtLink>
  </UCard>

  <UButton
    to="https://www.linkedin.com/in/steven-averlant/"
    icon="i-lucide-linkedin"
    trailing-icon="i-lucide-arrow-right"
    label="Let's connect"
    :color="isHovered ? 'info' : 'primary'"
    variant="soft"
    class="w-fit justify-self-end"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  />
</template>
