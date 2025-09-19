import prisma from "~/server/database/client";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.email || !body.password || !body.firstName || !body.lastName || !body.username) {
    throw createError({ statusCode: 400, statusMessage: "Missing required fields" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create agent + user in a single transaction
    const agent = await prisma.insuranceAgent.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone || null,
        username: body.username,
        password: hashedPassword,

        // Link to existing AppAdmin
        appAdmin: {
          connect: { id: 1 }, // ✅ correct way to reference an existing AppAdmin
        },

        // Create corresponding User
        user: {
          create: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            username: body.username,
            phone: body.phone || null,
            password: hashedPassword,
            appAdmin: { connect: { id: 1 } }, // ✅ correct way
          },
        },
      },
    });


    return { success: true, agentId: agent.id };
  } catch (err) {
    console.error("Error registering agent:", err);
    throw createError({ statusCode: 500, statusMessage: "Failed to register agent" });
  }
});
