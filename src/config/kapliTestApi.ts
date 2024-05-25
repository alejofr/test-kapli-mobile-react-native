import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';


export const kapliTestApi = axios.create({
  baseURL: 'http://192.168.1.107:8000/api',
  headers:{
    'Content-Type': 'application/json'
  } 
});

export interface IApiError<T = any> {
  error:  T | string;
  code:   number;
}

export class ApiError<T = any> extends AxiosError<IApiError<T>>{}

export const fetchApi = async<T = any, D = any, E = any>(url: string, method: Method, config?: AxiosRequestConfig<D>) => {
  try {

    const { data } = await kapliTestApi<T>(url, {
      ...config,
      method
    });

    return {
      ok: true,
      data
    };

  } catch (error) {
    let err :  IApiError<E> = {
      error:  'Error 500, intente mas tarde',
      code: 500
    }

    
    
    if( error instanceof AxiosError ){
      const { response, message } = error as ApiError<E>;

      if( response ){
        err = response.data;
      }else{
        err.error = message
      }
        
    }


    return {
      ok: false,
      err
    };
  }
}

