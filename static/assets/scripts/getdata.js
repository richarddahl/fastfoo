
export const getData = async function (url, formData) {
  /*
  Fetches data from the server and returns it or logs a warning
  */
  let response = await fetch(url, {method: "GET", body: formData}).then(function (response) {
    // The API call was successful!
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  }).then(function (data) {
    // This is the JSON from our response
    return data;
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
  return response
}// End of getData

export const stringifyFormData = function (formData) {
  let formDataString = "";
  for (const [key, value] of formData) {
    if (value) {
      formDataString = `${formDataString}${key}=${value}&`;
    }
  }
  return formDataString;
}