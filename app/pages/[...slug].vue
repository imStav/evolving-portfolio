<script lang="ts" setup>
import { useDateSpan } from '@/composables/useDateSpan'
const { calculateDateSpan } = useDateSpan()

const route = useRoute()
const router = useRouter()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <UContainer class="md:w-3/4 xl:w-2/5 w-11/12 justify-center items-center mx-auto">
    <UButton 
      @click="router.back()" 
      label="Back" 
      color="neutral" 
      variant="soft" 
      icon="i-lucide-arrow-left" 
      class="pl-1.5 my-8 sticky top-8 z-20" 
    />

    <template v-if="page">
      <div>
        <h1 class="font-display font-semibold text-3xl">{{ page.title }}</h1>

        <div class="my-2">
          <div class="flex">
            <ULink :to="page.details.companyPageUrl" class="mr-1">@{{ page.details.company }}</ULink>
            <p class="text-muted">| {{ page.details.location }}</p>
          </div>
        
          <p class="text-muted w-fit">
            {{ page.details.to === 'today' ? 'Since' : '' }}
            {{ calculateDateSpan(page.details.from, page.details.to) }}
          </p>
        </div>

        <p class="text-lg mb-4">{{ page.description }}</p>

        <UBadge 
          v-for="(tech, index) in page.technologies" 
          :key="index" 
          :label="tech" 
          color="secondary" 
          variant="soft" 
          class="font-mono rounded-full mr-2" 
        />
      </div>

      <ContentRenderer :value="page.body" class="prose mb-20" />
    </template>

    <template v-else>
      <div class="flex flex-col items-center justify-center h-[calc(100dvh-8rem)] text-center space-y-6">
        <h1 class="text-6xl font-black">
          404
        </h1>
        <p class="text-lg text-muted">
          Oops! The page you're looking for doesn't exist.
        </p>
        <UButton 
          trailing-icon="i-lucide-house"
          to="/" 
          color="neutral" 
          variant="soft"
        >
          Go Home
        </UButton>
      </div>
    </template>
  </UContainer>
</template>
