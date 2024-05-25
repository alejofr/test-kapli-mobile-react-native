import { useState, useMemo, useEffect } from 'react'
import { fetchApi, IApiError } from '../../config/kapliTestApi';

export const useFetchQueryApi = <T extends any, D = any, E = any>(endpoint: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dataResp, setDataResp] = useState<T | undefined>();
    const [error, setError] = useState<IApiError<E> | undefined>();

    useEffect(() => {
        if( endpoint ){
            requestFetch(endpoint);
        }
    }, [endpoint]);

   
    const requestFetch = async(url:string) => {
        setIsLoading(true);
        
        const { ok, data, err } = await fetchApi<T, undefined, E>(url, 'GET');

        if( ok && data ){
            setDataResp(data);
        }

        if( !ok && err ) {
            setError(err);
        }

        setIsLoading(false);
    }
    

    const data = useMemo(() => {
        return dataResp;
    }, [dataResp]);
    
    const onRefresh = (urlRe?: string) => {
        let url = endpoint;

        if(urlRe) url = urlRe;

        requestFetch(url);
    }

    return {
        isLoading,
        data,
        error,

        onRefresh

    }
}
