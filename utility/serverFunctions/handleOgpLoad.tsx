"use server"
import ogs from 'open-graph-scraper';

export async function loadOgp(url: string) {
    const options = { url: url };
    const { result } = await ogs(options);
    return result;
}