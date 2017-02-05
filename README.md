## Intro

At their core, Schesign data designs are graphs. A JSON serialization of the graph can be accessed through the API. This library provides a wrapper to interact with the API and manage the graph.


npm install schesign-js-api


### Fetching a graph for a design

import api from 'schesign-js-api'

const uid = api.util.createUid({
  ownerType: 'o',
  userOrOrg: 'examples',
  designName: 'example_online_shoe_store',
  versionLabel: '1.1.0'
});

console.log(uid);
// https://www.schesign.com/o/examples/example_online_shoe_store/1.1.0

var options = { uid: uid };

api.fetchGraph(options).then(json => {
  console.log(json);
}).catch(err => {
  console.log(err);
});

