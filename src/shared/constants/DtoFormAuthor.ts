

import { object, string, number} from 'yup';

export const CONSTDTOCREATEAUTHORSHEMA = object({
    name: string().required().max(12),
    age: number().required(),
    bibliography: string().required()
}) 

export const CONSTDTOUPDATEAUTHORSHEMA = object({
    name: string().max(120),
    age: number(),
    bibliography: string()
}) 