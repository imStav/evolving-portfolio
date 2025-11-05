<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Repo } from '../interfaces/repository'

const isHovered = ref(false)

const repos = ref<Repo[]>([])
const CACHE_KEY = 'github_repos_cache'
const CACHE_EXPIRY = 24 * 60 * 60 * 1000

const fetchRepos: () => Promise<void> = async () => {
  try {
    // Check if there is cached data and if it's still valid
    const cachedData = localStorage.getItem(CACHE_KEY)
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData)
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        repos.value = data
        return
      }
    }

    // Repositories to fetch
    const repoNames: string[] = ['pokedesk', 'tracking-rickandmorty']

    // Fetch details for each repository in the list
    const repoDetails = await Promise.all(
      repoNames.map(async (repoName: string) => {
        const response = await fetch(`https://api.github.com/repos/imStav/${repoName}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      }),
    )

    // Map the fetched repository details to the repos ref
    repos.value = repoDetails.map((repo: Repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: new Date(repo.updated_at).toLocaleDateString('en-GB'),
      language: repo.language,
      topics: null,
    }))

    // Cache the fetched data
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: repos.value,
        timestamp: Date.now(),
      }),
    )
  } catch (error) {
    console.error('Error fetching repositories:', error)
  }
}

onMounted(fetchRepos)
</script>

<template>
  <UCard 
    v-for="(repo, index) in repos" 
    :key="index" 
    variant="soft" 
    class="rounded-xl group"
  >
    <NuxtLink :to="repo.html_url" target="_blank">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-medium font-display">{{ repo.name }}</h2>
        <UButton
          trailing-icon="i-lucide-external-link"
          size="sm"
          color="primary"
          variant="subtle"
          class="invisible w-fit rounded-full group-hover:visible"
        />
      </div>

      <p class="my-2 line-clamp-3">{{ repo.description }}</p>
      <p class="text-sm text-muted mb-4">Last updated: {{ repo.updated_at }}</p>

      <div class="flex items-center justify-between">
        <UBadge 
          variant="soft" 
          color="secondary" 
          class="font-mono rounded-full"
        >
          {{ repo.language }}
        </UBadge>

        <div class="flex items-center">
          <UBadge 
            color="warning" 
            variant="soft" 
            class="mr-2  pl-1.5 rounded-full"
          >
            ⭐{{ repo.stargazers_count }}
          </UBadge>
          <UBadge 
            color="neutral" 
            variant="soft" 
            class="pl-1.5 rounded-full"
          >
            🍴 {{ repo.forks_count }}
          </UBadge>
        </div>
      </div>
    </NuxtLink>
  </UCard>

  <UButton
    to="https://www.github.com/imStav"
    icon="i-lucide-github"
    trailing-icon="i-lucide-arrow-right"
    label="See more on my Github"
    :color="isHovered ? 'info' : 'primary'"
    variant="soft"
    class="w-fit justify-self-end"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  />
</template>
