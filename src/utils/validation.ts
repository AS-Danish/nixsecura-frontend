
export const sanitizeInput = (input: string): string => {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
    // Basic validation for 10-digit numbers, allowing optional +91 prefix
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, '').replace(/-/g, ''));
};

export const hasSqlInjection = (input: string): boolean => {
    const sqlPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b)|(['"])/i;
    return sqlPattern.test(input);
};

export interface ValidationError {
    field: string;
    message: string;
}

export const validateLoginForm = (email: string): ValidationError | null => {
    if (!isValidEmail(email)) {
        return { field: "email", message: "Please enter a valid email address." };
    }
    if (hasSqlInjection(email)) {
        return { field: "email", message: "Invalid characters detected." };
    }
    return null;
};

export const validateContactForm = (name: string, email: string, phone: string, message: string): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (name.length < 2) {
        errors.push({ field: "name", message: "Name must be at least 2 characters long." });
    }
    if (hasSqlInjection(name)) {
        errors.push({ field: "name", message: "Invalid characters in name." });
    }

    if (!isValidEmail(email)) {
        errors.push({ field: "email", message: "Please enter a valid email address." });
    }

    if (!isValidPhone(phone)) {
        errors.push({ field: "phone", message: "Please enter a valid 10-digit phone number." });
    }

    if (hasSqlInjection(message)) {
        errors.push({ field: "message", message: "Invalid characters in message." });
    }

    return errors;
};

export const validateCallbackForm = (name: string, phone: string): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (name.length < 2) {
        errors.push({ field: "name", message: "Name must be at least 2 characters long." });
    }
    if (hasSqlInjection(name)) {
        errors.push({ field: "name", message: "Invalid characters in name." });
    }

    if (!isValidPhone(phone)) {
        errors.push({ field: "phone", message: "Please enter a valid 10-digit phone number." });
    }

    return errors;
};
