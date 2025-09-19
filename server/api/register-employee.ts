/**
 * @swagger
 * /api/register-employee:
 *   post:
 *     summary: Register a new employee
 *     description: Registers a new employee for a company using a valid business code. Creates both Employee and User records and marks any existing invites as accepted.
 *     tags:
 *       - Employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessCode
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               businessCode:
 *                 type: string
 *                 description: The company's business code
 *                 example: "ABC123"
 *               firstName:
 *                 type: string
 *                 description: Employee's first name
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: Employee's last name
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 description: Employee's email
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 description: Employee's phone number
 *                 example: "1234567890"
 *               username:
 *                 type: string
 *                 description: Employee's username
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: Employee's password
 *                 example: "SuperSecurePassword123!"
 *     responses:
 *       200:
 *         description: Employee successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 employee:
 *                   $ref: '#/components/schemas/Employee'
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing required fields or invalid business code
 *       404:
 *         description: Company with provided business code not found
 *       500:
 *         description: Failed to register employee due to server error
 */
import prisma from '~/server/database/client'
import { hash } from 'bcryptjs'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log('Request body:', body)

    const { businessCode, firstName, lastName, email, phone, username, password } = body

    if (!businessCode) throw createError({ statusCode: 400, statusMessage: 'Business code is required' })
    if (!email || !password || !firstName || !lastName) {
      throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
    }

    // 1. Find company
    const company = await prisma.company.findUnique({ where: { businessCode } })
    if (!company) throw createError({ statusCode: 404, statusMessage: 'Invalid business code' })

    // 2. Hash password
    const hashedPassword = await hash(password, 10)

    // 3. Create Employee first
    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        username,
        password: hashedPassword,
        companyId: company.id,
      },
    })

    // 4. Create User and connect it directly to Employee
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        username,
        password: hashedPassword,
        companyId: company.id,
        employee: { connect: { id: employee.id } }, // ✅ relation connect
      },
    })

    // 5. Update Employee.userId
    await prisma.employee.update({
      where: { id: employee.id },
      data: { userId: user.id },
    })

    // 🔹 Step 3: Mark invite accepted
    await prisma.employeeInvite.updateMany({
      where: { email, companyId: company.id },
      data: { acceptedAt: new Date() },
    })

    return { success: true, employee, user }
  } catch (err: any) {
    console.error('Employee registration failed:', err)
    throw createError({ statusCode: 500, statusMessage: err.message || 'Failed to register employee' })
  }
})
