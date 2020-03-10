const ACCESS_TOKEN =  "1cc7e414-8575-3a03-9ca7-7f705c98c62c"

export const URL = "https://apigw.nubentos.com:443/t/nubentos.com/ncovapi/1.0.0/"

export const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`
    },
}