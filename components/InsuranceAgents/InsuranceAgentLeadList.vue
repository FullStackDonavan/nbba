<template>
  <div class="mx-auto p-6 bg-white dark:bg-[#3a4934] rounded-xl shadow-md space-y-6">
    <CompanyRegistrationStats />
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">My Leads</h2>

    <div v-if="loading" class="text-gray-500 dark:text-gray-300">Loading leads...</div>

    <div v-else>
      <table class="w-full text-left border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead class="bg-gray-100 dark:bg-[#142610]">
          <tr>
            <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">First Name</th>
            <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Last Name</th>
            <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Email</th>
            <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Phone</th>
            <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Policy Type</th>
            <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="lead in leads"
            :key="lead.id"
            class="hover:bg-gray-50 dark:hover:bg-[#2d3a2a]"
          >
            <td class="p-3 border-b dark:border-gray-700 dark:text-white">{{ lead.firstName }}</td>
            <td class="p-3 border-b dark:border-gray-700 dark:text-white">{{ lead.lastName }}</td>
            <td class="p-3 border-b dark:border-gray-700 dark:text-white">{{ lead.email }}</td>
            <td class="p-3 border-b dark:border-gray-700 dark:text-white">{{ lead.phone }}</td>
            <td class="p-3 border-b dark:border-gray-700 dark:text-white">{{ lead.policyType }}</td>
            <td class="p-3 border-b dark:border-gray-700 dark:text-white">
              <template v-if="lead.wasInvited">
                <span class="text-gray-600 dark:text-gray-400 font-medium">Invited</span>
              </template>
              <template v-else>
                <button
                  @click="sendInvite(lead.email, lead.id)"
                  class="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-[#046937] dark:bg-[#046937] dark:hover:bg-[#058a45] disabled:opacity-50"
                  :disabled="sendingEmails[lead.id]"
                >
                  {{ sendingEmails[lead.id] ? 'Sending...' : 'Invite' }}
                </button>
              </template>
            </td>

          </tr>
        </tbody>
      </table>

      <div v-if="leads.length === 0" class="text-gray-500 dark:text-gray-300 mt-4">
        No leads found.
      </div>

      <!-- Feedback Messages -->
      <p v-if="message" class="mt-4 text-green-600 dark:text-green-400">{{ message }}</p>
      <p v-if="error" class="mt-4 text-red-600 dark:text-red-400">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
import { useCookie } from "#imports"
import Cookies from "js-cookie"

const leads = ref<any[]>([])
const loading = ref(true)
const message = ref("")
const error = ref("")
const sendingEmails = reactive<Record<number, boolean>>({})

onMounted(async () => {
  try {
    const authToken = useCookie("auth_token").value;
    const { data } = await useFetch("/api/leads/list", {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    leads.value = data.value || []
  } catch (err) {
    console.error("Failed to fetch leads:", err)
  } finally {
    loading.value = false
  }
})

// Send invite email
const sendInvite = async (email: string, leadId?: number) => {
  if (leadId) sendingEmails[leadId] = true
  message.value = ""
  error.value = ""

  try {
    // Mock example - replace with actual API if needed
    if (process.env.DEV) {
      console.log(`Mock email sent to ${email}`)
      message.value = `Mock invite sent to ${email}`
    } else {
      const authToken = Cookies.get("auth_token")
      if (!authToken) throw new Error("No auth token found")

      const response = await $fetch("/api/leads/send-invite", {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body: { email, leadId }, // send both email and leadId
      })


      if (response.success) {
        message.value = `Invite sent successfully to ${email}`
      } else {
        throw new Error("Failed to send invite")
      }
    }
  } catch (err: any) {
    console.error(err)
    error.value = err?.message || "Error sending invite"
  } finally {
    if (leadId) sendingEmails[leadId] = false
  }
}
</script>
