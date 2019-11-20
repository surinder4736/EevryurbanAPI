import { ENV } from './env';
export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';
//Web Application runing host configuration
export const hostName = isDebug ? 'http://localhost:3000' : 'Enter the Production server address';
// Rest Api runnig host configuration   
export const privateLocalAddress = isDebug ? 'http://localhost:5000' : 'Enter the Production server address';
console.log("Private Address:"+privateLocalAddress)

