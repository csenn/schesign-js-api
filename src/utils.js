import fetch from 'node-fetch';
fetch.Promise = require('bluebird');

const GET = 'GET';
const PUT = 'PUT';
const POST = 'POST';

// http://stackoverflow.com/questions/316781/how-to-build-query-string-with-javascript/34209399#34209399
function buildQueryParams(params) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

function getHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

function getUrl(path, opts) {
  const host = opts.host || 'https://www.schesign.com';
  if (path.indexOf('/') !== 0) {
    throw new Error(`path must have a leading slash: ${path}`);
  }
  return `${host}${path}`;
}


function _doFetch(method, token, path, json, opts) {
  const fetchOpts = { method, headers: getHeaders(token) };
  let url = getUrl(path, opts);

  if (json && (method === POST || method === PUT)) {
    fetchOpts.body = JSON.stringify(json);
  } else if (method === GET) {
    url += buildQueryParams(json);
  }

  return fetch(url, fetchOpts).then(res => {
    return res.json().then(resultJson => {
      if (res.status >= 400) {
        throw new Error(`${resultJson.error && resultJson.error.message}`);
      }
      return resultJson;
    });
  });
}

export function get(token, path, query, opts) {
  return _doFetch(GET, token, path, query, opts);
}

export function put(token, path, json, opts) {
  return _doFetch(PUT, token, path, json, opts);
}

export function post(token, path, json, opts) {
  return _doFetch(POST, token, path, json, opts);
}


// export function post(token, path, json, opts) {
//   return fetch(url, {
//     headers,
//     method: 'POST',
//     body: JSON.stringify(json),
//   })
//   .then(res => {
//     return res.json().then(resultJson => {
//       if (res.status >= 400) {
//         throw new Error(`${resultJson.error && resultJson.error.message}`);
//       }
//       return resultJson;
//     });
//   });
// }


// // export function fetchGraph(options) {
// //   if (!options.uid) {
// //     throw new Error('Must include a uid for the resource being fetched');
// //   }

// //   const query = buildQueryParams({
// //     format: 'json',
// //   });


// //   return fetch(`${options.uid}?${query}`)
// //     .then(res => {
// //       return res.json().then(json => {
// //         if (res.status >= 400) {
// //           throw new Error(`Error ${res.status}: ${json.message}`);
// //         }
// //         return json;
// //       });
// //     });
// // }

// // export function getDesigns(options) {
// //     // if (!options.uid) {
// //   //   throw new Error('Must include a uid for the resource being fetched');
// //   // }

// //   // const query = buildQueryParams({
// //   //   format: 'json',
// //   // });

// //   const headers = {
// //     // Authorization: 'Bearer 58ae4656a65d0ae4635fe86e.H3gaYaRo9CRIt4hLzYg1sgpAXUCG'
// //   };

// //   return fetch('http://localhost:9222/api/v1/design/list?user=u/csenn', { headers })
// //     .then(res => {
// //       return res.json().then(json => {
// //         if (res.status >= 400) {
// //           throw new Error(`${json.error.message}`);
// //         }
// //         return json;
// //       });
// //     });
// // }
