<template>
  <div class="mx-auto p-6 bg-white dark:bg-[#3a4934] rounded-xl shadow-md space-y-6 max-w-xl">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
      {{ isExisting ? 'Sign Your Insurance Application' : 'Insurance Application' }}
    </h2>

    <div v-for="app in applications" :key="app.id" class="border p-4 rounded-md mb-4">

      <!-- Already signed -->
      <div v-if="app.pdfUrl">
        <p class="text-green-600 dark:text-green-400 font-medium">
          You have already signed this application.
        </p>
        <button @click="downloadExistingPdf(app.pdfUrl)"
                class="mt-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-[#046937] dark:bg-[#046937] dark:hover:bg-[#058a45]">
          Download PDF
        </button>
      </div>

      <!-- Sign form -->
      <form v-else @submit.prevent="submitForm(app)" class="space-y-4">
      <!-- Group Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Group #</label>
              <input type="text" v-model="app.groupNumber"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Name of Group</label>
              <input type="text" v-model="app.groupName"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
          </div>






          <!-- Reason for Enrollment -->
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2" disabled>
              Reason for Enrollment (Mark all that apply)
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label class="flex items-center">
                <input type="checkbox" value="New Group" v-model="app.reasons"
                  class="mr-2 accent-gray-800 dark:accent-gray-200" disabled>
                <span class="text-gray-800 dark:text-gray-200">New Group</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" value="Open Enrollment" v-model="app.reasons"
                  class="mr-2 accent-gray-800 dark:accent-gray-200" disabled>
                <span class="text-gray-800 dark:text-gray-200">Open Enrollment</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" value="New Hire" v-model="app.reasons"
                  class="mr-2 accent-gray-800 dark:accent-gray-200" disabled>
                <span class="text-gray-800 dark:text-gray-200">New Hire</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" value="New Application" v-model="app.reasons"
                  class="mr-2 accent-gray-800 dark:accent-gray-200" disabled>
                <span class="text-gray-800 dark:text-gray-200">New Application</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" value="Newborn" v-model="app.reasons"
                  class="mr-2 accent-gray-800 dark:accent-gray-200" disabled>
                <span class="text-gray-800 dark:text-gray-200">Newborn</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" value="Court Order" v-model="app.reasons"
                  class="mr-2 accent-gray-800 dark:accent-gray-200" disabled>
                <span class="text-gray-800 dark:text-gray-200">Court Order</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" value="Dependent Addition" v-model="app.reasons"
                  class="mr-2 accent-gray-800 dark:accent-gray-200" disabled>
                <span class="text-gray-800 dark:text-gray-200">Dependent Addition</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" value="Loss of Coverage" v-model="app.reasons"
                  class="mr-2 accent-gray-800 dark:accent-gray-200" disabled>
                <span class="text-gray-800 dark:text-gray-200">Loss of Coverage</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" value="Marriage" v-model="app.reasons"
                  class="mr-2 accent-gray-800 dark:accent-gray-200" disabled>
                <span class="text-gray-800 dark:text-gray-200">Marriage</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" value="Divorce" v-model="app.reasons"
                  class="mr-2 accent-gray-800 dark:accent-gray-200" disabled>
                <span class="text-gray-800 dark:text-gray-200">Divorce</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" value="Military Leave" v-model="app.reasons"
                  class="mr-2 accent-gray-800 dark:accent-gray-200" disabled>
                <span class="text-gray-800 dark:text-gray-200">Military Leave</span>
              </label>
            </div>
          </div>





          <!-- Personal Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">First Name</label>
              <input type="text" v-model="app.firstName"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Middle Name</label>
              <input type="text" v-model="app.middleName"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                     disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Last Name</label>
              <input type="text" v-model="app.lastName"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
          </div>

          <!-- Contact -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Phone Number</label>
              <input type="text" v-model="app.phoneNumber"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email</label>
              <input type="email" v-model="app.email"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
          </div>


          <!-- Address -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Street Address</label>
              <input type="text" v-model="app.streetAddress"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">City</label>
              <input type="text" v-model="app.city"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">State / Province</label>
              <input type="text" v-model="app.state"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">ZIP / Postal Code</label>
              <input type="text" v-model="app.zipCode"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
          </div>

          <!-- Identity -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Social Security Number</label>
              <input type="text" v-model="app.socialSecurityNumber"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Date Of Birth</label>
              <input type="date" v-model="app.dateOfBirth"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
          </div>









           <!-- Demographics -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Age</label>
              <input type="text" v-model="app.age"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Gender</label>
              <input type="text" v-model="app.gender"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                     disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Weight</label>
              <input type="text" v-model="app.weight"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                     disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Height</label>
              <input type="text" v-model="app.height"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                     disabled />
            </div>
          </div>














           <!-- Company -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Hire Date</label>
              <input type="text" :value="formatDate(app.hireDate)" 
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Rehire Date</label>
              <input type="date" :value="formatDate(app.rehireDate)" 
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                     disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Location</label>
              <input type="text" v-model="app.location"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                     disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Division</label>
              <input type="text" v-model="app.isDivision"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                     disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Parent Company</label>
              <input type="text" v-model="app.parentCompany"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                     disabled />
            </div>
          </div>






           <!-- Job Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Job Title</label>
              <input type="text" v-model=app.jobTitle
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                     disabled />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Hours Per Week</label>
              <input type="text" v-model=app.hrsPerWeek
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                     disabled />
            </div>
          </div>






          <!-- Health Plan -->
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Health Plan</label>
            <select v-model="app.healthPlan"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required disabled>
              <option value="">Select Health Plan</option>
              <option value="plan1">Plan 1</option>
              <option value="plan2">Plan 2</option>
            </select>
          </div>

        <!-- Signature Pad -->
        <SignaturePad :ref="el => { if (el) signaturePads[app.id!] = el }" />

        <!-- E-sign consent -->
        <div class="flex items-center mt-2">
          <input type="checkbox" v-model="consent[app.id!]" id="consent-{{app.id}}" class="mr-2">
          <label for="consent-{{app.id}}" class="text-gray-700 dark:text-gray-300">
            I consent to e-sign this application
          </label>
        </div>

        <!-- Submit -->
        <button type="submit"
                :disabled="!consent[app.id!]"
                class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-[#046937] dark:bg-[#046937] dark:hover:bg-[#058a45]">
          {{ isExisting ? 'Sign & Generate PDF' : 'Submit & Generate PDF' }}
        </button>
      </form>
    </div>

    <!-- Download Button for last signed PDF -->
    <div v-if="pdfDownloadUrl" class="mt-4">
      <button @click="downloadPdf"
              class="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-[#046937] dark:bg-[#046937] dark:hover:bg-[#058a45]">
        Download PDF
      </button>
    </div>

    <!-- Success / Error Messages -->
    <p v-if="message" class="text-green-600 dark:text-green-400 mt-2">{{ message }}</p>
    <p v-if="error" class="text-red-600 dark:text-red-400 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import SignaturePad from 'vue3-signature-pad'
import { useCookie } from '#imports'

interface InsuranceApplication {
  id?: number
  groupNumber: string
  groupName: string
  healthPlan?: string
  firstName: string,
  middleName: string
  lastName: string,
  phoneNumber: string,
  email: string,
  streetAddress: string,
  city: string,
  state: string,
  zipCode: string,
  socialSecurityNumber: string,
  dateOfBirth : string
  hireDate: string,
  location: string,
  isDivision: boolean,
  parentCompany: string,
  rehireDate : string,
  age: string,
  gender: string,
  weight: string,
  height: string,
  pdfUrl?: string,
  reasons: string[],
  jobTitle: string,
  hrsPerWeek: string,
}


const signaturePads = reactive<Record<number, InstanceType<typeof SignaturePad>>>({})
const pdfDownloadUrl = ref<string | null>(null)
const message = ref('')
const error = ref('')
const isExisting = ref(false)
const consent = reactive<Record<number, boolean>>({})

const applications = ref<InsuranceApplication[]>([])

const user = await useUser()
let company = null











async function submitForm(app: InsuranceApplication) {
  const pad = signaturePads[app.id!]?.signaturePad

  if (!pad || pad.isEmpty()) {
    error.value = 'Please sign before submitting!'
    return
  }

  if (!consent[app.id!]) {
    error.value = 'You must consent to e-sign this application.'
    return
  }

  error.value = ''
  message.value = ''

  try {
    const signatureDataUrl = pad.toDataURL()

    // Generate PDF
    const pdfDoc = await PDFDocument.create()
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // --- Page 1: All existing content except signature ---
    const page1 = pdfDoc.addPage([612, 792])
    const { height } = page1.getSize()

    // --- Embed logo ---
    const logoUrl = '/img/logo.png'
    const logoBytes = await fetch(logoUrl).then(res => res.arrayBuffer())
    const logoImage = await pdfDoc.embedPng(logoBytes)
    const logoDims = logoImage.scale(0.45)

    

    page1.drawImage(logoImage, { x: 10, y: height - 60, width: logoDims.width, height: logoDims.height })
    page1.drawText("Small Business Health Insurance Application", { x: 100, y: height - 50, size: 20, font: helveticaBold })

    // Group Info box
    page1.drawRectangle({ x: 20, y: height - 220, width: 180, height: 140, borderColor: rgb(0, 0, 0), borderWidth: 1 })
    page1.drawText("Group Information", { x: 40, y: height - 110, size: 14, font: helveticaBold })
    page1.drawText(`Group #: ${app.groupNumber}`, { x: 40, y: height - 130, size: 12 })
    page1.drawText(`Group Name: ${app.groupName}`, { x: 40, y: height - 150, size: 12 })
    page1.drawText(`Effective Date: ${app.effectiveDate || ""}`, { x: 40, y: height - 170, size: 12 })
    page1.drawText(`New Hire Waiting Period: ${app.waitingPeriod || ""}`, { x: 40, y: height - 190, size: 12 })



    // Reasons for Enrollment box
    page1.drawRectangle({ x: 210, y: height - 220, width: 380, height: 140, borderColor: rgb(0, 0, 0), borderWidth: 1 })
    page1.drawText("Reasons for Enrollment (Mark all that apply)", { x: 230, y: height - 110, size: 14, font: helveticaBold })

    const reasons = [
    "New Group", "Open Enrollment", "New Hire", "New Application",
    "Newborn", "Court Order", "Dependent Addition", "Loss of Coverage",
    "Marriage", "Divorce", "Military Leave"
  ]

  const colX = 230, colY = height - 130, colSpacing = 120, rowSpacing = 15
  const half = Math.ceil(reasons.length / 2)

  reasons.forEach((reason, i) => {
    const isSecondCol = i >= half
    const x = isSecondCol ? colX + colSpacing : colX
    const y = isSecondCol ? height - 130 - ((i - half) * rowSpacing) : colY - (i * rowSpacing)

    // Draw empty checkbox
    page1.drawRectangle({
      x,
      y: y - 2,
      width: 10,
      height: 10,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1
    })

    // Label
    page1.drawText(reason, { x: x + 15, y, size: 11 })

    // ✅ If selected, draw an X inside the checkbox
    if (app.reasons.includes(reason)) {
      page1.drawText("X", { x: x + 2, y: y - 1, size: 10, font: helveticaBold })
    }
  })



    
   


    // Employer Info Heading
    const employerY = height - 250
    page1.drawText("Employer Information", { 
      x: 20, 
      y: employerY, 
      size: 16, 
      font: helveticaBold 
    })
    page1.drawLine({ 
      start: { x: 20, y: employerY - 3 }, 
      end: { x: 592, y: employerY - 3 }, 
      thickness: 1, 
      color: rgb(0, 0, 0) 
    })

    if (user?.id) {
      company = await useCompany(user.id)
    }

    // Row 1
    let employerRowY = employerY - 20
    page1.drawText("Employer:", { x: 20, y: employerRowY, size: 10, font: helveticaBold })
    page1.drawText(company?.companyName || "", { x: 70, y: employerRowY, size: 10, font: helvetica })
    page1.drawLine({ start: { x: 70, y: employerRowY - 2 }, end: { x: 280, y: employerRowY - 2 }, thickness: 1, color: rgb(0, 0, 0) })

    page1.drawText("Hire Date:", { x: 285, y: employerRowY, size: 10, font: helveticaBold })
    page1.drawText(formatDate(app.hireDate) || "", { x: 335, y: employerRowY, size: 10, font: helvetica })
    page1.drawLine({ start: { x: 335, y: employerRowY - 2 }, end: { x: 430, y: employerRowY - 2 }, thickness: 1, color: rgb(0, 0, 0) })

    page1.drawText("Rehire Date:", { x: 432, y: employerRowY, size: 10, font: helveticaBold })
    page1.drawText(formatDate(app.rehireDate) || "", { x: 500, y: employerRowY, size: 10, font: helvetica })
    page1.drawLine({ start: { x: 497, y: employerRowY - 2 }, end: { x: 592, y: employerRowY - 2 }, thickness: 1, color: rgb(0, 0, 0) })

    // Row 2
    employerRowY -= 20
    page1.drawText("Location:", { x: 20, y: employerRowY, size: 10, font: helveticaBold })
    page1.drawText(app.location || "", { x: 65, y: employerRowY, size: 10, font: helvetica })
    page1.drawLine({ start: { x: 65, y: employerRowY - 2 }, end: { x: 200, y: employerRowY - 2 }, thickness: 1, color: rgb(0, 0, 0) })

    page1.drawText("Is this a division?", { x: 220, y: employerRowY, size: 10, font: helveticaBold })

    // Yes checkbox
    page1.drawRectangle({ 
      x: 310, 
      y: employerRowY - 8, 
      width: 10, 
      height: 10, 
      borderColor: rgb(0, 0, 0), 
      borderWidth: 1 
    })
    page1.drawText("Yes", { x: 325, y: employerRowY, size: 10, font: helvetica })

    // No checkbox
    page1.drawRectangle({ 
      x: 350, 
      y: employerRowY - 8, 
      width: 10, 
      height: 10, 
      borderColor: rgb(0, 0, 0), 
      borderWidth: 1 
    })
    page1.drawText("No", { x: 365, y: employerRowY, size: 10, font: helvetica })

    // Mark checkbox depending on value
    if (app.isDivision) {
      // Mark YES
      page1.drawText("X", { x: 312, y: employerRowY - 7, size: 10, font: helveticaBold })
    } else {
      // Mark NO
      page1.drawText("X", { x: 352, y: employerRowY - 7, size: 10, font: helveticaBold })
    }


    // Parent Company
    page1.drawText("Parent Company:", { x: 380, y: employerRowY, size: 10, font: helveticaBold })
    page1.drawText(app.parentCompany || "", { x: 465, y: employerRowY, size: 10, font: helvetica })
    page1.drawLine({ start: { x: 460, y: employerRowY - 2 }, end: { x: 592, y: employerRowY - 2 }, thickness: 1, color: rgb(0, 0, 0) })








// Employee Info Heading
const employeeY = employerRowY - 30
page1.drawText("Employee Information", { 
  x: 20, 
  y: employeeY, 
  size: 16, 
  font: helveticaBold 
})
page1.drawLine({ 
  start: { x: 20, y: employeeY - 3 }, 
  end: { x: 592, y: employeeY - 3 }, 
  thickness: 1, 
  color: rgb(0, 0, 0) 
})


// Row 1
let rowY = employeeY - 20
page1.drawText("Last Name:", { x: 20, y: rowY, size: 10, font: helveticaBold })
page1.drawText(app.lastName || "", { x: 75, y: rowY, size: 10, font: helvetica })
page1.drawLine({ start: { x: 75, y: rowY - 2 }, end: { x: 140, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) })

page1.drawText("First Name:", { x: 140, y: rowY, size: 10, font: helveticaBold })
page1.drawText(app.firstName || "", { x: 200, y: rowY, size: 10, font: helvetica })
page1.drawLine({ start: { x: 200, y: rowY - 2 }, end: { x: 250, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) })

page1.drawText("Middle Name:", { x: 250, y: rowY, size: 10, font: helveticaBold })
page1.drawText(app.middleName || "", { x: 320, y: rowY, size: 10, font: helvetica })
page1.drawLine({ start: { x: 320, y: rowY - 2 }, end: { x: 350, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) })

page1.drawText("Job Title:", { x: 350, y: rowY, size: 10, font: helveticaBold })
page1.drawText(app.jobTitle || "", { x: 400, y: rowY, size: 10, font: helvetica })
page1.drawLine({ start: { x: 400, y: rowY - 2 }, end: { x: 500, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) })

//needs to be hours per week
page1.drawText("Hrs/week:", { x: 505, y: rowY, size: 10, font: helveticaBold })
page1.drawText(app.hrsPerWeek || "", { x: 560, y: rowY, size: 10, font: helvetica })
page1.drawLine({ start: { x: 560, y: rowY - 2 }, end: { x: 592, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) })



// Row 2
rowY -= 20
page1.drawText("Phone Number:", { x: 20, y: rowY, size: 10, font: helveticaBold })
page1.drawText(app.phoneNumber || "", { x: 95, y: rowY, size: 10, font: helvetica })
page1.drawLine({ start: { x: 95, y: rowY - 2 }, end: { x: 240, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) })

page1.drawText("Email:", { x: 250, y: rowY, size: 10, font: helveticaBold })
page1.drawText(app.email || "", { x: 290, y: rowY, size: 10, font: helvetica })
page1.drawLine({ start: { x: 290, y: rowY - 2 }, end: { x: 592, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) })







// Row 3 - Address
rowY -= 20

// Label
page1.drawText("Address:", { x: 20, y: rowY, size: 10, font: helveticaBold })

// Full Address on one line
const fullAddress = `${app.streetAddress || ""}, ${app.city || ""}, ${app.state || ""} ${app.zipCode || ""}`
page1.drawText(fullAddress, { x: 70, y: rowY, size: 10, font: helvetica })

// Underline
page1.drawLine({ start: { x: 70, y: rowY - 2 }, end: { x: 592, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) })









// Enrolling Heading
let headingY = employeeY - 90
page1.drawText("Enrolling Employee / Spouse / Domestic Partner* / Dependents", { 
  x: 20, 
  y: headingY, 
  size: 16, 
  font: helveticaBold 
})
page1.drawLine({ 
  start: { x: 20, y: headingY - 3 }, 
  end: { x: 592, y: headingY - 3 }, 
  thickness: 1, 
  color: rgb(0, 0, 0) 
})


// ---------------- Employee + Dependents Table ----------------
const tableX = 20
let tableY = employeeY - 130 // spacing under Employee Info
const rowHeight = 28 // taller row for header to fit two lines

// Define headers
const headers = [
  "", // blank column
  "Name (Last, First, Middle)",
  "Social Security # (User use only)",
  "Date of Birth (MM/DD/YYYY)",
  "Age",
  "Gender",
  "Weight",
  "Height"
]

// Define column widths (fit into 592 exactly)
const colWidths = [120, 100, 90, 90, 40, 40, 40, 52] // total = 592

// ---- Draw Header Row ----
let headerX = tableX
headers.forEach((header, i) => {
  page1.drawRectangle({
    x: headerX,
    y: tableY,
    width: colWidths[i],
    height: rowHeight,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1
  })

  // Split at "(" so anything inside parentheses goes on next line
  const parts = header.split("(")
  const mainText = parts[0].trim()
  const subText = parts[1] ? "(" + parts[1] : ""

  // Draw main text
  page1.drawText(mainText, {
    x: headerX + 2,
    y: tableY + rowHeight - 12, // top line
    size: 8,
    font: helveticaBold
  })

  // Draw sub text if exists
  if (subText) {
    page1.drawText(subText, {
      x: headerX + 2,
      y: tableY + 6, // lower line
      size: 7,
      font: helvetica
    })
  }

  headerX += colWidths[i]
})

// ---- Rows (Employee, Spouse/Domestic Partner*, Dependents) ----
const rowLabels = [
  "Employee",
  "Spouse/Domestic Partner*",
  "Dependent",
  "Dependent",
  "Dependent"
]

rowLabels.forEach((label, rowIndex) => {
  const y = tableY - (rowHeight * (rowIndex + 1))
  let cellX = tableX

  colWidths.forEach((w, colIndex) => {
    // Draw cell outline
    page1.drawRectangle({
      x: cellX,
      y: y,
      width: w,
      height: rowHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1
    })

    // Fill first column (row label)
    if (colIndex === 0) {
      page1.drawText(label, {
        x: cellX + 2,
        y: y + 8,
        size: 8,
        font: helvetica
      })
    }

    // Fill Employee row with app data
    if (rowIndex === 0) {
      switch (colIndex) {
        case 1:
          page1.drawText(
            `${app.lastName || ""}, ${app.firstName || ""} ${app.middleName || ""}`,
            { x: cellX + 2, y: y + 8, size: 8, font: helvetica }
          )
          break
        case 2:
          page1.drawText(app.socialSecurityNumber || "", { x: cellX + 2, y: y + 8, size: 8, font: helvetica })
          break
        case 3:
          page1.drawText(app.dateOfBirth || "", { x: cellX + 2, y: y + 8, size: 8, font: helvetica })
          break
        case 4:
          page1.drawText(app.age || "", { x: cellX + 2, y: y + 8, size: 8, font: helvetica })
          break
        case 5:
          page1.drawText(app.gender || "", { x: cellX + 2, y: y + 8, size: 8, font: helvetica })
          break
        case 6:
          page1.drawText(app.weight || "", { x: cellX + 2, y: y + 8, size: 8, font: helvetica })
          break
        case 7:
          page1.drawText(app.height || "", { x: cellX + 2, y: y + 8, size: 8, font: helvetica })
          break
      }
    }

    cellX += w
  })
})














    // --- Page 2: Signature only ---
    const page2 = pdfDoc.addPage([612, 792])
    const { height: h2 } = page2.getSize()








        

    // ---------------- Health Plan Options Section ----------------

    // Heading
    const healthY = 750

    page2.drawText("Health Plan Options", {
      x: 20,
      y: healthY,
      size: 16,
      font: helveticaBold
    })

    page2.drawLine({
      start: { x: 20, y: healthY - 3 },
      end: { x: 592, y: healthY - 3 },
      thickness: 1,
      color: rgb(0, 0, 0)
    })

    // Description text
    const descY = healthY - 20
    page2.drawText(
      "Please select the plan you would like to enroll in. For more information on the plans listed below, please contact your insurance agent or broker to obtain a copy of the Plan Highlights.",
      { x: 20, y: descY, size: 10, font: helvetica }
    )

    // Table setup
    const planTableY = descY - 30
    const planTableX = 20
    const planRowHeight = 20

    // Plan headers
    const planHeaders = ["Plan Name / Type", "Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]
    const planColWidths = [220, 70, 70, 70, 70, 70] // total 592

    // Draw header row
    let planHeaderX = planTableX
    planHeaders.forEach((header, i) => {
      page2.drawRectangle({
        x: planHeaderX,
        y: planTableY,
        width: planColWidths[i],
        height: planRowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1
      })

      page2.drawText(header, {
        x: planHeaderX + 2,
        y: planTableY + 6,
        size: 9,
        font: helveticaBold
      })

      planHeaderX += planColWidths[i]
    })

    // Plan rows
    const planRows = [
      { name: "Plan 1", options: ["$50", "$100", "$150", "$200", "$250"] },
      { name: "Plan 2", options: ["$500", "$750", "$1000", "$1250", "$1500"] }
    ]

    planRows.forEach((row, rowIndex) => {
      const y = planTableY - planRowHeight * (rowIndex + 1)
      let cellX = planTableX

      planColWidths.forEach((w, colIndex) => {
        // Draw cell outline
        page2.drawRectangle({
          x: cellX,
          y,
          width: w,
          height: planRowHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1
        })

        if (colIndex === 0) {
          // Plan name in first column
          page2.drawText(row.name, { x: cellX + 2, y: y + 6, size: 9, font: helvetica })
        } else {
          // Checkbox for plan option
          page2.drawRectangle({ x: cellX + 5, y: y + 5, width: 10, height: 10, borderColor: rgb(0, 0, 0), borderWidth: 1 })
          // Option text next to checkbox
          page2.drawText(row.options[colIndex - 1], { x: cellX + 18, y: y + 6, size: 8, font: helvetica })
        }

        cellX += w
      })
    })














    
    // Vision Plan Section
    const visionY = (healthY - 115 ) 

    page2.drawText("Vision Plan Options", { x: 20, y: visionY + 3, size: 14, font: helveticaBold })
    page2.drawLine({ start: { x: 20, y: visionY - 2 }, end: { x: 592, y: visionY - 2 }, thickness: 1, color: rgb(0,0,0) })

    const visionTableY = visionY - 30
    const visionPlans = [
      { name: "Vision Plan A", options: ["Exam $10", "Lenses $20", "Frames $30", "", ""] },
      { name: "Vision Plan B", options: ["Exam $15", "Lenses $25", "Frames $35", "", ""] }
    ]
    const visionPlanColWidths = [220, 70, 70, 70, 70, 70]
    const visionPlanRowHeight = 20
    const visionPlanHeaders = ["Plan Name / Type", "Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]

    // Header row
    let headerX2 = 20
    visionPlanHeaders.forEach((header, i) => {
      page2.drawRectangle({ x: headerX2, y: visionTableY, width: visionPlanColWidths[i], height: visionPlanRowHeight, borderColor: rgb(0,0,0), borderWidth: 1 })
      page2.drawText(header, { x: headerX2 + 2, y: visionTableY + 6, size: 9, font: helveticaBold })
      headerX2 += visionPlanColWidths[i]
    })

    // Rows
    visionPlans.forEach((row, rowIndex) => {
      const y = visionTableY - visionPlanRowHeight * (rowIndex + 1)
      let cellX = 20
      visionPlanColWidths.forEach((w, colIndex) => {
        page2.drawRectangle({ x: cellX, y, width: w, height: visionPlanRowHeight, borderColor: rgb(0,0,0), borderWidth: 1 })
        if(colIndex===0) page2.drawText(row.name, { x: cellX + 2, y: y + 6, size: 9, font: helvetica })
        else if(row.options[colIndex - 1]){
          page2.drawRectangle({ x: cellX + 2, y: y + 4, width: 10, height: 10, borderColor: rgb(0,0,0), borderWidth: 1 })
          page2.drawText(row.options[colIndex - 1], { x: cellX + 15, y: y + 4, size: 8, font: helvetica })
        }
        cellX += w
      })
    })












  // --- Dental Plan Section ---
const dentalY = visionTableY - (visionPlanRowHeight * visionPlans.length) - 20
page2.drawText("Dental Plan Options", { x: 20, y: dentalY + 3, size: 14, font: helveticaBold })
page2.drawLine({ start: { x: 20, y: dentalY - 2 }, end: { x: 592, y: dentalY - 2 }, thickness: 1, color: rgb(0,0,0) })

const dentalTableY = dentalY - 30
const dentalPlans = [
  { name: "Dental Plan A", options: ["Preventive $5", "Basic $15", "Major $25", "", ""] },
  { name: "Dental Plan B", options: ["Preventive $10", "Basic $20", "Major $30", "", ""] }
]
const dentalColWidths = [220, 70, 70, 70, 70, 70]
const dentalRowHeight = 20
const dentalHeaders = ["Plan Name / Type", "Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]

// Header row
let headerX3 = 20
dentalHeaders.forEach((header, i) => {
  page2.drawRectangle({ x: headerX3, y: dentalTableY, width: dentalColWidths[i], height: dentalRowHeight, borderColor: rgb(0,0,0), borderWidth: 1 })
  page2.drawText(header, { x: headerX3 + 2, y: dentalTableY + 6, size: 9, font: helveticaBold })
  headerX3 += dentalColWidths[i]
})

// Rows
dentalPlans.forEach((row, rowIndex) => {
  const y = dentalTableY - dentalRowHeight * (rowIndex + 1)
  let cellX = 20
  dentalColWidths.forEach((w, colIndex) => {
    page2.drawRectangle({ x: cellX, y, width: w, height: dentalRowHeight, borderColor: rgb(0,0,0), borderWidth: 1 })
    if(colIndex===0) page2.drawText(row.name, { x: cellX + 2, y: y + 6, size: 9, font: helvetica })
    else if(row.options[colIndex - 1]){
      page2.drawRectangle({ x: cellX + 2, y: y + 4, width: 10, height: 10, borderColor: rgb(0,0,0), borderWidth: 1 })
      page2.drawText(row.options[colIndex - 1], { x: cellX + 15, y: y + 4, size: 8, font: helvetica })
    }
    cellX += w
  })
})

// --- Life Plan Section ---
const lifeY = dentalTableY - dentalRowHeight * dentalPlans.length - 20
page2.drawText("Life Plan Options", { x: 20, y: lifeY + 3, size: 14, font: helveticaBold })
page2.drawLine({ start: { x: 20, y: lifeY - 2 }, end: { x: 592, y: lifeY - 2 }, thickness: 1, color: rgb(0,0,0) })

const lifeTableY = lifeY - 30
const lifePlans = [
  { name: "Life Plan A", options: ["Employee $10", "Spouse $5", "Child $2", "", ""] },
  { name: "Life Plan B", options: ["Employee $15", "Spouse $7", "Child $3", "", ""] }
]
const lifeColWidths = [220, 70, 70, 70, 70, 70]
const lifeRowHeight = 20
const lifeHeaders = ["Plan Name / Type", "Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]

// Header row
let headerX4 = 20
lifeHeaders.forEach((header, i) => {
  page2.drawRectangle({ x: headerX4, y: lifeTableY, width: lifeColWidths[i], height: lifeRowHeight, borderColor: rgb(0,0,0), borderWidth: 1 })
  page2.drawText(header, { x: headerX4 + 2, y: lifeTableY + 6, size: 9, font: helveticaBold })
  headerX4 += lifeColWidths[i]
})

// Rows
lifePlans.forEach((row, rowIndex) => {
  const y = lifeTableY - lifeRowHeight * (rowIndex + 1)
  let cellX = 20
  lifeColWidths.forEach((w, colIndex) => {
    page2.drawRectangle({ x: cellX, y, width: w, height: lifeRowHeight, borderColor: rgb(0,0,0), borderWidth: 1 })
    if(colIndex===0) page2.drawText(row.name, { x: cellX + 2, y: y + 6, size: 9, font: helvetica })
    else if(row.options[colIndex - 1]){
      page2.drawRectangle({ x: cellX + 2, y: y + 4, width: 10, height: 10, borderColor: rgb(0,0,0), borderWidth: 1 })
      page2.drawText(row.options[colIndex - 1], { x: cellX + 15, y: y + 4, size: 8, font: helvetica })
    }
    cellX += w
  })
})

// --- Ancillary Plan Section ---
const ancillaryY = lifeTableY - lifeRowHeight * lifePlans.length - 20
page2.drawText("Ancillary Plan Options", { x: 20, y: ancillaryY + 3, size: 14, font: helveticaBold })
page2.drawLine({ start: { x: 20, y: ancillaryY - 2 }, end: { x: 592, y: ancillaryY - 2 }, thickness: 1, color: rgb(0,0,0) })

const ancillaryTableY = ancillaryY - 30
const ancillaryPlans = [
  { name: "Ancillary Plan A", options: ["Accident $5", "Critical Illness $10", "Hospital Indemnity $8", "", ""] },
  { name: "Ancillary Plan B", options: ["Accident $7", "Critical Illness $12", "Hospital Indemnity $10", "", ""] }
]
const ancillaryColWidths = [120, 80, 105, 105, 80, 80]
const ancillaryRowHeight = 20
const ancillaryHeaders = ["Plan Name / Type", "Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]

// Header row
let headerX5 = 20
ancillaryHeaders.forEach((header, i) => {
  page2.drawRectangle({ x: headerX5, y: ancillaryTableY, width: ancillaryColWidths[i], height: ancillaryRowHeight, borderColor: rgb(0,0,0), borderWidth: 1 })
  page2.drawText(header, { x: headerX5 + 2, y: ancillaryTableY + 6, size: 9, font: helveticaBold })
  headerX5 += ancillaryColWidths[i]
})

// Rows
ancillaryPlans.forEach((row, rowIndex) => {
  const y = ancillaryTableY - ancillaryRowHeight * (rowIndex + 1)
  let cellX = 20
  ancillaryColWidths.forEach((w, colIndex) => {
    page2.drawRectangle({ x: cellX, y, width: w, height: ancillaryRowHeight, borderColor: rgb(0,0,0), borderWidth: 1 })
    if(colIndex===0) page2.drawText(row.name, { x: cellX + 2, y: y + 6, size: 9, font: helvetica })
    else if(row.options[colIndex - 1]){
      page2.drawRectangle({ x: cellX + 2, y: y + 4, width: 10, height: 10, borderColor: rgb(0,0,0), borderWidth: 1 })
      page2.drawText(row.options[colIndex - 1], { x: cellX + 15, y: y + 4, size: 8, font: helvetica })
    }
    cellX += w
  })
})










    // rowY -= 20
    // page2.drawText(`Health Plan: ${app.healthPlan}`, { x: 40, y: height - 540, size: 10 })
    // page2.drawText(`Dental Plan: ${app.dentalPlan || "N/A"}`, { x: 300, y: height - 540, size: 10 })
    // page2.drawText(`Vision Plan: ${app.visionPlan || "N/A"}`, { x: 40, y: height - 580, size: 10 })
    // page2.drawText(`Life/Ancillary: ${app.lifeAncillaryPlan || "N/A"}`, { x: 300, y: height - 580, size: 10 })


   // Coordinates and dimensions
const sigLabelX = 40
const sigLabelY = 50
const sigBoxX = sigLabelX + 150 // more space between label and box
const sigBoxY = 40              // align roughly with label
const sigWidth = 250
const sigHeight = 60            // taller box

// Draw the label text
page2.drawText("Employee Signature:", {
  x: sigLabelX,
  y: sigLabelY,
  size: 12,
  font: helveticaBold
})

// Draw the rectangle (box) for the signature
page2.drawRectangle({
  x: sigBoxX,
  y: sigBoxY,
  width: sigWidth,
  height: sigHeight,
  borderColor: rgb(0, 0, 0),
  borderWidth: 1,
  color: rgb(1, 1, 1) // white fill
})

// Embed the signature image inside the box
if (signatureDataUrl) {
  const pngBytes = await fetch(signatureDataUrl).then(res => res.arrayBuffer())
  const pngImage = await pdfDoc.embedPng(pngBytes)
  const pngDims = pngImage.scale(0.25)

  // Draw the signature image inside the box
  page2.drawImage(pngImage, {
    x: sigBoxX + 5, // padding from left
    y: sigBoxY + 5, // padding from bottom
    width: pngDims.width,
    height: pngDims.height
  })
}



    const pdfBytes = await pdfDoc.save()

    // Upload PDF
    const formData = new FormData()
    formData.append('pdf', new Blob([pdfBytes], { type: 'application/pdf' }))
    formData.append('applicationId', String(app.id))

    const authToken = useCookie('auth_token').value
    const res = await fetch('/api/applications/sign', {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${authToken}` }
    })

    if (!res.ok) throw new Error(await res.text())
    const data = await res.json()

    message.value = 'Application signed and PDF uploaded!'
    pdfDownloadUrl.value = data.pdfUrl
    pad.clear()
    app.pdfUrl = data.pdfUrl

  } catch (err: any) {
    console.error(err)
    error.value = 'Failed to submit application'
  }
}

// Format helper (safe for null/undefined)
const formatDate = (date: Date | string | null) => {
  if (!date) return ""
  const d = new Date(date)
  return d.toISOString().split("T")[0] // keeps only YYYY-MM-DD
}

function downloadPdf() {
  if (!pdfDownloadUrl.value) return
  window.open(pdfDownloadUrl.value, '_blank')
}

function downloadExistingPdf(url: string) {
  window.open(url, '_blank')
}

onMounted(async () => {
  try {
    const authToken = useCookie('auth_token').value
    const res: InsuranceApplication[] = await $fetch('/api/applications/my', {
      headers: { Authorization: `Bearer ${authToken}` }
    })

    applications.value = res.map(app => ({
      ...app,
      // normalize ISO date -> YYYY-MM-DD
      dateOfBirth: app.dateOfBirth
        ? new Date(app.dateOfBirth).toISOString().split('T')[0]
        : '',
      // convert reasons to array if string
      reasons: Array.isArray(app.reasons)
        ? app.reasons
        : app.reasons
          ? app.reasons.split(',').map(r => r.trim())
          : []
    })) as any
  } catch (err: any) {
    console.error(err)
  }
})


</script>
