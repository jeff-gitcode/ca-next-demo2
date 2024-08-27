// export const fetcher = (url: string) => fetch(url).then((res) => res.json());

import axios from "axios";

import { Todo } from "../domain/todo";

interface PutRequestArgs {
    requestBody: Todo;
    queryParams: {
        id: string
    };
};

//* Set Axios Base URL
axios.defaults.baseURL = process.env.PATH_API_URL;

//* Fetcher Function
export const fetcher = (url: string) => axios.get(url).then((res) => res.data);


export async function patchRequest(url: string, { arg }: { arg: PutRequestArgs }) {
    const result = await fetch(url + '/' + arg.queryParams.id, {
        method: 'PATCH',
        body: JSON.stringify(arg.requestBody)
    });

    const res = await result.json();
    return res;
}

export async function postRequest(url: string, { arg }: { arg: { requestBody: Todo } }) {
    const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(arg.requestBody)
    });

    const res = await result.json();
    return res;
}

export async function deleteRequest(url: string, { arg }: { arg: { queryParams: { id: string } } }) {
    const result = await fetch(url + '/' + arg.queryParams.id, {
        method: 'DELETE',
    });

    const res = await result.json();
    return res;
}