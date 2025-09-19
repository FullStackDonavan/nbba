<template>
  <div class="space-y-4 mb-4">
    <!-- Company Dropdown -->
    <div class="relative">
      <label class="block mb-1 font-semibold">Select Company</label>
      <select
        v-model="selectedCompanyId"
        @change="onCompanyChange"
        class="block w-full border p-3 rounded bg-gray-100 dark:bg-[#142610] appearance-none
               focus:outline-none focus:ring-2 focus:ring-green-500
               hover:bg-gray-200 dark:hover:bg-[#1a3315] transition"
      >
        <option value="" disabled>Select a company</option>
        <option
          v-for="company in companies"
          :key="company.id"
          :value="company.id"
        >
          {{ company.companyName }} ({{ company.industry }})
        </option>
      </select>
      <span
        class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
      >
        ▼
      </span>
    </div>

    <!-- Employee Dropdown -->
    <div v-if="!companyOnly && employees.length" class="relative">
      <label class="block mb-1 font-semibold">Select Employee</label>
      <select
        v-model="selectedEmployeeId"
        @change="onEmployeeChange"
        class="block w-full border p-3 rounded bg-gray-100 dark:bg-[#142610] appearance-none
               focus:outline-none focus:ring-2 focus:ring-green-500
               hover:bg-gray-200 dark:hover:bg-[#1a3315] transition"
      >
        <option value="" disabled>Select an employee</option>
        <option
          v-for="emp in employees"
          :key="emp.id"
          :value="emp.id"
        >
          {{ emp.firstName }} {{ emp.lastName }} – {{ emp.email }}
        </option>
      </select>
      <span
        class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
      >
        ▼
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Company {
  id: number;
  companyName: string;
  industry: string;
}

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userId: number;
}

const companies = ref<Company[]>([]);
const employees = ref<Employee[]>([]);

const selectedCompanyId = ref<number | null>(null);
const selectedEmployeeId = ref<number | null>(null);

const emit = defineEmits<{
  (e: 'update:selectedCompany', company: Company | null): void;
  (e: 'update:selectedEmployee', employee: Employee | null): void;
}>();

const props = defineProps<{
  companyOnly?: boolean
}>()

const fetchCompanies = async () => {
  try {
    companies.value = await $fetch('/api/companies');
  } catch (err) {
    console.error('Failed to fetch companies', err);
  }
};

const fetchEmployees = async (companyId: number) => {
  try {
    employees.value = await $fetch(`/api/companies/${companyId}/employees`);
  } catch (err) {
    console.error('Failed to fetch employees', err);
    employees.value = [];
  }
};

const onCompanyChange = () => {
  const company = companies.value.find(c => c.id === selectedCompanyId.value) || null;
  emit('update:selectedCompany', company);
  selectedEmployeeId.value = null;
  if (!props.companyOnly && company) fetchEmployees(company.id);
};

const onEmployeeChange = () => {
  const emp = employees.value.find(e => e.id === selectedEmployeeId.value) || null;
  emit('update:selectedEmployee', emp);
};

onMounted(fetchCompanies);
</script>
