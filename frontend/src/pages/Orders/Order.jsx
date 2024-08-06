// import { useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import Messsage from "../../components/Message";
// import Loader from "../../components/Loader";
// import {
//   useDeliverOrderMutation,
//   useGetOrderDetailsQuery,
//   useGetPaypalClientIdQuery,
//   usePayOrderMutation,
// } from "../../redux/api/orderApiSlice";

// const Order = () => {
//   const { id: orderId } = useParams();

//   const {
//     data: order,
//     refetch,
//     isLoading,
//     error,
//   } = useGetOrderDetailsQuery(orderId);

//   const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
//   const [deliverOrder, { isLoading: loadingDeliver }] =
//     useDeliverOrderMutation();
//   const { userInfo } = useSelector((state) => state.auth);

//   const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

//   const {
//     data: paypal,
//     isLoading: loadingPaPal,
//     error: errorPayPal,
//   } = useGetPaypalClientIdQuery();

//   useEffect(() => {
//     if (!errorPayPal && !loadingPaPal && paypal.clientId) {
//       const loadingPaPalScript = async () => {
//         paypalDispatch({
//           type: "resetOptions",
//           value: {
//             "client-id": paypal.clientId,
//             currency: "USD",
//           },
//         });
//         paypalDispatch({ type: "setLoadingStatus", value: "pending" });
//       };

//       if (order && !order.isPaid) {
//         if (!window.paypal) {
//           loadingPaPalScript();
//         }
//       }
//     }
//   }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

//   function onApprove(data, actions) {
//     return actions.order.capture().then(async function (details) {
//       try {
//         await payOrder({ orderId, details });
//         refetch();
//         toast.success("Order is paid");
//       } catch (error) {
//         toast.error(error?.data?.message || error.message);
//       }
//     });
//   }

//   function createOrder(data, actions) {
//     return actions.order
//       .create({
//         purchase_units: [{ amount: { value: order.totalPrice } }],
//       })
//       .then((orderID) => {
//         return orderID;
//       });
//   }

//   function onError(err) {
//     toast.error(err.message);
//   }

//   const deliverHandler = async () => {
//     await deliverOrder(orderId);
//     refetch();
//   };

//   return isLoading ? (
//     <Loader />
//   ) : error ? (
//     <Messsage variant="danger">{error.data.message}</Messsage>
//   ) : (
//     <div className="container flex flex-col ml-[10rem] md:flex-row text-white">
//       <div className="md:w-2/3 pr-4">
//         <div className="border gray-300 mt-5 pb-4 mb-5">
//           {order.orderItems.length === 0 ? (
//             <Messsage>Order is empty</Messsage>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-[80%]">
//                 <thead className="border-b-2">
//                   <tr>
//                     <th className="p-2">Image</th>
//                     <th className="p-2">Product</th>
//                     <th className="p-2 text-center">Quantity</th>
//                     <th className="p-2">Unit Price</th>
//                     <th className="p-2">Total</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {order.orderItems.map((item, index) => (
//                     <tr key={index}>
//                       <td className="p-2">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-16 h-16 object-cover"
//                         />
//                       </td>

//                       <td className="p-2">
//                         <Link to={`/product/${item.product}`}>{item.name}</Link>
//                       </td>

//                       <td className="p-2 text-center">{item.qty}</td>
//                       <td className="p-2 text-center">{item.price}</td>
//                       <td className="p-2 text-center">
//                         $ {(item.qty * item.price).toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="md:w-1/3">
//         <div className="mt-5 border-gray-300 pb-4 mb-4">
//           <h2 className="text-xl font-bold mb-2">Shipping</h2>
//           <p className="mb-4 mt-4">
//             <strong className="text-pink-500">Order:</strong> {order._id}
//           </p>

//           <p className="mb-4">
//             <strong className="text-pink-500">Name:</strong>{" "}
//             {order.user.username}
//           </p>

//           <p className="mb-4">
//             <strong className="text-pink-500">Email:</strong> {order.user.email}
//           </p>

//           <p className="mb-4">
//             <strong className="text-pink-500">Address:</strong>{" "}
//             {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
//             {order.shippingAddress.postalCode}, {order.shippingAddress.country}
//           </p>

//           <p className="mb-4">
//             <strong className="text-pink-500">Method:</strong>{" "}
//             {order.paymentMethod}
//           </p>

//           {order.isPaid ? (
//             <Messsage variant="success">Paid on {order.paidAt}</Messsage>
//           ) : (
//             <Messsage variant="danger">Not paid</Messsage>
//           )}
//         </div>

//         <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
//         <div className="flex justify-between mb-2">
//           <span>Items</span>
//           <span>$ {order.itemsPrice}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span>Shipping</span>
//           <span>$ {order.shippingPrice}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span>Tax</span>
//           <span>$ {order.taxPrice}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span>Total</span>
//           <span>$ {order.totalPrice}</span>
//         </div>

