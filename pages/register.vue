<script setup lang="ts">
import { ref, onMounted } from "vue";
import { registerWithEmail } from "~/composables/useAuth";
import { useRouter } from "vue-router";
import type { Ref } from "vue";

const router = useRouter();

// Get inviteId from query params if exists
let inviteId: string | undefined;

const companyName = ref('');
const ein = ref('');
const salesmanCode = ref('');
const industry = ref('');
const streetAddress = ref('');
const city = ref('');
const state = ref('');
const zipCode = ref('');
const companyPhone = ref('');
const companyEmail = ref('');
const website = ref('');
const employeeSize = ref('');
const adminFirstName = ref('');
const adminLastName = ref('');
const adminUsername = ref('');
const adminEmail = ref('');
const adminPassword = ref('');
const adminPhoneNumber = ref('');

const errors: Ref<Map<string, { message: string }> | undefined> = ref(new Map());
let response: any;

const plans = [
  { value: "1", label: "Single Member - $99.99 Once & $24.99/month" },
  { value: "2-5", label: "2-5 Employees - $299.99 Once & $24.99/month" },
  { value: "6-10", label: "6-10 Employees - $599.99 Once & $24.99/month" },
  { value: "11+", label: "11+ Employees - $999.99 Once & $24.99/month" }
];

// Mark the lead invite as accepted
async function markInviteAccepted(inviteId: number) {
  if (!inviteId) return console.warn("No invite ID provided");
  try {
    const updated = await $fetch("/api/leads/accept-invite", {
      method: "POST",
      body: { inviteId },
    });
    console.log("Invite updated:", updated);
    return updated;
  } catch (err) {
    console.error("Failed to mark invite accepted:", err);
    throw err;
  }
}



async function postRegisterForm() {
  let sessionId: number | string | undefined;
  let agentId: number | undefined;

  try {
    // 1️⃣ Prepare payload for registration
    const payload = {
      username: adminUsername.value,
      firstName: adminFirstName.value,
      lastName: adminLastName.value,
      phone: adminPhoneNumber.value,
      email: adminEmail.value,
      password: adminPassword.value,
      companyName: companyName.value,
      ein: ein.value,
      salesmanCode: salesmanCode.value,
      industry: industry.value,
      streetAddress: streetAddress.value,
      city: city.value,
      state: state.value,
      zipCode: zipCode.value,
      companyPhone: companyPhone.value,
      companyEmail: companyEmail.value,
      website: website.value,
      employeeSize: employeeSize.value
    };

    // 2️⃣ Register user & company
    response = await registerWithEmail(payload);
    if (response.hasErrors) {
      // make sure it's a Map so v-for works
      const map = new Map<string, { message: string }>();
      for (const [key, msg] of Object.entries(response.errors ?? {})) {
        map.set(key, { message: String(msg) });
      }
      errors.value = map;
      return;
    }

    // 3️⃣ Assign sessionId
    sessionId = response?.session?.id || response?.user?.id;

    // 4️⃣ After registration, try to fetch invite
    try {
      const inviteData = await $fetch("/api/leads/get-invite", {
        method: "POST",
        body: { email: adminEmail.value },
      });

      if (inviteData?.id && inviteData?.agentId) {
        inviteId = Number(inviteData.id);
        agentId = Number(inviteData.agentId);
        console.log("Invite ID fetched:", inviteId, "Agent ID:", agentId);

        // 5️⃣ Mark invite accepted
        await markInviteAccepted(inviteId);
      } else {
        console.log("No active invite found for this email, continuing...");
      }
    }  catch (err: any) {
        console.error("Registration failed:", err);

        const map = new Map<string, { message: string }>();
        if (err?.data?.message) {
          map.set("general", { message: err.data.message });
        } else if (err?.status) {
          map.set("general", { message: `Error ${err.status}` });
        } else {
          map.set("general", { message: "Unknown error occurred" });
        }
        errors.value = map;
      }


    // 6️⃣ Redirect
    if (sessionId) router.push(`/dashboard/${sessionId}`);

  } catch (err) {
    console.error("Registration failed:", err);
  }
}





</script>




