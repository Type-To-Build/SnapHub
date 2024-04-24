import Razorpay from 'razorpay'

export const capturePayment = async (body: any) => {
  var instance = new Razorpay({ key_id: 'rzp_test_0w2ZmCHslUrckh', key_secret: 'vXJqPfholZjQYo99PhbrT21H' })
  let response = await instance.payments.capture(body.razorpay_payment_id,body.amount * 100, 'INR')
  return response
};
