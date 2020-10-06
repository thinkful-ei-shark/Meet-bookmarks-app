// For all the event listeners

import renders from './template'
import api from './api.js'
import store from './store.js'


const postRequest = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }

}


const addBookmark = function() {
    $('main').on('click', '.add-bookmark', function(e) {
        e.preventDefault();
        renders.renderAddBookmarkTemplate();
    } )
}


const createBookmark = function () {
    $('main').on('click', '#create-bookmark', function (e) {
        
        
        
        let siteName = $('#siteName').val()
        let url = $('#siteURL').val()
        let rating = $('#rating').val()
        let description = $('#description').val()

        if (siteName && url && url.length >= 5 && url.includes('http')) {
            e.preventDefault();
            let body = {}
        body.title = siteName
        body.url = url
        if (rating) {
            body.rating = rating
        }

        if (description) {
            body.desc = description
        }
        
        
        
        postRequest.body = JSON.stringify(body);
        
        api.apiFetchBookmark(api.targetURL, postRequest)
        .then(bookmark => {
            if (!bookmark.message) {
                bookmark.expanding = false;
            store.bookmarks.push(bookmark);
            
            
            renders.renderStartTemplate();
            
            store.bookmarks.forEach(bookmark => {
                
                renders.renderViewTemplate(bookmark);
                
            })
            } else {
                renders.renderErrorTemplate(bookmark)
            }
            
        })
        }
        
        
        
        
        
    })

    
}   
        

const expandBookmark = function () {
    $('main').on('click', '#bookmark-title', function (e) {
        e.preventDefault();
        let title = $(e.currentTarget).text()
        
        store.bookmarks.forEach(bookmark => {
            if (bookmark.title === title){
                bookmark.expanding = true;
            }
        })
        $('main').html('')
        renders.renderStartTemplate();
        store.bookmarks.forEach(bookmark => {
            renders.renderViewTemplate(bookmark)
        })
        store.bookmarks.forEach(bookmark => {
            if (bookmark.expanding) {
                bookmark.expanding = false;
            }
        })
        
        
    })
    
}



        



    
const delBookmark = function () {
    $('main').on('click', '#delete-bookmark', function (e) {
        e.preventDefault();
        
        let idBookmark = $(e.currentTarget).parent().attr('id')
        
        let newBookmarks = store.bookmarks.filter(bookmark => {
            return bookmark.id !== idBookmark
        })
        store.bookmarks = newBookmarks;
        
        api.apiFetchBookmark(`${api.targetURL}/${idBookmark}`, {method: 'DELETE'})
        renders.renderStartTemplate();
        store.bookmarks.forEach(bookmark => {
            renders.renderViewTemplate(bookmark);
        })
     
})

}


const filterFunc = function () {
    
    $('main').on('change', '#filter', function(e) {
        e.preventDefault();
        
        
        
        let filteredRating = $(this).val();
        
        renders.renderStartTemplate();
        store.bookmarks.forEach(bookmark => {
            if (bookmark.rating >= filteredRating[0]) {
                renders.renderViewTemplate(bookmark);
            } else if (filteredRating === "unfiltered") {
                renders.renderViewTemplate(bookmark);
            }
        })
        
    })

}


const cancelBookmarkAdd = function() {
    $('main').on('click', '#cancel', function(e) {
        e.preventDefault();
        
        renders.renderStartTemplate();
    api.getBookmark()
    .then(bookmarks => {
        bookmarks.forEach(bookmark => {
           
            renders.renderViewTemplate(bookmark)
        })
        
    })
})};


export default {
    addBookmark,
    createBookmark,
    
    expandBookmark,
    
    delBookmark,
    filterFunc,
    cancelBookmarkAdd,
    filterFunc
    
};