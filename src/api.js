


const targetURL = 'https://thinkful-list-api.herokuapp.com/meet/Bookmarks';






const apiFetchBookmark = function (...fetchRequests) {
    let error;
   return fetch(...fetchRequests)
    .then(res => {
        if(!res.ok) {
            error = {code: res.status};

            if (!res.headers.get('Content-Type').includes('json')) {
                error.message = res.statusText;
                return Promise.reject(error);
            }
        }
        return res.json();
    })
    .then(data => data)
    .catch(error =>  error)
}

// GET method
const getBookmark = function () {
    return apiFetchBookmark(targetURL);
}


// POST method
const postBookmark = function (url, postRequest) {
    apiFetchBookmark(url, postRequest);
    
} 


// PATCH method
const updateBookmark = function (url, patchRequest) {
    apiFetchBookmark(url, patchRequest);
}


//DELETE method
const deleteBookmark = function (url, delRequest) {
    apiFetchBookmark(url, delRequest);

}





export default {
   targetURL,
   getBookmark,
   postBookmark,
   apiFetchBookmark,
   deleteBookmark
   
}