<template>
  <main class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-10">
        <div class="flex items-center justify-center space-x-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#046937]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
          </svg>
          <h1 class="text-3xl font-bold text-gray-900">Business Registration</h1>
        </div>
        <p class="text-lg text-white max-w-2xl mx-auto">
          Join the National Business Benefit Alliance and unlock exclusive benefits for your business.
        </p>
      </div>

      <!-- Error Display -->
      <div
        v-if="response?.hasErrors && errors"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
        role="alert"
      >
        <ul>
          <li v-for="[key, value] in errors" :key="key">{{ value.message }}</li>
        </ul>
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="postRegisterForm"  class="grid md:grid-cols-2 gap-8">
        <!-- Company Info -->
        <div class="rounded-lg border bg-white shadow-sm p-6 space-y-6">
          <h2 class="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#046937]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
              <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
            </svg>
            <span>Company Information</span>
          </h2>

          <div class="space-y-4">
            <input
              v-model="companyName"
              required
              placeholder="Company Name *"
              class="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
            />

            <div class="grid grid-cols-3 gap-4">
              <input v-model="ein" placeholder="EIN# (Optional)" class="input w-full h-10 px-3 py-2" />
              <input v-model="salesmanCode" placeholder="Salesman Code (Optional)" class="input w-full h-10 px-3 py-2" />
              <input v-model="industry" required placeholder="Industry *" class="input w-full h-10 px-3 py-2" />
            </div>

            <h3 class="text-lg font-semibold text-gray-800">Business Address</h3>
            <input v-model="streetAddress" required placeholder="Street Address *" class="input w-full h-10 px-3 py-2" />

            <div class="grid grid-cols-2 gap-4">
              <input v-model="city" required placeholder="City *" class="input w-full h-10 px-3 py-2" />
              <input v-model="state" required placeholder="State *" class="input w-full h-10 px-3 py-2" />
            </div>

            <input v-model="zipCode" required placeholder="ZIP Code *" class="input w-full h-10 px-3 py-2" />
            <div class="grid grid-cols-2 gap-4">
              <input v-model="companyPhone" required placeholder="Phone Number *" class="input w-full h-10 px-3 py-2" />
              <input v-model="companyEmail" required type="email" placeholder="Company Email *" class="input w-full h-10 px-3 py-2" />
            </div>
            <input v-model="website" placeholder="Website" class="input w-full h-10 px-3 py-2" />
            <select v-model="employeeSize" required class="input w-full h-10 px-3 py-2">
              <option disabled value="">Select Employee Size *</option>
              <option value="1">Single Member - $99.99 Once & $24.99/month</option>
              <option value="2-5">2-5 Employees - $299.99 Once & $24.99/month</option>
              <option value="6-10">6-10 Employees - $599.99 Once & $24.99/month</option>
              <option value="11+">11+ Employees - $999.99 Once & $24.99/month</option>
            </select>
          </div>
                  <!-- Admin Info -->
                  <div class="rounded-lg border bg-white shadow-sm p-6 space-y-6">
                    <h2 class="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#046937]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <span>Company Administrator</span>
                    </h2>

                    <div class="grid grid-cols-2 gap-4">
                      <input v-model="adminFirstName" required placeholder="First Name *" class="input w-full h-10 px-3 py-2" />
                      <input v-model="adminLastName" required placeholder="Last Name *" class="input w-full h-10 px-3 py-2" />
                    </div>

                    <input v-model="adminUsername" required placeholder="Username *" class="input w-full h-10 px-3 py-2" />
                    <input v-model="adminEmail" required type="email" placeholder="Email Address *" class="input w-full h-10 px-3 py-2" />

                    <div class="grid grid-cols-2 gap-4">
                      <input v-model="adminPassword" type="password" required placeholder="Password *" class="input w-full h-10 px-3 py-2" />
                      <input v-model="adminPhoneNumber" required placeholder="Phone Number *" class="input w-full h-10 px-3 py-2" />
                    </div>

                    <button type="submit" class="w-full h-12 bg-[#046937] hover:bg-[#035a2e] text-white font-semibold text-lg rounded-md">
                      Continue to Payment
                    </button>

                    <p class="text-center text-sm text-white">
                      Already have an account?
                      <NuxtLink to="/login" class="text-[#046937] hover:underline font-medium">Sign in here</NuxtLink>
                    </p>
                  </div>
        </div>

        <WhatYouGet :employee-size="employeeSize" :plans="plans" />

      </form>
    </div>
  </main>
</template>
