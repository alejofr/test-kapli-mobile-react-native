export interface Author {
    author_id:    number;
    name:         string;
    age:          number;
    bibliography: string;
    created_at:   Date;
    updated_at:   Date;
}

export type AuthorFormData =  Omit<Author, 'author_id' | 'created_at' | 'updated_at'>;


export interface FormErrorValidationAuthor{
    name?:         string[];
    age?:          string[];
    bibliography?: string[];
}
