import z from 'zod';


export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(5, 'Password must be 5 or more characters').max(30, 'Password must be 30 or less characters')
});

export const registerSchema = z.object({
    name: z.string().min(5, 'Full name must be 5 or more characters').max(30, 'Full name must be 30 or less characters'),
    email: z.email(),
    password: z.string().min(5, 'Password must be 5 or more characters').max(30, 'Password must be 30 or less characters')
});

export const businessSchema = z.object({
    name: z.string().min(3, 'Business name must be 3 or characters').max(20, 'Business name must be 20 or less characters'),
    email: z.string().min(1, 'Email is required'),
    phone: z.string(),
    description: z.string().min(1, 'Description is required').max(200, 'Description must be 200 or less characters'),



});

export const bookingSchema = z.object({
    customerName: z.string().min(1, "Full name is required"),
    customerEmail: z.email("Invalid email address"),
    customerPhone: z
        .string()
        .regex(
            /^(\+64|0)[2-9]\d{7,9}$/,
            "Enter a valid NZ phone number"
        )
        .optional()
})



export const availabilitySchema = z.object({
    days: z.array(
        z.object({
            daysOfWeek: z.number(),
            open: z.boolean(),
            startTime: z.string(),
            endTime: z.string(),
        })
    )
})


export const serviceSchema = z.object({
    name: z.string().min(3, 'Service name must be 3 or more characters').max(20, 'Service name must be 20 or less characters'),
    description: z.string().min(1, 'Description is required').max(200, 'Description must be 200 or less characters'),
    duration: z.number().min(1, 'Duration is required'),
    price: z
        .union([
            z.number().min(1, "Service price must be greater than 0"),
            z.literal(""),
        ])
        .optional(),

})