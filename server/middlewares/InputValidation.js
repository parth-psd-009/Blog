const { z } = require("zod");

const userRegistrationSchema = z
    .object({
        username: z.string().min(3).max(30),
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string(),
    })
    .refine((data) => /^[a-zA-Z0-9_-]+$/.test(data.username), {
        message: "Username can only contain letters, numbers, '-' and '_'",
        path: ["username"],
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// const blogInputSchema = z.object({

// });

const userLoginSchema = z
    .object({
        identity: z.string(), // Username or email
        password: z.string(),
    })
    .refine(
        (data) => {
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                data.identity
            );
            const isValidUsername = /^[a-zA-Z0-9_-]+$/.test(data.identity);
            return isValidEmail || isValidUsername;
        },
        {
            message:
                "Identity must be a valid email address or a valid username",
            path: ["identity"],
        }
    );

module.exports = {
    userRegistrationSchema,
    userLoginSchema,
};
