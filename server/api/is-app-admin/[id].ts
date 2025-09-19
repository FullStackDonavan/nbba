/**
 * @swagger
 * /api/is-app-admin/{id}:
 *   get:
 *     summary: Get AppAdmin by ID
 *     tags:
 *       - AppAdmin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: AppAdmin ID
 *     responses:
 *       200:
 *         description: AppAdmin object with related users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       email:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 */

import { PrismaClient } from '@prisma/client'
import { defineEventHandler, getRouterParam } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) return { isAdmin: false }

  // Check if this user is an actual AppAdmin
  const appAdmin = await prisma.appAdmin.findUnique({
    where: { id },
  })

  return { isAdmin: !!appAdmin }
})
