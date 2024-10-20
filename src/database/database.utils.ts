import { differenceInMonths } from "date-fns";
import { MONTHS_IN_YEAR } from "./database.constants";

export const getAge = (birthDate?: Date): number | undefined => {
    if (birthDate) {
        const months = differenceInMonths(new Date(), birthDate);
        return Math.round(10 * months / MONTHS_IN_YEAR) / 10;
    }
    return undefined;
}