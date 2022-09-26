import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_DEV_URL || '';

export const getInstance = (CSRF: any) => {
    return axios.create({
        baseURL: 'http://localhost:8080', //BASE_URL,
        withCredentials: true,
        headers: {
            'x-csrf-token': CSRF
        }
    });
}

export const getInstanceTemp = () => {
    return axios.create({
        baseURL: 'http://localhost:8080', //BASE_URL,
        withCredentials: true
    });
}

export const getCredentialsInstance = () => {
    return axios.create({
        baseURL: "http://localhost:8001", //BASE_URL,
        withCredentials: true
    });
}

const handleResponse = ({ data, status }: any) => {
    if (data) {
        return { code: status, data: data.data };
    }
}

const handleErrorResponse = (res: any) => {
    if (res?.code) {
        return { code: res.code, error: res.message };
    } else {
        return { code: 500, error: "Network Error" };
    }
}

const getRequestWithCredentials = async (url: string) => {
    try {
        const res = await getCredentialsInstance().get(url);
        return handleResponse(res);
    } catch (error: any) {
        return handleErrorResponse(error)
    }
}

const temp = async (url: string) => {
    try {
        const res = await getInstanceTemp().get(url);
        return handleResponse(res);
    } catch (error: any) {
        return handleErrorResponse(error)
    }
}

const temp1 = async (url: string, data: any) => {
    try {
        const res = await getInstanceTemp().put(url, data);
        return handleResponse(res);
    } catch (error: any) {
        return handleErrorResponse(error)
    }
}


const postRequestWithCredentials = async (url: string, data: any) => {
    try {
        const res = await getCredentialsInstance().post(url, data);
        return handleResponse(res);
    } catch (error: any) {
        return handleErrorResponse(error)
    }
}

const postRequestWithCredentialsAndCSRF = async (url: string, data: any, csrf: any) => {
    try {
        const res = await getInstance(csrf).post(url, data);
        return handleResponse(res);
    } catch (error: any) {
        return handleErrorResponse(error?.response?.data?.error)
    }
}

export const signupUser = async (data: any, csrf: any) => {
    return await postRequestWithCredentialsAndCSRF('/auth/SignUp', data, csrf);
}

export const signInUser = async (data: any, csrf: any) => {
    return await postRequestWithCredentialsAndCSRF('/auth/login', data, csrf);
}

export const getUserBySessionToken = async () => {
    return await temp("/users/getUserBySessionToken/");
}

export const getCSRFToken = async () => {
    return await temp("/auth/csrf-token");
}

export const deleteCookies = async () => {
    return await getRequestWithCredentials("/auth/expire-cookies/");
}

export const gettingAllAssets = async () => {
    return await getRequestWithCredentials('/assets/');
}

export const expireCookies = async () => {
    return await temp('/auth/expire-cookies');
}

export const getAllCollections = async () => {
    return await getRequestWithCredentials('/contracts/getAllActiveContracts/');
}

export const getSpecificCollections = async (categoryId: number) => {
    return await getRequestWithCredentials(`/contracts/getContractsByCategoryId/${categoryId}`);
}

export const getNftsOfRelevantCollections = async (id: number, pageSize: number, pageNo: number) => {
    return await getRequestWithCredentials(`/assets/getByContract/${id}?size=${pageSize}&page=${pageNo}`);
}

export const getNftById = async (id: any) => {
    return await getRequestWithCredentials(`/assets/getById/${id}`);
}

export const guestLogin = async () => {
    return await getRequestWithCredentials(`/auth/generate-jwt/11/`);
}

export const getCategories = async () => {
    return await getRequestWithCredentials(`/categories/`);
}

export const getSearchFilterPanel = async (id: number) => {
    return await getRequestWithCredentials(`/contracts/getSearchFilterPanel/${id}`);
}

export const collectionFilter = async (data: any) => {
    return await postRequestWithCredentials(`/assets/filter`, data);
}

export const updateUser = async (data: any, id: number) => {
    return await temp1(`/users/updateUser/${id}?csrf-bypass=true`, data);
}

export const uploadImage = async (data: any) => {
    return await temp1(`/users/uploadImage/?csrf-bypass=true`, data);
}

export const getContract = async (contractId: number) => {
    return await getRequestWithCredentials(`/contracts/getContractById/${contractId}`);
}

export const getMetadataById = async (id: number, assetType: string) => {
    return await getRequestWithCredentials(`/assets/getMetadataById/${assetType}/${id}`);
}






