



// For all the templates that will be interactively rendered onto the viewport
// Template generating functions
import events from './events'


const startTemplate = function () {
    return `<div class="header clearfix">
                <h1 class="text-muted">Bookmarker</h1>
            </div>
            <div class="jumbotron"> 
            
            <form>
                <button id="add" type="submit" class="btn btn-primary add-bookmark">Add +</button>
                <select id="filter" name="filter" class="btn btn-primary">
                    <option value="filter">Filter by</option>
                    <option value="1-star" id="1">1 Star</option>
                    <option value="2-star" id="2" >2 Star</option>
                    <option value="3-star" id="3" >3 Star</option>
                    <option value="4-star" id="4">4 Star</option>
                    <option value="5-star" id="5">5 Star</option>
                    <option value="unfiltered" id="unfiltered">All</option>
                </select>
            </form>
            <h2 class="display-3">Bookmark your favorite sites</h2>
            </div>
            
            `
}

const condensedTemplate = function (bookmark) {
    let renderRatingTemplate = "";
    
    if (bookmark.rating) {
    renderRatingTemplate = `<p>${bookmark.rating} star</p>`
    } else {
        renderRatingTemplate = `<p>Not rated</p>`
    }

   

    return  `<div class="row marketing">
    <div class="col-lg-12">
        <div id="bookmarks-added">
            <div class="well">
                <p><a href="" id="bookmark-title" class="btn btn-default">${bookmark.title}</a></p>
                ${renderRatingTemplate}
            </div>
        </div>
    </div>




</div>`
}


const expandedTemplate = function(bookmark){

    let renderDescTemplate = "";

    let renderRatingTemplate = "";
    
    if (bookmark.rating) {
    renderRatingTemplate = `<p>${bookmark.rating} star</p>`
    } else {
        renderRatingTemplate = `<p>Not rated</p>`
    }

    if (bookmark.desc) {
        renderDescTemplate = `<p>${bookmark.desc}</p>`
    } else {
        renderDescTemplate = `<p>Description not available</p>`
    }
    return `<div class="row marketing">
    <div class="col-lg-12">
        
            <div class="well" id="${bookmark.id}">
                <p>${bookmark.title}</p>
                ${renderRatingTemplate}
                ${renderDescTemplate}
                <a class="btn btn-default" target="_blank" href="${bookmark.url}">Visit</a>
                <a class="btn btn-danger" id="delete-bookmark"  href="#">Delete</a>
               
                
            </div>
        
    </div>`
}

const errorTemplate = function(errObj) {

    return `<h2 style="text-align:center; border: solid 2px red">${errObj.message}</h2>
            <form>
                <button id="add" type="submit" class="btn btn-primary add-bookmark">Try again</button>
            </form>`

}

const addBookmarkTemplate = function() {
    return ` <div class="header clearfix">
                <h3 class="text-muted">Bookmarker</h3>
            </div>

            <div class="jumbotron">
                
                <form>
                    <button id="add" type="submit" class="btn btn-primary">Add +</button>
                    <select id="filter" name="filter" class="btn btn-primary">
                        <option value="filter">Filter by</option>
                        <option value="1-star">1 Star</option>
                        <option value="2-star">2 Star</option>
                        <option value="3-star">3 Star</option>
                        <option value="4-star">4 Star</option>
                        <option value="5-star">5 Star</option>
                        <option value="unfiltered" >All</option>
                        
                    </select>
                    <div>
                        <label for="siteName">Site Name</label>
                        <br>
                        <input type="text" id="siteName"  required minlength="1"/>
                        <br>
                    </div>
                    <div>
                        <label for="siteURL">Site URL(must begin with http:// or https://)</label>
                        <br>
                        <input type="url" id="siteURL" minlength="5" required pattern="https://.*|http://.*" />
                        <br>
                    </div>
                    <div>
                        <label for="rating">Rating(optional 1-5)</label>
                        <br>
                        <input type="number" max="5" min="1" id="rating">
                        <br>
                    </div>
                    <div>
                        <label for="description">Description(optional)</label>
                        <br>
                        <input type="text" id="description" minlength="1" placeholder="Describe the site">
                        <br>
                    </div>
                    <br>
                    <button id="create-bookmark" type="submit" class="btn btn-primary">Submit</button>
                    <button type="submit" class="btn btn-primary" id="cancel">Cancel</button>
                
                </form>
            </div>`
}







// Rendering functions


let template = "";

const renderStartTemplate = function () {

    
    template = startTemplate();
    $('main').html(template);
    
}



const renderAddBookmarkTemplate = function() {
    template = addBookmarkTemplate();
    $('main').html(template);
}

const renderViewTemplate = function (bookmark) {

    if (!bookmark.expanding) {
        template = condensedTemplate(bookmark);
    } else {
        template = expandedTemplate(bookmark);
        
    }

    
    $('main').append(template);
}




const renderErrorTemplate = function (errObj) {
    template = errorTemplate(errObj)
    $('main').html(template)
}



export default {
    renderStartTemplate,
    renderAddBookmarkTemplate,
    renderViewTemplate,
    
    renderErrorTemplate
}