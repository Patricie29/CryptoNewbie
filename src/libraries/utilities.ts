import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// so we can merge all classes together

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))  //clsx allows us to write conditional classes
}


export const currencyFormat = (num: number) => {
    const formattedNum = '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return formattedNum.replace('.00', '');
}


export const numbersFormat = (num: number) => {
    const formattedNum = num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,');
    return formattedNum
}


