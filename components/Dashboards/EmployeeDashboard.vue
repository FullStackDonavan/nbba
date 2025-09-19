<template>
  <PatternSection>
    <div>
      <div class="max-w-8xl mx-auto p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start transition-all duration-500 ease-in-out">

          <!-- Sidebar -->
          <Transition name="slide-aside">
            <aside class="md:col-span-1 transition-all duration-500 ease-in-out">
              <div class="bg-white dark:bg-[#3a4934] shadow-md rounded-lg p-4">

                <!-- Edit Form -->
                <div v-if="editing" class="mt-6">
                  <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Edit Profile</h2>
                  <form @submit.prevent="updateLoggedInUser">
                    <div class="space-y-4">
                      <div>
                        <label class="block text-gray-700 dark:text-gray-300">First Name:</label>
                        <input type="text" v-model="loggedInUser.firstName" class="w-full bg-gray-50 dark:bg-[#63725C] text-gray-900 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 p-2"/>
                      </div>
                      <div>
                        <label class="block text-gray-700 dark:text-gray-300">Last Name:</label>
                        <input type="text" v-model="loggedInUser.lastName" class="w-full bg-gray-50 dark:bg-[#63725C] text-gray-900 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 p-2"/>
                      </div>
                      <div>
                        <label class="block text-gray-700 dark:text-gray-300">Email:</label>
                        <input type="email" v-model="loggedInUser.email" class="w-full bg-gray-50 dark:bg-[#63725C] text-gray-900 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 p-2"/>
                      </div>
                      <div>
                        <label class="block text-gray-700 dark:text-gray-300">Phone:</label>
                        <input type="text" v-model="loggedInUser.phone" class="w-full bg-gray-50 dark:bg-[#63725C] text-gray-900 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 p-2"/>
                      </div>
                      <div>
                        <label class="block text-gray-700 dark:text-gray-300">Location:</label>
                        <input type="text" v-model="loggedInUser.location" class="w-full bg-gray-50 dark:bg-[#63725C] text-gray-900 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 p-2"/>
                      </div>
                      <div>
                        <label class="block text-gray-700 dark:text-gray-300">Bio:</label>
                        <textarea v-model="loggedInUser.bio" class="w-full bg-gray-50 dark:bg-[#63725C] text-gray-900 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 p-2"></textarea>
                      </div>
                    </div>
                    <div class="mt-4 flex justify-end space-x-4">
                      <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600" @click="cancelEdit">Cancel</button>
                      <button type="submit" class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-[#046937] dark:bg-[#046937] dark:hover:bg-[#046937]">Save Changes</button>
                    </div>
                  </form>
                </div>

                <!-- Personal Info -->
                <div v-else>
                  <h2 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Intro</h2>
                  <ul class="space-y-4">
                    <li class="flex justify-between"><span class="text-gray-700 dark:text-gray-300">Email:</span> <span class="text-gray-800 dark:text-gray-200">{{ loggedInUser?.email }}</span></li>
                    <li class="flex justify-between"><span class="text-gray-700 dark:text-gray-300">Phone:</span> <span class="text-gray-800 dark:text-gray-200">{{ loggedInUser?.phone || 'N/A' }}</span></li>
                    <li class="flex justify-between"><span class="text-gray-700 dark:text-gray-300">Location:</span> <span class="text-gray-800 dark:text-gray-200">{{ loggedInUser?.location || 'N/A' }}</span></li>
                  </ul>

                  <h2 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 mt-6">Company Info</h2>
                  <ul class="space-y-2">
                    <li class="flex justify-between"><span class="text-gray-700 dark:text-gray-300">Company Name:</span> <span class="text-gray-800 dark:text-gray-200">{{ company?.companyName || 'N/A' }}</span></li>
                    <li class="flex justify-between"><span class="text-gray-700 dark:text-gray-300">EIN:</span> <span class="text-gray-800 dark:text-gray-200">{{ company?.ein || 'N/A' }}</span></li>
                    <li class="flex justify-between"><span class="text-gray-700 dark:text-gray-300">Industry:</span> <span class="text-gray-800 dark:text-gray-200">{{ company?.industry || 'N/A' }}</span></li>
                    <li class="flex justify-between"><span class="text-gray-700 dark:text-gray-300">Employee Size:</span> <span class="text-gray-800 dark:text-gray-200">{{ company?.employeeSize || 'N/A' }}</span></li>
                    <li class="flex justify-between"><span class="text-gray-700 dark:text-gray-300">Business Code:</span> <span class="text-gray-800 dark:text-gray-200">{{ company?.businessCode || 'N/A' }}</span></li>
                  </ul>

                  <div class="mt-6">
                    <button class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-[#046937] dark:bg-[#046937] dark:hover:bg-[#058a45] w-full" @click="editProfile">Edit Details</button>
                  </div>
                </div>

              </div>
            </aside>
          </Transition>

          <!-- Main Section -->
          <Transition name="slide-aside">
            <section class="md:col-span-2 transition-all duration-500 ease-in-out">
              <!-- Tabs -->
              <div class="relative border-b border-gray-300 dark:border-gray-600 mb-4">
                <ul class="flex space-x-4 bg-white dark:bg-[#3a4934] p-4 shadow-md relative">
                  <li
                    v-for="(t, index) in tabs"
                    :key="t.key"
                    ref="tabRefs"
                    class="cursor-pointer pb-2 relative"
                    :class="tab === t.key ? 'text-blue-500' : 'text-gray-100 hover:text-blue-500'"
                    @click="setTab(t.key)"
                  >
                    {{ t.label }}
                  </li>
                  <div
                    class="absolute bottom-0 h-1 bg-blue-500 transition-all duration-300"
                    :style="{ width: underlineWidth + 'px', transform: `translateX(${underlineX}px)` }"
                  ></div>
                </ul>
              </div>

              <!-- Tab Content -->
              <Transition name="fade-slide" mode="out-in">
                <div :key="tab">
                  <InsuranceCardDisplay :userId="selectedEmployee || loggedInUser?.id" v-if="tab==='insuranceCard'" />
                  <PlanBenefitDisplay :userId="selectedEmployee || loggedInUser?.id" v-if="tab==='planBenefits'" />
                  <ProviderNetworkDisplay :userId="selectedEmployee || loggedInUser?.id" v-if="tab==='providerNetwork'" />
                  <ClaimsSupportDisplay :userId="selectedEmployee || loggedInUser?.id" v-if="tab==='claimsSupport'" />
                  <PlanDetailsDisplay :userId="selectedEmployee || loggedInUser?.id" v-if="tab==='planDetails'" />
                </div>
              </Transition>
            </section>
          </Transition>

        </div>
      </div>
    </div>
  </PatternSection>
</template>



<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { userLogout, useAuthCookie } from '~/composables/useAuth'
import { useAppAdmin } from '@/composables/useAppAdmin'
import { useCompanyAdmin } from '@/composables/useCompanyAdmin'
import Cookies from 'js-cookie'
import ProviderNetwork from '~/components/AppAdmin/ProviderNetwork.vue'

// Data & State
const loggedInUser = ref(null)
const editing = ref(false)
const tabs = [
  { key: 'insuranceCard', label: 'Insurance Card' },
  { key: 'planBenefits', label: 'Plan Benefits' },
  { key: 'providerNetwork', label: 'Provider Network' },
  { key: 'claimsSupport', label: 'Claims Support' },
  { key: 'planDetails', label: 'Plan Details' }
]

const tab = ref('insuranceCard')
const tabRefs = ref<HTMLLIElement[]>([])
const underlineX = ref(0)
const underlineWidth = ref(0)

const photos = ref([])
const loadingPhotos = ref(false)
const errorPhotos = ref(null)


const company = ref(null)
const loadingCompany = ref(false)
const errorCompany = ref(null)

const userId = loggedInUser.value?.id // e.g. from auth store/session
const isAppAdmin = ref(false)
const isCompanyAdmin = ref(false)



const selectedEmployee = ref<number | null>(null)


// Get the reactive auth cookie
const authCookie = useAuthCookie()

// Watch for changes to the auth cookie and re-fetch user data
watch(
  () => authCookie.value,
  (newVal, oldVal) => {
    console.log('Auth cookie changed from', oldVal, 'to', newVal)
    if (newVal) {
      getLoggedInUser().then(data => {
        loggedInUser.value = data
      })
    }
  }
)

// Methods
async function fetchCompanyInfo(companyId: number) {
  try {
    loadingCompany.value = true
    const response = await $fetch(`/api/company/${companyId}`, {
      headers: {
        Authorization: `Bearer ${authCookie.value}`,
      },
    })
    if (response.error) throw new Error(response.error)
    company.value = response.company
    
    // Populate loggedInUser fields for display safely
    if (company.value && loggedInUser.value) {
      loggedInUser.value = {
        ...loggedInUser.value,
        companyName: company.value.companyName,
        ein: company.value.ein,
        industry: company.value.industry,
        streetAddress: company.value.streetAddress,
        city: company.value.city,
        state: company.value.state,
        zipCode: company.value.zipCode,
        companyPhone: company.value.phoneNumber,
        companyEmail: company.value.companyEmail,
        website: company.value.website,
        employeeSize: company.value.employeeSize,
        businessCode: company.value.businessCode,
      }
    }




  } catch (err: any) {
    console.error('Error fetching company:', err)
    errorCompany.value = err.message || 'Failed to fetch company info'
  } finally {
    loadingCompany.value = false
  }
}



async function getLoggedInUser() {
  try {
    if (!authCookie.value) {
      console.error("Auth cookie is missing.");
      return null;
    }
    console.log("Fetching fresh user data...");
    const response = await $fetch(`/api/user`, {
      headers: { Authorization: `Bearer ${authCookie.value}` },
    });
    console.log("✅ User fetched:", response);
    return response.user || response;
  } catch (error) {
    console.error("Error in getLoggedInUser:", error.message || error);
    return null;
  }
}



async function fetchPhotos() {
  try {
    loadingPhotos.value = true
    if (!authCookie.value) throw new Error('Authentication token is missing.')
    const response = await $fetch('/api/user/photos', {
      headers: { Authorization: `Bearer ${authCookie.value}` },
    })
    photos.value = response.photos || []
  } catch (error) {
    console.error('Error fetching photos:', error)
    errorPhotos.value = 'Failed to load photos. Please try again.'
  } finally {
    loadingPhotos.value = false
  }
}



async function updateLoggedInUser() {
  try {
    const token = Cookies.get('auth_token')
    if (!token) throw new Error('Authentication token is missing.')
    await $fetch('/api/user', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: loggedInUser.value,
    })
    alert('Profile updated successfully!')
    editing.value = false
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Failed to update profile. Please try again.')
  }
}

function editProfile() {
  editing.value = true
}

function cancelEdit() {
  editing.value = false
}

function setTab(tabName: string) {
  tab.value = tabName
  moveUnderline()
}

function moveUnderline() {
  nextTick(() => {
    const index = tabs.findIndex(t => t.key === tab.value)
    const el = tabRefs.value[index]
    if (el) {
      underlineX.value = el.offsetLeft - 30  // <-- shift left by 30px
      underlineWidth.value = el.offsetWidth
    }
  })
}


async function logout() {
  await userLogout()
}

onMounted(async () => {
  moveUnderline()
  if (!authCookie.value) {
    console.log("❌ No auth token found.")
    return
  }

  console.log("✅ Fetching user...")
  loggedInUser.value = await getLoggedInUser()
  console.log("🔹 loggedInUser:", loggedInUser.value)

  if (loggedInUser.value?.companyId) {
    await fetchCompanyInfo(loggedInUser.value.companyId)
    console.log("🔹 Company info:", company.value)
  }

  await fetchPhotos()
  console.log("🔹 Photos loaded:", photos.value.length)

  if (loggedInUser.value?.id) {
    console.log(`🔹 Checking if userId=${loggedInUser.value.id} is AppAdmin`)
    isAppAdmin.value = await useAppAdmin(loggedInUser.value.id)
    console.log("🔹 isAppAdmin.value:", isAppAdmin.value)

    // Correct usage: just call it once
    isCompanyAdmin.value = await useCompanyAdmin(loggedInUser.value.id)
    console.log("🔹 isCompanyAdmin.value:", isCompanyAdmin.value)
  } else {
    console.log("❌ loggedInUser.id not available for admin checks")
  }
})

watch(tab, () => moveUnderline())



interface Company { id: number; companyName: string; industry: string; }
interface Employee { id: number; firstName: string; lastName: string; userId: number; }

const selectedCompany = ref<Company | null>(null);


const onCompanySelect = (company: Company | null) => {
  selectedCompany.value = company;
  selectedEmployee.value = null;
};

const onEmployeeSelect = (emp: Employee | null) => {
  selectedEmployee.value = emp;
};

</script>


<style lang="css" scoped>
/* Sidebar slide */
.slide-aside-enter-active,
.slide-aside-leave-active {
  transition: all 0.5s ease;
}
.slide-aside-enter-from,
.slide-aside-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-aside-enter-to,
.slide-aside-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* Main section grows */
.grow-section {
  transition: all 0.5s ease;
}

/* Fade + slide transition for tab content */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px); /* slide up */
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px); /* slide up while leaving */
}



</style>