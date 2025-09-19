<template>
  <div class="mx-auto p-6 bg-white dark:bg-[#3a4934] rounded-xl shadow-md space-y-6">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Insurance Application</h2>

  <!-- Form -->
  <form @submit.prevent="submitForm" class="space-y-4">
    <!-- Group Info -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Group #</label>
        <input type="text" v-model="form.groupNumber"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Name of Group</label>
        <input type="text" v-model="form.groupName"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
    </div>

    <!-- Reason for Enrollment -->
    <div>
      <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">
        Reason for Enrollment (Mark all that apply)
      </label>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label class="flex items-center">
          <input type="checkbox" value="New Group" v-model="form.reasons" class="mr-2">
          <span class="text-gray-700 dark:text-gray-300">New Group</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" value="Open Enrollment" v-model="form.reasons" class="mr-2">
          <span class="text-gray-700 dark:text-gray-300">Open Enrollment</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" value="New Hire" v-model="form.reasons" class="mr-2">
          <span class="text-gray-700 dark:text-gray-300">New Hire</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" value="New Application" v-model="form.reasons" class="mr-2">
          <span class="text-gray-700 dark:text-gray-300">New Application</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" value="Newborn" v-model="form.reasons" class="mr-2">
          <span class="text-gray-700 dark:text-gray-300">Newborn</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" value="Court Order" v-model="form.reasons" class="mr-2">
          <span class="text-gray-700 dark:text-gray-300">Court Order</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" value="Dependent Addition" v-model="form.reasons" class="mr-2">
          <span class="text-gray-700 dark:text-gray-300">Dependent Addition</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" value="Loss of Coverage" v-model="form.reasons" class="mr-2">
          <span class="text-gray-700 dark:text-gray-300">Loss of Coverage</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" value="Marriage" v-model="form.reasons" class="mr-2">
          <span class="text-gray-700 dark:text-gray-300">Marriage</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" value="Divorce" v-model="form.reasons" class="mr-2">
          <span class="text-gray-700 dark:text-gray-300">Divorce</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" value="Military Leave" v-model="form.reasons" class="mr-2">
          <span class="text-gray-700 dark:text-gray-300">Military Leave</span>
        </label>
      </div>
    </div>


    <!-- Personal Info -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">First Name</label>
        <input type="text" v-model="form.firstName"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Middle Name</label>
        <input type="text" v-model="form.middleName"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
               />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Last Name</label>
        <input type="text" v-model="form.lastName"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
    </div>

    <!-- Contact -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Phone Number</label>
        <input type="text" v-model="form.phoneNumber"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email</label>
        <input type="email" v-model="form.email"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
    </div>



    <!-- Identity -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Social Security Number</label>
        <input type="text" v-model="form.socialSecurityNumber"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Date Of Birth</label>
        <input type="date" v-model="form.dateOfBirth"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
    </div>


    <!-- Address -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Street Address</label>
        <input type="text" v-model="form.streetAddress"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">City</label>
        <input type="text" v-model="form.city"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">State / Province</label>
        <input type="text" v-model="form.state"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">ZIP / Postal Code</label>
        <input type="text" v-model="form.zipCode"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
    </div>


    <!-- Demographics -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Age</label>
        <input type="text" v-model="form.age"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Gender</label>
        <input type="text" v-model="form.gender"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
       <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Weight</label>
        <input type="text" v-model="form.weight"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Height</label>
        <input type="text" v-model="form.height"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>
    </div>






    <!-- Company -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Hire Date -->
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Hire Date</label>
        <input type="date" v-model="form.hireDate"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required />
      </div>

      <!-- Rehire Date -->
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Rehire Date</label>
        <input type="date" v-model="form.rehireDate"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              />
      </div>

      <!-- Location -->
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Location</label>
        <input type="text" v-model="form.location"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              />
      </div>

      <!-- Is Division -->
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Is this a division?</label>
        <div class="flex items-center space-x-6">
          <label class="flex items-center">
            <input type="radio" :value="true" v-model="form.isDivision" class="mr-2">
            <span class="text-gray-700 dark:text-gray-300">Yes</span>
          </label>
          <label class="flex items-center">
            <input type="radio" :value="false" v-model="form.isDivision" class="mr-2">
            <span class="text-gray-700 dark:text-gray-300">No</span>
          </label>
        </div>
      </div>


      <!-- Parent Company -->
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Parent Company</label>
        <input type="text" v-model="form.parentCompany" class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white" />
      </div>

      <!-- Work Info -->
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Hours Per Week</label>
        <input type="text" v-model="form.hrsPerWeek"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              />
      </div>

      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Job Title</label>
        <input type="text" v-model="form.jobTitle"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              />
      </div>
    </div>





  <!-- Spouse -->
  <!-- Personal Info -->
   <hr />
   <h2>Spouse</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">First Name</label>
        <input type="text" v-model="form.spouseFirstName"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
               />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Middle Name</label>
        <input type="text" v-model="form.spouseMiddleName"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
               />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Last Name</label>
        <input type="text" v-model="form.spouseLastName"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
               />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Social Security Number</label>
        <input type="text" v-model="form.spouseSocialSecurityNumber"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
               />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Date Of Birth</label>
        <input type="date" v-model="form.spouseDateOfBirth"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
               />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Age</label>
        <input type="text" v-model="form.spouseAge"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
               />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Gender</label>
        <input type="text" v-model="form.spouseGender"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
               />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Weight</label>
        <input type="text" v-model="form.spouseWeight"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
               />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Height</label>
        <input type="text" v-model="form.spouseHeight"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
               />
      </div>
    </div>

    <!-- Health Plan -->
    <div>
      <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Health Plan</label>
      <select v-model="form.healthPlan"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required>
        <option value="">Select Health Plan</option>
        <option value="plan1">Plan 1</option>
        <option value="plan2">Plan 2</option>
      </select>
    </div>

    <!-- Submit -->
    <button type="submit"
            class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-[#046937] dark:bg-[#046937] dark:hover:bg-[#058a45]">
      Submit
    </button>
  </form>


    <!-- Feedback Messages -->
    <p v-if="message" class="mt-4 text-green-600 dark:text-green-400">{{ message }}</p>
    <p v-if="error" class="mt-4 text-red-600 dark:text-red-400">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useCookie } from "#imports";

