import moment from 'moment'
export const currencyFormatter = new Intl.NumberFormat('en-UK', {
  style: 'currency',
  currency: 'GBP',
});
export const createDateFromFormat = (dateString:any) => {
  try {
    const [day, month, year] = dateString?.split('/');
    return new Date(`${year}-${month}-${day}`);
  } catch (error) {
    return new Date();
    
  }

}
export const generateTimeArray = () => {
  const times = [];
  const startTime = moment('00:00', 'HH:mm'); // Assuming you start from midnight

  for (let i = 0; i < 24 * 4; i++) {
    times.push(startTime.format('HH:mm'));
    startTime.add(15, 'minutes');
  }

  return times;
};
export const obfuscateEmail = (email:string) =>{

  if(email.length ==0){
    return email
  }
  const atIndex = email.indexOf('@');
  if(atIndex ==-1){
    return email.slice(0, 3) + '*'.repeat(email?.length - 3)
  }
  const beforeAtIndex = email.substring(0, atIndex);
  const afterAtIndex = email.substring(atIndex);

  const maskedBeforeAtIndex = beforeAtIndex.slice(0, 3) + '*'.repeat(beforeAtIndex?.length - 3);
  
  return maskedBeforeAtIndex + afterAtIndex;
}
export const getDaysDifference = (startDateL:any, endDateL:any) =>{
  let startDate:any = startDateL ?  new Date(startDateL) : new Date()
  let endDate:any = endDateL ?  new Date(endDateL) : new Date()
  // Convert both dates to UTC to ensure consistent calculation
  const utcStartDate:any = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
  const utcEndDate :any = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));

  // Calculate the time difference in milliseconds
  const timeDifference = utcEndDate - utcStartDate;

  // Calculate the number of days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference || 1;
}
export const chunk = (arr: any, chunkSize: number) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};
export const kFormatter = (num: number) => {
  return Math.abs(num) > 999
    ? `${Math.sign(num) * +(Math.abs(num) / 1000).toFixed(1)}k`
    : `${Math.sign(num) * Math.abs(num)}`;
};

export const client = (
  endpoint: string,
  { body, ...customConfig }: any = {},
  user: any = {}
) => {
  const headers: any = { "Content-Type": "application/json" };

  if (user && user?.token) {
    headers.Authorization = `Bearer ${user.token}`;
  }
  const config: any = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }
  
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, config).then(
    async (res) => {
 
      const data = await res.json();
      
      if (res.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    }
  );
};
export const classNames = (...classes: any[]) =>{
  return classes.filter(Boolean).join(' ')
}
export const uploadImage = (
  endpoint: string,
  { body, file, ...customConfig }: any = {},
  user: any = {}
) => {
  const headers: any = {};
  if (user && user?.token) {
    headers.Authorization = `Bearer ${user.token}`;
  }

  const config = {
    method: "POST",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  const data = new FormData();
  data.append("file", file);
  for (let i in body) {
    data.append(i, body[i]);
  }
  config.body = data;

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, config).then((res) =>
    res.json()
  );
};
export const convertToHashtag = (str:string) =>{
  // Remove leading and trailing whitespaces
  str = str.trim();
  
  // Replace spaces with underscores
  str = str.replace(/\s+/g, '_');

  // Add "#" symbol at the beginning
  return '#' + str;
}