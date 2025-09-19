<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthCookie } from '~/composables/useAuth'
import { onClickOutside } from '@vueuse/core'

// --- Dropdown / UI ---
const hideActions = ref(true)
const userActions = ref<HTMLElement | null>(null)
onClickOutside(userActions, () => (hideActions.value = true))

// --- Color Mode ---
const colorMode = useColorMode()
const setColorTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// --- Auth & User ---
const authCookie = useAuthCookie()
const user = useState('user') // global user state
const avatar = ref<string | null>(null) // no default
const loggedInUser = ref<any>(null)

// --- Computed ---
const isLoggedInUser = computed(() => !!user.value?.id)
const isLoggedIn = computed(() => !!user.value)

const loading = ref(false)

// --- Fetch fresh user ---
async function getLoggedInUser() {
  if (!authCookie.value) return null
  try {
    loading.value = true
    const response = await $fetch('/api/user', {
      headers: { Authorization: `Bearer ${authCookie.value}` },
    })
    const fetchedUser = response.user || response
    if (fetchedUser) {
      user.value = fetchedUser
      avatar.value = fetchedUser.avatar || ''
      loggedInUser.value = fetchedUser
    }
    return fetchedUser
  } catch (err) {
    console.error('Error fetching user:', err)
    return null
  } finally {
    loading.value = false
  }
}


// --- On mount: populate user ---
onMounted(async () => {
  if (!user.value) {
    const fetched = await getLoggedInUser()
    if (fetched) {
      user.value = fetched
      avatar.value = fetched.avatar || avatar.value
      loggedInUser.value = fetched
    }
  } else {
    const fetched = await getLoggedInUser()
    if (fetched) {
      avatar.value = fetched.avatar || avatar.value
      loggedInUser.value = fetched
    }
  }
})

// --- Watch auth cookie changes ---
watch(
  () => authCookie.value,
  async (newVal) => {
    if (newVal) {
      await getLoggedInUser()
    } else {
      user.value = null
      loggedInUser.value = null
      avatar.value = 'https://placehold.co/40x40'
    }
  }
)

// --- Watch user avatar changes (reactive for upload) ---
watch(
  () => user.value?.avatar,
  (newAvatar) => {
    if (newAvatar) avatar.value = newAvatar
  }
)
</script>


<template>
  <div class="hidden md:flex justify-between space-x-10 mt-14 items-center text-white dark:text-gray-200">

    <!-- Home -->
    <!-- <NuxtLink to="/" title="Home">
      <Icon name="mdi:home" class="w-6 h-6 hover:text-blue-500" />
    </NuxtLink> -->

    <!-- Dashboard link -->
    <!-- <NuxtLink to="/dashboard" title="Dashboard">
      <Icon name="mdi:view-dashboard" class="w-6 h-6 hover:text-blue-500" />
    </NuxtLink> -->


    <!-- Light/Dark Toggle -->
    <ClientOnly>
      <span @click="setColorTheme" class="cursor-pointer">
        <Icon
          v-if="colorMode.value === 'dark'"
          name="mdi:white-balance-sunny"
          class="w-6 h-6 text-yellow-400"
        />
        <Icon
          v-else
          name="mdi:moon-waning-crescent"
          class="w-6 h-6 text-gray-800 dark:text-gray-100"
        />
      </span>
    </ClientOnly>

<!-- Avatar / Login -->
<NuxtLink :to="isLoggedIn ? '/profile' : '/login'" title="My Profile">
  <template v-if="isLoggedIn">
    <!-- Skeleton while fetching -->
    <IconListSkeletonLoader v-if="loading" />

    <!-- User avatar -->
    <img
      v-else-if="avatar"
      :src="avatar"
      alt="User Avatar"
      class="h-16 w-16 rounded-full object-cover ring-2 ring-blue-500 hover:ring-blue-400 transition-all"
    />

    <!-- Fallback default avatar -->
    <IconListSkeletonLoader v-else />
  </template>

  <template v-else>
    <User :isLoggedIn="isLoggedIn" class="md:block" />
  </template>
</NuxtLink>



  </div>
</template>


