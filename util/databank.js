import { URL, config } from "../config/keys";

export async function fetchBrief() {
    const newCases = await fetch(`${URL}jhu-edu/brief`, config)
    const cases = await newCases.json();
    console.warn(cases);
    return cases;
}

export async function fetchBrief() {
    const newCases = await fetch(`${URL}jhu-edu/latest`, config)
    const cases = await newCases.json();
    console.warn(cases);
    return cases;
}