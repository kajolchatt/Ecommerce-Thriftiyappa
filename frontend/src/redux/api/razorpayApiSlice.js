import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const razorpayApiSlice = createApi({
  reducerPath: "razorpayApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/payment" }),
  endpoints: (builder) => ({
    createRazorpayOrder: builder.mutation({
      query: (amount) => ({
        url: "/create-order",
        method: "POST",
        body: { amount },
      }),
    }),
  }),
});

export const { useCreateRazorpayOrderMutation } = razorpayApiSlice;
