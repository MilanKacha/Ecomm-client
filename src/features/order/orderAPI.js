// copy of addtocart
export function createOrder(order) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}

// fetch product by filter copy
export function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders?" + queryString);
    const data = await response.json();
    //tame page par click kari ne headers ma jovo to total counts X-total count ma male(header ma)
    const totalOrders = await response.headers.get("X-Total-Count");
    // data ni anadar ak object banavyo tema product 6e plus total data pan 6e
    // products: orders & totalOrders:+totalOrders aapyu te payload ma pan aapvu jose // bane initial state pan 6e
    // totalOrders string ma male tene integer ma convert karva mate
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}
