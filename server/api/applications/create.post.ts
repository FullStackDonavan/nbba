// server/api/applications/create.post.ts
import prisma from '~/server/database/client'
import { getUserByAuthToken } from '~/server/database/repositories/sessionRepository'
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const authToken = getCookie(event, 'auth_token')
    if (!authToken) {
      throw createError({ statusCode: 401, statusMessage: 'Missing auth token' })
    }

    const loggedInUser = await getUserByAuthToken(authToken)
    if (!loggedInUser) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid or expired session' })
    }

    const body = await readBody(event)
    const {
      userId,
      groupNumber,
      groupName,
      firstName,
      middleName,
      lastName,
      phoneNumber,
      email,
      streetAddress,
      city,
      state,
      zipCode,
      socialSecurityNumber,
      hrsPerWeek,
      jobTitle,
      dateOfBirth,
      hireDate,
      rehireDate,
      location,
      isDivision,
      parentCompany,
      age,
      gender,
      weight,
      height,
      healthPlan,
      dentalPlan,
      visionPlan,
      lifeAncillaryPlan,
      reasons,
      spouseFirstName,
      spouseMiddleName,
      spouseLastName,
      spouseSocialSecurityNumber,
      spouseDateOfBirth,
      spouseAge,
      spouseGender,
      spouseWeight,
      spouseHeight

    } = body

    if (
      !userId ||
      !groupNumber ||
      !groupName ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !jobTitle ||
      !hrsPerWeek ||

      !hireDate ||
      !location ||
      isDivision === undefined || isDivision === null ||
      parentCompany === undefined || isDivision === null ||
      !age ||
      !gender ||
      !weight ||
      !height ||
      !socialSecurityNumber ||
      !dateOfBirth ||
      !healthPlan
    ) {
      throw createError({
        statusCode: 400,
        statusMessage:
          'User ID, Group Number, Group Name, First Name, Last Name, Phone Number, Email, Social Security Number, Date of Birth, location, isDivision and Health Plan are required',
      })
    }

    // Ensure authorized role
    if (
      !loggedInUser.appAdminId &&
      !loggedInUser.companyAdminId &&
      !loggedInUser.insuranceAgent
    ) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Not authorized to create application',
      })
    }

    // Verify target user exists
    const targetUser = await prisma.user.findUnique({ where: { id: userId } })
    if (!targetUser) {
      throw createError({ statusCode: 404, statusMessage: 'Target user not found' })
    }

    // 🔑 Normalize date fields
    const normalizeDate = (val: any) => {
      if (!val || val === '') return null
      return new Date(val)
    }

    const application = await prisma.insuranceApplication.create({
      data: {
        userId,
        groupNumber,
        groupName,
        firstName,
        middleName,
        lastName,
        phoneNumber,
        email,
        streetAddress,
        city,
        state,
        zipCode,
        socialSecurityNumber,
        hireDate: normalizeDate(hireDate),
        rehireDate: normalizeDate(rehireDate),
        location,
        isDivision,
        parentCompany,
        jobTitle,
        hrsPerWeek,
        age,
        gender,
        weight,
        height,
        dateOfBirth: normalizeDate(dateOfBirth),
        healthPlan,
        dentalPlan: dentalPlan || null,
        visionPlan: visionPlan || null,
        lifeAncillaryPlan: lifeAncillaryPlan || null,
        reasons: reasons?.length ? reasons.join(',') : null,
        spouseFirstName,
        spouseMiddleName,
        spouseLastName,
        spouseSocialSecurityNumber,
        spouseDateOfBirth: normalizeDate(spouseDateOfBirth),
        spouseAge,
        spouseGender,
        spouseWeight,
        spouseHeight
      },
    })

    return { success: true, application }
  } catch (err: any) {
    console.error('❌ Create application error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Failed to create application',
    })
  }
})