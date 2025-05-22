import { toast } from 'sonner';
import { ILoginProps } from '../types';

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (userData: ILoginProps) => {
    try {
        const response = await fetch(`${APIURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        
        const data = await response.json();
        
        if (response.ok) {
            toast.success('Login exitoso');
            return data;
        } else {
            toast.error(data?.message || 'Error en el login');
            return null;
        }
    } catch (error) {
        toast.error('Error en el fetching, login')
        throw new Error('Error en el fetching, login')
    }
}