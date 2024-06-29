import {fetchBaseQuery,createApi} from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../features/constants"
const baseQuery=fetchBaseQuery({baseUrl:BASE_URL})

export const apiSlice=createApi({
    baseQuery,
    tagTypes:['Product','Order','User','Category'],
    endpoints:()=>({})
})
// fetchBaseQuery: Configures a base function to make HTTP requests to BASE_URL.
// createApi: Sets up an API client with various configurations.
// tagTypes: Declares types of entities managed by the API (optional).
// endpoints: Placeholder for defining specific API endpoints.