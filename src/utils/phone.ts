export interface SplitPhoneNumber {
  countryCode: string;
  areaCode: string;
  phoneNumber: string;
}

export function splitPhoneNumber(phoneNumber: string): SplitPhoneNumber {
  const phoneParts = phoneNumber.split(' ');

  let countryCode = '';
  let areaCode = '';
  let phoneNumberStr = '';

  if (phoneParts.length >= 2) {
    countryCode = phoneParts[0].replace(/\D/g, '');
    areaCode = phoneParts[1];
    phoneNumberStr = phoneParts.slice(2).join('');
  }

  return {
    countryCode,
    areaCode,
    phoneNumber: phoneNumberStr,
  };
}
