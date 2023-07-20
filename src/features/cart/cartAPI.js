// create product copy
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}

// copy of fetch all products ( cart in product user na id thi fetch karve mate)
export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await res.json();
    resolve({ data });
  });
}

///For change quantity in front end coad cart page copy of addto cart only link change
export function updateCart(update) {
  return new Promise(async (resolve) => {
    // update atle cart.js ma handel quality mathi item aave
    const res = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    // update atle cart ma handel quality mathi item aave
    const res = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    // delete thay pa6i pa6u to kaei aave nahi
    resolve({ data: { id: itemId } });
  });
}

// jyare order confirm thay tyare cart mathiproduct delet thay
// pela user na badh items get karvana pa6i delet karva na
// atle get all item & delete item vadi bane api use thaei jase
//Selu j 6e // promise ma j lakhvu pade async thunk ne promise ma j hoy te chale
export async function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    //data object ni andar tamne data male
    const items = response.data; // json ma te pote fetch.. convert kari didhi hase
    // ak ak item fetch karva ni
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
