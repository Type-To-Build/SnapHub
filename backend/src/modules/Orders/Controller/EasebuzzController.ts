import { sha512 } from 'js-sha512';
import { generateRandomNumbers } from '../../../utils';
import asyncHandler from "../../../middlewares/asyncHandler";

export const createPaymentToken = asyncHandler(async (req, res, next) => {

  let txnid = generateRandomNumbers(8)
  const encodedParams = new URLSearchParams();
  encodedParams.set('key', process.env.EASEBUZZ_KEY);
  encodedParams.set('txnid', txnid);
  encodedParams.set('amount', req.body.amount);
  encodedParams.set('productinfo', 'Room booking');
  encodedParams.set('firstname', req.user.fullName);
  encodedParams.set('phone', req.user.phone);
  encodedParams.set('email', req.user.email);
  encodedParams.set('surl', 'http://localhost:3000');
  encodedParams.set('furl', 'http://localhost:3000/error');
  encodedParams.set('hash', sha512(`${process.env.EASEBUZZ_KEY}|${txnid}|${req.body.amount}|Room booking|${req.user.fullName}|${req.user.email}|||||||||||${process.env.EASEBUZZ_SALT}`));

  // encodedParams.set('udf1', '');
  // encodedParams.set('udf2', '');
  // encodedParams.set('udf3', '');
  // encodedParams.set('udf4', '');
  // encodedParams.set('udf5', '');
  // encodedParams.set('udf6', '');
  // encodedParams.set('udf7', '');
  // encodedParams.set('address1', '');
  // encodedParams.set('address2', '');
  // encodedParams.set('city', '');
  // encodedParams.set('state', '');
  // encodedParams.set('country', '');
  // encodedParams.set('zipcode', '');
  // encodedParams.set('show_payment_mode', '');
  // encodedParams.set('split_payments', '');
  // encodedParams.set('request_flow', '');
  // encodedParams.set('sub_merchant_id', '');
  // encodedParams.set('payment_category', '');
  // encodedParams.set('account_no', '');
  // encodedParams.set('ifsc', '');

  const url = 'https://testpay.easebuzz.in/payment/initiateLink';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    },
    body: encodedParams
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);
    res.status(200).json({ success: true, data: data.data });


  } catch (error) {

    console.error(error);
    res.status(200).json({ success: false, data: null });
  }
});


export const checkpayment = async (body: any, user: any) => {


  const encodedParams = new URLSearchParams();
  encodedParams.set('key', process.env.EASEBUZZ_KEY);
  encodedParams.set('txnid', body.txn_order_id);
  encodedParams.set('amount', body.amount);
  encodedParams.set('email', user.email);
  encodedParams.set('phone', user.phone);



  encodedParams.set('hash', sha512(`${process.env.EASEBUZZ_KEY}|${body.txn_order_id}|${body.amount}|${user.email}|${user.phone}|${process.env.EASEBUZZ_SALT}`));


  console.log(`${process.env.EASEBUZZ_KEY}|${body.txn_order_id}|${body.amount}|${user.email}|${user.phone}|${process.env.EASEBUZZ_SALT}`, sha512(`${process.env.EASEBUZZ_KEY}|${body.txn_order_id}|${body.amount}|${user.email}|${user.phone}|${process.env.EASEBUZZ_SALT}`), '---');


  const url = 'https://testdashboard.easebuzz.in/transaction/v1/retrieve';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    },
    body: encodedParams
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);
    return data

  } catch (error) {

    console.error(error);
    return false
  }
};


export const sendPaymentLink = async (body:any,userDetail:any) => {

  let txnid = generateRandomNumbers(8)
 

  const url = 'https://testdashboard.easebuzz.in/easycollect/v1/create';
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },

    body: JSON.stringify({
      merchant_txn: txnid,
      "key": process.env.EASEBUZZ_KEY,
      "email": userDetail?.email,
      "name": userDetail?.fullName,
      "amount": body.amount,
      "phone": userDetail?.phone,
      hash: sha512(`${process.env.EASEBUZZ_KEY}|${txnid}|${userDetail?.fullName}|${userDetail?.email}|${userDetail?.phone}|${body.amount}|||||||${process.env.EASEBUZZ_SALT}`)

    })
  };


  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);
    return data

  } catch (error) {

    console.error(error);
    return false
  }
};