import { URL, config } from "../config/keys";

export async function fetchBrief() {
    
    try {
        const newCases = await fetch(`${URL}jhu-edu/brief`, config)
        const cases = await newCases.json();
        console.warn(cases);
        return cases;    
    } catch (error) {
        return {}
    }
}

export async function fetchLatest() {
    
    try {
        const newCases = await fetch(`${URL}jhu-edu/latest`, config)
        const cases = await newCases.json();
        //console.warn(cases);
        return cases;    
    } catch (error) {
        return [];
    }
}