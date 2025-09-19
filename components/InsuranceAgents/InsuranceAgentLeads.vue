<template>
  <div class="mx-auto p-6 bg-white dark:bg-[#3a4934] rounded-xl shadow-md space-y-6">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Accepted Leads</h2>

    <div v-if="loading" class="text-gray-500 dark:text-gray-300">Loading leads...</div>
    <div v-else-if="error" class="text-red-600 dark:text-red-400">{{ error }}</div>
    <div v-else-if="leads.length === 0" class="text-gray-500 dark:text-gray-300">No accepted leads yet.</div>

    <table v-else class="w-full text-left border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <thead class="bg-gray-100 dark:bg-[#142610]">
        <tr>
          <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Lead ID</th>
          <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Name</th>
          <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Email</th>
          <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Phone</th>
          <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Accepted At</th>
          <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lead in leads" :key="lead.id" class="hover:bg-gray-50 dark:hover:bg-[#2d3a2a]">
          <td class="p-3 border-b dark:border-gray-700 dark:text-white">{{ lead.id }}</td>
          <td class="p-3 border-b dark:border-gray-700 dark:text-white">{{ lead.firstName }} {{ lead.lastName }}</td>
          <td class="p-3 border-b dark:border-gray-700 dark:text-white">{{ lead.email }}</td>
          <td class="p-3 border-b dark:border-gray-700 dark:text-white">{{ lead.phone }}</td>
          <td class="p-3 border-b dark:border-gray-700 dark:text-white">
            {{ lead.invites[0]?.acceptedAt ? new Date(lead.invites[0].acceptedAt).toLocaleDateString() : "—" }}
          </td>
<td class="p-3 border-b dark:border-gray-700 dark:text-white">
  <template v-if="lead.hasSigned">
    <span class="text-green-600 dark:text-green-400 font-medium">Signed</span>
  </template>
  <template v-else>
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
      @click="openModal(lead)"
    >
      Application
    </button>
  </template>
</td>

        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white dark:bg-[#3a4934] rounded-xl shadow-lg p-6 w-full  max-h-[100vh] overflow-y-auto">
        <h3 class="text-xl font-bold mb-4 dark:text-white">Lead Details</h3>
        <p><strong>Name:</strong> {{ selectedLead.firstName }} {{ selectedLead.lastName }}</p>
        <p><strong>Email:</strong> {{ selectedLead.email }}</p>
        <p><strong>Phone:</strong> {{ selectedLead.phone }}</p>
        <p>
          <strong>Accepted At:</strong>
          {{ selectedLead.invites[0]?.acceptedAt ? new Date(selectedLead.invites[0].acceptedAt).toLocaleString() : "—" }}
        </p>

        <!-- Pass dynamically fetched userId -->
        <InsuranceProductForm v-if="userId" :userId="userId" />
        <p v-else class="text-gray-500 dark:text-gray-400 mt-2">Loading user info...</p>

        <button
          class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          @click="closeModal"
        >
          Close
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

const leads = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Track which lead is selected for the popup
const selectedLead = ref<any | null>(null)
const showModal = ref(false)
const userId = ref<number | null>(null)

const fetchLeads = async () => {
  try {
    const res = await $fetch("/api/leads/accepted", { method: "GET" })
    console.log("Fetched leads:", res) // <-- check here
    leads.value = res || []
  } catch (err: any) {
    error.value = err.message || "Failed to fetch leads"
  } finally {
    loading.value = false
  }
}


onMounted(fetchLeads)

// Function to get user ID by email
const getUserIdByEmail = async (email: string): Promise<number | null> => {
  try {
    const user = await $fetch("/api/user/get-by-email", {
      method: "POST",
      body: { email },
    })
    return user.id || null
  } catch (err) {
    console.error("Error fetching user by email:", err)
    return null
  }
}

// Open modal and fetch user ID
const openModal = async (lead: any) => {
  selectedLead.value = lead
  showModal.value = true
  userId.value = await getUserIdByEmail(lead.email)
}

const closeModal = () => {
  selectedLead.value = null
  userId.value = null
  showModal.value = false
}
</script>
