# Schesign Api Wrapper

At their core, Schesign data designs are graphs. A JSON serialization of the graph can be accessed through the API. This library provides a wrapper to interact with the API and manage the graphs.

This serialization is meant to be simple, expressive, and extensible. The versioned graph can be converted to various other formats through helper libraries.

* [schesign-js-json-schema](https://github.com/csenn/schesign-js-json-schema)
* [schesign-js-xml-schema](https://github.com/csenn/schesign-js-xml-schema)
* [schesign-js-sql](https://github.com/csenn/schesign-js-sql)

### Introduction

In the following examples, the first url leads to the data design through the UI. The next url (with ?format=json appended to the end) returns the graph in json form.

Example Online Store
* [https://www.schesign.com/o/examples/example_online_store/1.1.0](https://www.schesign.com/o/examples/example_online_store/1.1.0)

* [https://www.schesign.com/o/examples/example_online_store/1.1.0?format=json](https://www.schesign.com/o/examples/example_online_store/1.1.0?format=json)

Example Shoe Store with graph connecting 2 data designs
* [https://www.schesign.com/o/examples/example_online_shoe_store/1.1.0](https://www.schesign.com/o/examples/example_online_shoe_store/1.1.0)

* [https://www.schesign.com/o/examples/example_online_shoe_store/1.1.0?format=json](https://www.schesign.com/o/examples/example_online_shoe_store/1.1.0?format=json)


### Install
```
npm install schesign-js-api --save
```


## Examples
#### Fetching a graph for a design

```
import { fetchGraph, util } from 'schesign-js-api'

const uid = util.createUid({
  ownerType: 'o',
  userOrOrg: 'examples',
  designName: 'example_online_shoe_store',
  versionLabel: '1.1.0'
});

/*
  Creates the data design's uid with a convenience function
  https://www.schesign.com/o/examples/example_online_shoe_store/1.1.0
*/
console.log(uid);

var options = { uid: uid };

fetchGraph(options).then(json => {
  console.log(json);
}).catch(err => {
  console.log(err);
});
```

## Api

#### fetchGraph(options)
* uid - the unique id/url of the data design

#### utils.createUid(options)
* ownerType - can be either 'o' or 'u' for org or user
* userOrOrg - user or org depending on ownerType
* designName - the name of the design
* versionLabel - the version to be fetched

### Class
* uid (string) - a url that uniquely defines the class
* type (string) - 'Class'
* label (string) - Human readable label
* description (string, optional) - Description of the class
* subClassOf (string, optional) - A uid referencing a parent class this class inherits from
* excludeParentProperties (array, optional) - Array of property uids that should not be inherited by current class
* propertyRefs (array) - An array of propertyRef objects.
  * ref (string, required) - uid referencing a property
  * cardinality (object) - Describes the number of items that can exist.
    * minItems (integer, required) - A number >= 0
    * maxItems (integer, required) - A number >= 1
  * index (optional) - Whether or not the the property should be indexed when exported to a database design
  * unique (boolean, optional) - Whether or not the value should be unique when there is a collection of classes in a database

### Property
* uid (string) - a url that uniquely defines the class
* type (string) - 'Property'
* label (string) - Human readable label
* description (string, optional) - Description of the class
* range (object) - Information about the property type
