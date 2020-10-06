

import renders from './template';
import events from './events.js';
import api from './api.js';
import store from './store.js'











function appLive() {
    

    
    renders.renderStartTemplate();
    
    events.addBookmark();
    
    events.createBookmark()
    
    api.getBookmark()
    .then(bookmarks => {
        bookmarks.forEach(bookmark => {
            bookmark.expanding = false;
            store.addBookmark(bookmark)
            renders.renderViewTemplate(bookmark)
        })
        
        
                
    })
    
    events.expandBookmark()
    
    events.delBookmark();
    events.filterFunc();
    events.cancelBookmarkAdd();
    
    
    
    
}




$(appLive);