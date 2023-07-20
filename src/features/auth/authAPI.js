// We must pass userData to this function and after it will be created POST method
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}

//For LogIn Check user is available in data or not
export function checkUser(logInInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      // const email = logInInfo.email;
      // const password = logInInfo.password;
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(logInInfo),
        headers: { "content-type": "application/json" },
      });
      // meaning ke statuscoad 200 j 6e
      if (res.ok) {
        const data = await res.json();
        console.log({ data });
        resolve({ data });
      } else {
        const err = await res.json();
        reject(err);
      }
    } catch (err) {
      reject(err);
    }

    // if (data.length) {
    //   //for match password
    //   if (password === data[0].password) {
    //     resolve({ data: data[0] });
    //   } else {
    //     reject({ message: "wrong credentials" });
    //   }
    // } else {
    //   reject({ message: "user not found" });
    // }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: In Server we will remove user session Info
    resolve({ data: "success" });
  });
}
