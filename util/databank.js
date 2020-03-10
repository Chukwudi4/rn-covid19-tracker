import { URL, config } from "../config/keys";

export async function fetchCases(country){
    const newCases = await fetch(`${URL}cases/confirmed`, config)
    const cases = await newCases.json();
    console.warn(cases);
}

export async function fetchDeaths() {
    const newCases = await fetch(`${URL}deaths`, config)
    const cases = await newCases.json();
    console.warn(cases);
}

export async function fetchReecovered() {
    const newCases = await fetch(`${URL}recovered`, config)
    const cases = await newCases.json();
    console.warn(cases);
}

export async function fetchAll() {
    const newCases = await fetch(`${URL}cases`, config)
    const cases = await newCases.json();
    console.warn(cases);
}

export async function fetchSuspected() {
    const newCases = await fetch(`${URL}cases/suspected`, config)
    const cases = await newCases.json();
    console.warn(cases);
}