// 👇 Define props
const props = defineProps<{ userId: number }>()

const form = reactive({
  groupNumber: '',
  groupName: '',
  healthPlan: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  socialSecurityNumber: '',
  dateOfBirth : '',
  hireDate : '',
  rehireDate : '',
  location : '',
  isDivision: false,
  parentCompany: '',
  age: '',
  gender : '',
  weight : '',
  height : '',
  reasons: [] as string[],
  jobTitle: '',
  hrsPerWeek : '',
  spouseFirstName: '',
  spouseMiddleName: '',
  spouseLastName: '',
  spouseSocialSecurityNumber: '',
  spouseDateOfBirth : '',
  spouseAge: '',
  spouseGender : '',
  spouseWeight : '',
  spouseHeight : '',

})

const message = ref('')
const error = ref('')

const submitForm = async () => {
  message.value = ''
  error.value = ''

  try {
    const authToken = useCookie('auth_token').value
    if (!authToken) throw new Error('No auth token found')

    if (!props.userId) throw new Error('Target user ID not provided')

    const response = await $fetch('/api/applications/create', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: { ...form, userId: props.userId }, // send clicked user's ID
    })

    message.value = 'Application submitted successfully!'
    form.groupNumber = ''
    form.groupName = ''
    form.healthPlan = ''
    form.firstName = ''
    form.lastName = ''
    form.phoneNumber = ''
    form.socialSecurityNumber = ''
    form.email = ''
    form.streetAddress = ''
    form.city = ''
    form.state = ''
    form.zipCode = ''
    form.dateOfBirth = ''
    form.hireDate = ''
    form.rehireDate = ''
    form.location = ''
    form.isDivision = false
    form.parentCompany = ''
    form.age = ''
    form.gender = ''
    form.weight = ''
    form.height = ''
    form.reasons = []
    form.jobTitle = ''
    form.hrsPerWeek = ''
    form.spouseFirstName = ''
    form.spouseMiddleName = ''
    form.spouseLastName = ''
    form.spouseSocialSecurityNumber = ''
    form.spouseDateOfBirth  = ''
    form.spouseAge = ''
    form.spouseGender  = ''
    form.spouseWeight  = ''
    form.spouseHeight  = ''
    
  } catch (err: any) {
    console.error(err)
    error.value = err?.message || 'Failed to submit application'
  }
}
</script>

