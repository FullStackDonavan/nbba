import { defineEventHandler, readMultipartFormData } from 'h3'
import fs from 'fs'
import path from 'path'
import csvParser from 'csv-parser'
import prisma from "~/server/database/client";

export default defineEventHandler(async (event) => {
  try {
    const form = await readMultipartFormData(event)

    if (!form) {
      throw new Error('No file uploaded')
    }

    const file = form.find(f => f.name === 'file')
    if (!file) {
      throw new Error('File field missing')
    }

    const uploadsDir = path.join(process.cwd(), 'uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir)
    }

    const filePath = path.join(uploadsDir, file.filename)
    fs.writeFileSync(filePath, file.data)

    // Parse CSV
    const leads: any[] = []
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          leads.push(row)
        })
        .on('end', resolve)
        .on('error', reject)
    })

    // Save to DB
    for (const lead of leads) {
      await prisma.lead.create({
        data: {
          firstName: lead.first_name,
          lastName: lead.last_name,
          email: lead.email,
          phone: lead.phone,
          policyType: lead.policy_type,
          agentId: Number(lead.agent_id),
        }
      })
    }

    return { success: true, count: leads.length }
  } catch (err: any) {
    console.error('Upload error:', err)
    return sendError(event, createError({ statusCode: 500, statusMessage: err.message }))
  }
})
