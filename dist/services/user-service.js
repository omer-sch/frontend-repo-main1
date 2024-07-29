import apiClient from "./api-client";
export const registerUser = (user) => {
    return new Promise((resolve, reject) => {
        console.log('Register');
        console.log(user);
        apiClient.post("/auth/register", user).then(res => {
            console.log(res);
            resolve(res.data);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
};
export const GoogleSignin = (credentialResponse) => {
    return new Promise((resolve, reject) => {
        console.log('Google sign in');
        apiClient.post("/auth/google", credentialResponse).then((res) => {
            console.log(res);
            resolve(res.data);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
};
export const getUserData = (userId) => {
    return new Promise((resolve, reject) => {
        apiClient
            .get(`/user/${userId}`)
            .then((response) => {
            resolve(response.data);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
export const update = (user) => {
    return new Promise((resolve, reject) => {
        apiClient
            .put(`/user/${user._id}`, user)
            .then(() => {
            resolve();
        })
            .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
};
export const loginUser = (user) => {
    return new Promise((resolve, reject) => {
        console.log('Login');
        //const userData = { email, password };
        apiClient.post("/auth/login", user)
            .then(res => {
            console.log(res);
            resolve(res.data);
        })
            .catch(err => {
            console.log(err);
            const errorResponse = err.response;
            if (errorResponse && errorResponse.status === 401) {
                // Handle unauthorized (401) error here
                reject("Invalid credentials");
            }
            else {
                reject("An error occurred during login");
            }
        });
    });
};
export const logoutUser = () => {
    return new Promise((resolve, reject) => {
        apiClient.post("/auth/logout")
            .then(() => {
            resolve();
        })
            .catch(err => {
            console.log(err);
            reject(err);
        });
    });
};
