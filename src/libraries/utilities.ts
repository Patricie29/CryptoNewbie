import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// so we can merge all classes together

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))  //clsx allows us to write conditional classes
}