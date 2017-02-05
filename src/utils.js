/* Speical types */
export const LINKED_CLASS = 'LinkedClass';
export const NESTED_OBJECT = 'NestedObject';

/* Main Primitives */
export const TEXT = 'Text';
export const NUMBER = 'Number';
export const BOOLEAN = 'Boolean';
export const DATE = 'Date';
export const ENUM = 'Enum';

export const TEXT_FORMAT_URL = 'Url';
export const TEXT_FORMAT_EMAIL = 'Email';
export const TEXT_FORMAT_HOSTNAME = 'Hostname';

export const DATE_SHORT = 'ShortDate';
export const DATE_DATETIME = 'DateTime';
export const DATE_TIME = 'Time';

export const NUMBER_INT = 'Int';
export const NUMBER_INT_8 = 'Int8';
export const NUMBER_INT_16 = 'Int16';
export const NUMBER_INT_32 = 'Int32';
export const NUMBER_INT_64 = 'Int64';

export function createUid(options) {
  const {
    ownerType,
    userOrOrg,
    designName,
    versionLabel,
    resourceType,
    classOrProperty,
  } = options;

  if (ownerType !== 'u' && ownerType !== 'o') {
    throw new Error('Bad owner type');
  }
  if (!userOrOrg) {
    throw new Error('User or org is required');
  }

  let path = `/${ownerType}/${userOrOrg}`;

  if (designName) {
    path += `/${designName}`;
    if (versionLabel) {
      path += `/${versionLabel}`;
      if (resourceType) {
        if (resourceType !== 'class' && resourceType !== 'property') {
          throw new Error('Bad resource type');
        }
        if (!classOrProperty) {
          throw new Error('Class or property required to get here');
        }
        path += `/${resourceType}/${classOrProperty}`;
      }
    }
  }

  return `https://www.schesign.com${path.toLowerCase()}`;
}
