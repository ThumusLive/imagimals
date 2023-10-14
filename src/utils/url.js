/**
 * Save the content of the returned function to avoid multiple calls
 * @param {Function} func
 * @returns {string}
 */
function cached(func) {
  let i = 0;
  let limit = 1;
  let animals;
  return async function get() {
    if (i % limit === 0) {
      animals = await func();
      limit = animals.length;
      i = 0;
    }
    i++;
    return animals[i - 1];
  };
}

/**
 * Get images object from the website and then return them in a string format
 * @param {string} url
 * @returns {string[]}
 */
function gets(url) {
  return async () => {
    const req = await fetch(url);
    const body = await req.json();
    const thing = body instanceof Array
        ? body.map(
            (a) => a?.image
              || a?.url
              || (a?.link && typeof a.link !== "function") // Thanks js
              || a,
          )
        : [
            body?.image
              || body?.url
              || (body?.link && typeof body.link !== "function")
              || body,
          ];
    return thing;
  };
}

export { gets, cached };
