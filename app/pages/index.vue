<script lang="ts" setup>
import ExperiencesList from '../components/ExperiencesList.vue'
import RepositoriesList from '../components/RepositoriesList.vue'
import { constants } from '../consts/constants'

const activeTab = ref(constants.WORK_EXPERIENCES_TAB)

const components = {
  [constants.WORK_EXPERIENCES_TAB]: ExperiencesList,
  [constants.OPEN_SOURCE_TAB]: RepositoriesList,
}

const tabContents = {
  [constants.WORK_EXPERIENCES_TAB]: {
    title: constants.WORK_EXPERIENCES_TAB_TITLE,
    description: constants.WORK_EXPERIENCES_TAB_DESCRIPTION,
  },
  [constants.OPEN_SOURCE_TAB]: {
    title: constants.OPEN_SOURCE_TAB_TITLE,
    description: constants.OPEN_SOURCE_TAB_DESCRIPTION,
  },
}
</script>

<template>
  <UContainer class="md:w-3/4 xl:w-2/5 w-11/12 mx-auto">
    <AboutMe />

    <div class="navbar">
      <UButton
        @click="activeTab = constants.WORK_EXPERIENCES_TAB"
        color="neutral"
        :variant="activeTab === constants.WORK_EXPERIENCES_TAB ? 'soft' : 'ghost'"
      >
        {{ constants.WORK_EXPERIENCES_TAB_TITLE }}
      </UButton>

      <UButton
        @click="activeTab = constants.OPEN_SOURCE_TAB"
        color="neutral"
        :variant="activeTab === constants.OPEN_SOURCE_TAB ? 'soft' : 'ghost'"
      >
        {{ constants.OPEN_SOURCE_TAB_TITLE}}
      </UButton>
    </div>

    <div class="my-4">
      <h1 class="text-3xl font-semibold font-display">{{ tabContents[activeTab]?.title }}</h1>
      <p class="text-muted font-display">
        {{ tabContents[activeTab]?.description }}
      </p>
      <div class="grid grid-cols-1 gap-4 my-8">
        <component :is="components[activeTab]" />
      </div>
    </div>
  </UContainer>
</template>
