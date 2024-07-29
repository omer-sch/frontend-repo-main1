import apiClient from "./api-client";
export const uploadPhoto = async (photo) => {
    return new Promise((resolve, reject) => {
        console.log("Uploading photo.." + photo);
        const formData = new FormData();
        if (photo) {
            formData.append("file", photo);
            apiClient.post('file?file=123.jpeg', formData, {
                headers: {
                    'Content-Type': 'image/jpeg'
                }
            }).then(res => {
                console.log(res);
                resolve(res.data.url);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        }
    });
};
