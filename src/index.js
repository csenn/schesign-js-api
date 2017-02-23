import * as utils from './utils';
import fetch from 'node-fetch';
fetch.Promise = require('bluebird');

// http://stackoverflow.com/questions/316781/how-to-build-query-string-with-javascript/34209399#34209399
function buildQueryParams(params) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

export const util = utils;

// export default class Api
//   constructor(token) {
//     this.token = token
//   }

// }

export function initApi(token) {
  return {
    design: {
      list: () => {

      },
      create: () => {

      },
      update: () => {

      },
    },
  };
}

export function fetchGraph(options) {
  if (!options.uid) {
    throw new Error('Must include a uid for the resource being fetched');
  }

  const query = buildQueryParams({
    format: 'json',
  });


  return fetch(`${options.uid}?${query}`)
    .then(res => {
      return res.json().then(json => {
        if (res.status >= 400) {
          throw new Error(`Error ${res.status}: ${json.message}`);
        }
        return json;
      });
    });
}

export function getDesigns(options) {
    // if (!options.uid) {
  //   throw new Error('Must include a uid for the resource being fetched');
  // }

  // const query = buildQueryParams({
  //   format: 'json',
  // });

  const headers = {
    // Authorization: 'Bearer 58ae4656a65d0ae4635fe86e.H3gaYaRo9CRIt4hLzYg1sgpAXUCG'
  };

  return fetch('http://localhost:9222/api/v1/design/list?user=u/csenn', { headers })
    .then(res => {
      return res.json().then(json => {
        if (res.status >= 400) {
          throw new Error(`${json.error.message}`);
        }
        return json;
      });
    });
}
