
var api = require('./dist');

const uid = api.util.createUid({
  ownerType: 'o',
  userOrOrg: 'examples',
  designName: 'example_online_shoe_store',
  versionLabel: '1.1.0'
});

var options = { uid };

console.log(uid);

// api.fetchGraph(options).then(json => {
//   console.log(json);
// }).catch(err => {
//   console.log(err);
// });


api.getDesigns().then(json => {
  console.log(json)
}).catch(err => {
  console.log(err);
});