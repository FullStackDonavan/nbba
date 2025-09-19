<template>
  <div class="p-4 my-4 shadow rounded-lg bg-white dark:bg-[#3a4934]">
    <h2 class="text-xl font-bold mb-4">Applications (Admin)</h2>

    <div v-if="loading" class="text-gray-500 dark:text-gray-300">
      Loading applications...
    </div>

    <div v-else-if="applications.length === 0" class="text-gray-500 dark:text-gray-300">
      No applications found.
    </div>

    <EmployeeSignApplication />

    <!-- <table v-else class="w-full table-auto border-collapse">
      <thead>
        <tr class="bg-gray-100 dark:bg-[#142610] text-left">
          <th class="p-2 border-b">Application Name</th>
          <th class="p-2 border-b">Description</th>
          <th class="p-2 border-b">Status</th>
          <th class="p-2 border-b">Requested At</th>
          <th class="p-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="app in applications"
          :key="app.id"
          class="hover:bg-gray-50 dark:hover:bg-[#566051]"
        >
          <td class="p-2 border-b break-words">{{ app.name }}</td>
          <td class="p-2 border-b break-words">{{ app.description }}</td>
          <td class="p-2 border-b">
            <span
              :class="{
                'text-yellow-600': app.status === 'PENDING',
                'text-green-600': app.status === 'APPROVED',
                'text-red-600': app.status === 'REJECTED'
              }"
            >
              {{ app.status }}
            </span>
          </td>
          <td class="p-2 border-b">{{ formatDate(app.requestedAt) }}</td>
          <td class="p-2 border-b">
            <button
              v-if="app.status === 'PENDING'"
              @click="markApproved(app.id)"
              class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Approve
            </button>
            <span v-else class="text-gray-500">—</span>
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Application {
  id: number
  name: string
  description: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  requestedAt: string
}

// Hardcoded example values
const applications = ref<Application[]>([
  {
    id: 1,
    name: 'HR Management App',
    description: 'A SaaS tool for managing company HR tasks.',
    status: 'PENDING',
    requestedAt: '2025-09-09T10:00:00Z',
  },
  {
    id: 2,
    name: 'Payroll Integration App',
    description: 'Connects payroll with employee benefits and insurance.',
    status: 'APPROVED',
    requestedAt: '2025-09-08T15:30:00Z',
  },
])

const loading = ref(false)

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString()

const markApproved = (id: number) => {
  const app = applications.value.find(a => a.id === id)
  if (app) app.status = 'APPROVED'
}
</script>

<style scoped>
table {
  min-width: 100%;
}
</style>
