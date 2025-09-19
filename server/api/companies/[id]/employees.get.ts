/**
 * @swagger
 * /api/companies/{id}/employees:
 *   get:
 *     summary: Get all active employees for a company
 *     description: >
 *       Returns a list of active employees for the specified company ID, including their
 *       basic information and linked user ID if available. Employees are ordered by the `order` field.
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the company
 *     responses:
 *       200:
 *         description: List of active employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   firstName:
 *                     type: string
 *                     example: "Jane"
 *                   lastName:
 *                     type: string
 *                     example: "Doe"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "jane.doe@example.com"
 *                   phone:
 *                     type: string
 *                     example: "+1-555-123-4567"
 *                   username:
 *                     type: string
 *                     example: "janedoe"
 *                   userId:
 *                     type: integer
 *                     nullable: true
 *                     example: 10
 *       400:
 *         description: Company ID missing
 *       500:
 *         description: Failed to fetch employees
 */

import prisma from '~/server/database/client';
import { getRouterParams, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  if (!id) throw createError({ statusCode: 400, message: 'Company ID missing' });

  try {
    const employees = await prisma.employee.findMany({
      where: { companyId: Number(id), isActive: true  },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        username: true,
        user: { select: { id: true } }, // Include linked user
      },
      orderBy: { order: 'asc' }
    });

    // Map so front-end can access emp.userId directly
    return employees.map(emp => ({
      id: emp.id,
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      phone: emp.phone,
      username: emp.username,
      userId: emp.user?.id || null, // <-- This is key
    }));

  } catch (err: any) {
    console.error('Error fetching employees:', err);
    throw createError({ statusCode: 500, message: err.message });
  }
});
