export function getNav(resource) {
  return fetch(`http://localhost:3001/${resource}`).then((data) => data.json());
}
