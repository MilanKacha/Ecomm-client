// Login & SignUp ma atli information male ke login thayo ke signUp thayu
// pan fetch log in user tanmne user ni bhadhi information aape matlab tena id thi tene fetch karva no
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    //aa rite user.id thi data fetch kari sakay json-server
    const res = await fetch("http://localhost:8080/orders/user/" + userId);
    const data = await res.json();
    resolve({ data });
  });
}

//upar na func ni copy 6e. je tamne userInfo aape id thi
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    //aa rite user.id thi data fetch kari sakay json-server
    const res = await fetch("http://localhost:8080/users/" + userId);
    const data = await res.json();
    resolve({ data });
  });
}

// updateUser
//Checkout page ma user ne order karti vakhte update karvu pade 6e
// front end ma checkout page na form mathi aavse update
export function updateUser(update) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}
