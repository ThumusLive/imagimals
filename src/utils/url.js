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

function gets(url) {
  return async () => {
    const req = await fetch(url);
    const body = await req.json();
    return body instanceof Array
      ? body.map((a) => a?.image || a?.url || a?.link || a)
      : [body?.image || body?.url || body?.link || body];
  };
}

export { gets, cached };
