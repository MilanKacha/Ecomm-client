// // A mock function to mimic making an async request for data
export function fetchAllProdocts() {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/products");
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/products/" + id);
    const data = await res.json();
    resolve({ data });
  });
}

// // for product filter
export function fetchAllProdoctsByFilters(filter, sort, pagination, admin) {
  // filter:{"category":["smartphone", "leptops]"}
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}

  // TODO : on server we will support multi values in filter
  //TODO: server will filter deleted products in case of not-admin
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += "admin=true";
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    //tame page par click kari ne headers ma jovo to total counts X-total count ma male(header ma)
    const totalItems = await response.headers.get("X-Total-Count");
    // data ni anadar ak object banavyo tema product 6e plus total data pan 6e
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/categories");
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/brands");
    const data = await res.json();
    resolve({ data });
  });
}

//create product mate
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}

// for Update Product // copy of update cart
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    // update atle cart.js ma handel quality mathi item aave
    const res = await fetch("http://localhost:8080/products/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}
