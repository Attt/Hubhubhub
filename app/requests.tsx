import axios, { AxiosResponse } from 'axios';
import { useToggleLoading } from './reducers';

export function getAPIUrl(name: string) {
    return localStorage.getItem('api-configs') ? JSON.parse(localStorage.getItem('api-configs') || '')[name] : '';
}

export function getAllAPIUrls() {
    return localStorage.getItem('api-configs') ? JSON.parse(localStorage.getItem('api-configs') || '{}') : {};
}

export function updateAPIUrl(name: string, url: string) {
    let config = JSON.parse(localStorage.getItem('api-configs') || '{}');
    config[name] = url;
    localStorage.setItem('api-configs', JSON.stringify(config));
    return config;
}

export function updateAllAPIUrls(configs: any) {
    localStorage.setItem('api-configs', JSON.stringify(configs));
}

async function request(url: string | undefined, method: string, data: any) {
    if (!url) return undefined
    if (method == 'get') {
        return await axios(
            url,
        );
    } else if (method == 'post') {
        return await axios.post(
            url,
            data ? data : {},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    } else if (method == 'patch') {
        return await axios.patch(
            url,
        );
    } else if (method == 'delete') {
        return await axios.delete(
            url,
        );
    }
}

function afterRequest(result: AxiosResponse<any, any> | undefined,
    afterSuccess: (data: any) => void,
    afterFailure: (result: any) => void) {

    // parse config field
    if (result && (result.data || typeof (result.data) == 'boolean')) {
        afterSuccess(result.data);
    } else {
        afterFailure(result);
    }
}

export async function GET(url: string | undefined,
    afterSuccess: (data: any) => void,
    afterFailure: (result: any) => void,
    toggleLoading?: (value: any) => void | undefined) {
    try {
        if(toggleLoading) toggleLoading({ type: 'show' })
        const result = await request(url, 'get', null)

        afterRequest(result, afterSuccess, afterFailure);
    } catch {
        afterFailure({});
    } finally {
        if(toggleLoading) toggleLoading({ type: 'hide' })
    }
}

export async function POST(url: string | undefined,
    data: any,
    afterSuccess: (data: any) => void,
    afterFailure: (result: any) => void,
    toggleLoading?: (value: any) => void) {
    try {
        if(toggleLoading) toggleLoading({ type: 'show' })
        const result = await request(url, 'post', data)

        afterRequest(result, afterSuccess, afterFailure);
    } catch {
        afterFailure({});
    } finally {
        if(toggleLoading) toggleLoading({ type: 'hide' })
    }
}

export async function PATCH(url: string | undefined,
    afterSuccess: (data: any) => void,
    afterFailure: (result: any) => void,
    toggleLoading?: (value: any) => void) {
    try {
        if(toggleLoading) toggleLoading({ type: 'show' })
        const result = await request(url, 'patch', null)

        afterRequest(result, afterSuccess, afterFailure);
    } catch {
        afterFailure({});
    } finally {
        if(toggleLoading) toggleLoading({ type: 'hide' })
    }
}

export async function DELETE(url: string | undefined,
    afterSuccess: (data: any) => void,
    afterFailure: (result: any) => void,
    toggleLoading?: (value: any) => void) {
    try {
        if(toggleLoading) toggleLoading({ type: 'show' })
        const result = await request(url, 'delete', null)

        afterRequest(result, afterSuccess, afterFailure);
    } catch {
        afterFailure({});
    } finally {
        if(toggleLoading) toggleLoading({ type: 'hide' })
    }
}