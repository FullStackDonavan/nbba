import prisma from '~/server/database/client'
import { getUserByAuthToken } from '~/server/database/repositories/sessionRepository'

export default defineEventHandler(async (event) => {
  try {
    const authToken = getCookie(event, "auth_token")
    if (!authToken) throw createError({ statusCode: 401, statusMessage: "Missing auth token" })

    const user = await getUserByAuthToken(authToken)
    if (!user) throw createError({ statusCode: 401, statusMessage: "Invalid or expired session" })

    const insuranceAgent = await prisma.insuranceAgent.findUnique({
      where: { userId: user.id },
    })
    if (!insuranceAgent) throw createError({ statusCode: 400, statusMessage: "User is not an insurance agent" })

    const agentId = user.id

    // Fetch leads accepted for this agent
    const leads = await prisma.lead.findMany({
      where: {
        invites: {
          some: { agentId, acceptedAt: { not: null } },
        },
      },
      include: {
        invites: {
          where: { agentId, acceptedAt: { not: null } },
          take: 1
        }
      },
      orderBy: { id: 'desc' }
    })

    // Check if each lead has signed
    const formatted = await Promise.all(
      leads.map(async (lead) => {
        const leadInvite = lead.invites[0] || null

        // ✅ Check if an audit trail exists for this lead email with action SIGNED (case-insensitive)
        const signedTrail = await prisma.auditTrail.findFirst({
          where: {
            email: { equals: lead.email, mode: "insensitive" },
            action: { equals: "E-sign", mode: "insensitive" } // adjust if needed
          }
        })


        return {
          ...lead,
          leadInvite,
          hasSigned: !!signedTrail
        }
      })
    )


    return formatted

  } catch (err: any) {
    console.error("Error fetching accepted leads:", err)
    throw createError({ statusCode: 500, statusMessage: err.message || "Internal Server Error" })
  }
})
