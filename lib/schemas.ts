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
    description: z.string().min(1, 'Description is required').max(200, 'Description must be 200 or less characters')


})