//         {!order.isPaid && (
//           <div>
//             {loadingPay && <Loader />}{" "}
//             {isPending ? (
//               <Loader />
//             ) : (
//               <div>
//                 <div>
//                   <PayPalButtons
//                     createOrder={createOrder}
//                     onApprove={onApprove}
//                     onError={onError}
//                   ></PayPalButtons>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {loadingDeliver && <Loader />}
//         {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
//           <div>
//             <button
//               type="button"
//               className="bg-pink-500 text-white w-full py-2"
//               onClick={deliverHandler}
//             >
//               Mark As Delivered
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Order;

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import { useCreateRazorpayOrderMutation } from "../../redux/api/razorpayApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();

  useEffect(() => {
    if (order && !order.isPaid) {
      loadRazorpay();
    }
  }, [order]);

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  //   const handlePayment = async () => {
  //     try {
  //       if (!order || !order.totalPrice) {
  //         throw new Error("Order or totalPrice is not defined");
  //       }

  //       const amount = order.totalPrice;
  //       const razorpayOrder = await createRazorpayOrder(amount).unwrap();
  //       console.log("Razorpay Order Response:", razorpayOrder); // Log full response

  //       if (!razorpayOrder || !razorpayOrder.amount) {
  //         throw new Error("Invalid Razorpay order response");
  //       }

  //       const options = {
  //         key: "rzp_test_VYAsBhGCqP0lu4",
  //         amount: razorpayOrder.amount * 100, // amount in paisa
  //         currency: razorpayOrder.currency,
  //         name: "Your Store",
  //         description: "Test Transaction",
  //         order_id: razorpayOrder.id,
  //         handler: async function (response) {
  //           const paymentResult = {
  //             razorpayPaymentId: response.razorpay_payment_id,
  //             razorpayOrderId: response.razorpay_order_id,
  //             razorpaySignature: response.razorpay_signature,
  //           };

  //           try {
  //             await payOrder({ orderId, details: paymentResult });
  //             refetch();
  //             toast.success("Order is paid");
  //           } catch (error) {
  //             toast.error(error?.data?.message || error.message);
  //           }
  //         },
  //         prefill: {
  //           name: order.user.username,
  //           email: order.user.email,
  //           contact: "9999999999",
  //         },
  //         notes: {
  //           address: order.shippingAddress.address,
  //         },
  //         theme: {
  //           color: "#3399cc",
  //         },
  //       };

  //       const paymentObject = new window.Razorpay(options);
  //       paymentObject.open();
  //     } catch (error) {
  //       console.error("Payment Handling Error:", error); // Log detailed error
  //       toast.error(error?.message || "Payment handling failed");
  //     }
  //   };

  //   const handlePayment = async () => {
  //     try {
  //       if (!order || !order.totalPrice) {
  //         throw new Error("Order or totalPrice is not defined");
  //       }

  //       const amount = order.totalPrice;
  //       const razorpayOrder = await createRazorpayOrder(amount).unwrap();
  //       console.log("Razorpay Order Response:", razorpayOrder); // Log full response

  //       if (!razorpayOrder || !razorpayOrder.amount) {
  //         throw new Error("Invalid Razorpay order response");
  //       }

  //       const options = {
  //         key: "rzp_test_VYAsBhGCqP0lu4",
  //         amount: razorpayOrder.amount * 100, // amount in paisa
  //         currency: razorpayOrder.currency,
  //         name: "Your Store",
  //         description: "Test Transaction",
  //         order_id: razorpayOrder.id,
  //         handler: async function (response) {
  //           const paymentResult = {
  //             razorpayPaymentId: response.razorpay_payment_id,
  //             razorpayOrderId: response.razorpay_order_id,
  //             razorpaySignature: response.razorpay_signature,
  //           };

  //           try {
  //             await payOrder({ orderId, details: paymentResult });
  //             refetch(); // Refresh the order details to reflect the updated status
  //             toast.success("Order is placed successfully");
  //           } catch (error) {
  //             toast.error(error?.data?.message || error.message);
  //           }
  //         },
  //         prefill: {
  //           name: order.user.username,
  //           email: order.user.email,
  //           contact: "9999999999",
  //         },
  //         notes: {
  //           address: order.shippingAddress.address,
  //         },
  //         theme: {
  //           color: "#3399cc",
  //         },
  //       };

  //       const paymentObject = new window.Razorpay(options);
  //       paymentObject.open();
  //     } catch (error) {
  //       console.error("Payment Handling Error:", error); // Log detailed error
  //       toast.error(error?.message || "Payment handling failed");
  //     }
  //   };

  //   const handlePayment = async () => {
  //     try {
  //       if (!order || !order.totalPrice) {
  //         throw new Error("Order or totalPrice is not defined");
  //       }

  //       const amount = order.totalPrice;
  //       const razorpayOrder = await createRazorpayOrder(amount).unwrap();
  //       console.log("Razorpay Order Response:", razorpayOrder); // Log full response

  //       if (!razorpayOrder || !razorpayOrder.amount) {
  //         throw new Error("Invalid Razorpay order response");
  //       }

  //       const options = {
  //         key: "rzp_test_VYAsBhGCqP0lu4",
  //         amount: razorpayOrder.amount * 100, // amount in paisa
  //         currency: razorpayOrder.currency,
  //         name: "Your Store",
  //         description: "Test Transaction",
  //         order_id: razorpayOrder.id,
  //         handler: async function (response) {
  //           const paymentResult = {
  //             razorpayPaymentId: response.razorpay_payment_id,
  //             razorpayOrderId: response.razorpay_order_id,
  //             razorpaySignature: response.razorpay_signature,
  //           };

  //           try {
  //             await payOrder({ orderId, details: paymentResult });
  //             refetch(); // Refresh the order details to reflect the updated status
  //             console.log("yippe")
  //             toast.success("Order is paid successfully");
  //           } catch (error) {
  //             toast.error(error?.data?.message || error.message);
  //           }
  //         },
  //         prefill: {
  //           name: order.user.username,
  //           email: order.user.email,
  //           contact: "9999999999",
  //         },
  //         notes: {
  //           address: order.shippingAddress.address,
  //         },
  //         theme: {
  //           color: "#3399cc",
  //         },
  //       };

  //       const paymentObject = new window.Razorpay(options);
  //       paymentObject.open();
  //     } catch (error) {
  //       console.error("Payment Handling Error:", error); // Log detailed error
  //       toast.error(error?.message || "Payment handling failed");
  //     }
  //   };

  const handlePayment = async () => {
    try {
      if (!order || !order.totalPrice) {
        throw new Error("Order or totalPrice is not defined");
      }

      const amount = order.totalPrice;
      const razorpayOrder = await createRazorpayOrder(amount).unwrap();
      console.log("Razorpay Order Response:", razorpayOrder);

      if (!razorpayOrder || !razorpayOrder.amount) {
        throw new Error("Invalid Razorpay order response");
      }

      const options = {
        key: "rzp_test_VYAsBhGCqP0lu4",
        amount: razorpayOrder.amount * 100,
        currency: razorpayOrder.currency,
        name: "Your Store",
        description: "Test Transaction",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          const paymentResult = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            payer: {
              email_address: order.user.email,
            },
          };

          try {
            await payOrder({
              orderId: order._id,
              details: paymentResult,
            });
            refetch();
            console.log("yippe");
            toast.success("Order is paid successfully");
          } catch (error) {
            console.error("Payment Error:", error);
            toast.error(error?.data?.message || error.message);
          }
        },
        prefill: {
          name: order.user.username,
          email: order.user.email,
          contact: "9999999999",
        },
        notes: {
          address: order.shippingAddress.address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment Handling Error:", error);
      toast.error(error?.message || "Payment handling failed");
    }
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      {error.data?.message || "An error occurred"}
    </Message>
  ) : (
    <div className="container flex flex-col ml-[10rem] md:flex-row text-white">
      <div className="md:w-2/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5">
          {order?.orderItems?.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.orderItems?.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>
                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">{item.price}</td>
                      <td className="p-2 text-center">
                        $ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-pink-500">Order:</strong> {order?._id}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Name:</strong>{" "}
            {order?.user?.username}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Email:</strong>{" "}
            {order?.user?.email}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Address:</strong>{" "}
            {order?.shippingAddress?.address}, {order?.shippingAddress?.city}{" "}
            {order?.shippingAddress?.postalCode},{" "}
            {order?.shippingAddress?.country}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Method:</strong>{" "}
            {order?.paymentMethod}
          </p>
          {order?.isPaid ? (
            <Message variant="success">Paid on {order.paidAt}</Message>
          ) : (
            <Message variant="danger">Not paid</Message>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
        <div className="flex flex-col mt-4">
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-300">Items:</span>
            <span>$ {order?.itemsPrice}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-300">Shipping:</span>
            <span>$ {order?.shippingPrice}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-300">Tax:</span>
            <span>$ {order?.taxPrice}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-300">Total:</span>
            <span>$ {order?.totalPrice}</span>
          </div>
        </div>

        {!order?.isPaid && (
          <div className="mt-3">
            <button
              onClick={handlePayment}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Pay with Razorpay
            </button>
            {loadingPay && <Loader />}
          </div>
        )}

        {loadingDeliver && <Loader />}

        {userInfo?.isAdmin && order?.isPaid && !order?.isDelivered && (
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mt-3"
            onClick={deliverHandler}
          >
            Mark As Delivered
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
