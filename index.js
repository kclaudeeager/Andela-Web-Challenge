let index = 0;
document.addEventListener("DOMContentLoaded" , () => {
    let listDiv=document.getElementById("datalist");
    let myBtn= document.getElementById('myBtn')
    let close_modal = document.getElementById('close_modal')
    let form = document.getElementById('form')
    let close_details = document.getElementById('close_details')
    let modal = document.getElementById("details-model")
    let detailsDiv=document.getElementById("bookmark");
    let filter = document.getElementById('filter')
  
    let openModel=()=>{
        //alert("Model")
        let modal = document.getElementById("myModal");
        console.log("style", modal)
        modal.style.display = "block";
     
    }
   
// When the user clicks on <span> (x), close the modal
    let closeModel=()=>{
        console.log("Closing")
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    let closeDetailsModel=()=>{
        console.log("Closing")
        let modal = document.getElementById("details-model");
        modal.style.display = "none";
    }


    myBtn.onclick = () => {
        openModel()
    }
    close_modal.onclick = ()=> {
        closeModel()
    }
    form.onsubmit = (event)=>{
        saveBookMark(event)
    }
    close_details.onclick = ()=> {
        closeDetailsModel()
    }

    filter.onchange = (event) => {
        let category = event.target.value

        listDiv.childNodes.forEach(each => {
            if(each.id?.includes(category)){
                each.style.display = 'block'
            }
            else if(each && each.id) {
                each.style.display = 'none'
            }
        })
    }
// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        let modal1 = document.getElementById("myModal");
        let modal2= document.getElementById("details-model");
        if (event.target === modal1) {
            modal1.style.display = "none";
        }
        if(event.target===modal2 ){
            modal2.style.display="none"
        }
    }

    let saveBookMark=(event)=>{

        event.preventDefault();
        let category=document.getElementById("category").value;
        let title=document.getElementById("title").value;
        let description=document.getElementById('description').value;
        let link=document.getElementById("link").value;
        let author=document.getElementById("author").value
        let data={
            category:category,
            title:title,
            description:description,
            link:link,
            author:author
        }
        console.log("data: ",data)
        // 
        closeModel();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify(data);
        
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8080/bookmark", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
          addItem(data)
    }


    let viewBookmark=(bookmark)=>{
        console.log(bookmark)
        modal.style.display = "block";
        let temp='<div><p class="title" id="bookmark-title">Bookmark details</p><div class="container"><div class="items-1 item"> <div  class="view-item view-item-1">Category:</div><div class="view-item view-item-2">'+bookmark.category+'</div></div><div class="items-2 item"> <div class="view-item view-item-1">Title: </div><div class="view-item view-item-2">'+bookmark.title+'</div></div> <div class="items-3 item"><div class="view-item view-item-1">Description:</div><div  class="view-item view-item-2">'+bookmark.description+'</div></div><div class="items-4 item"><div class="view-item view-item-1">Link:</div><div class="book-link view-item view-item-2" id="book-link"><a href='+bookmark.link+'>'+bookmark.link+'</a></div></div></div></div>'
        detailsDiv.innerHTML=temp
    }
    function addItem(bookmark){
        let viewId='view-'+bookmark._id;
        let content = document.createElement('div');
        content.id = bookmark.id+bookmark.category+"unique"
        content.innerHTML =`<div class="elements"><div class="element-1 title element">${bookmark.title}</div> <div class=" element element-3 view" id="${viewId}"><img alt="" src="view.png"/></div><div class="element element-4 edit" id="edit-${bookmark.id}"><i class="fa-thin fa-pen-to-square"></i></div>`
        listDiv.appendChild(content)
        let viewbtn=document.getElementById(viewId)
        console.log("Hello this is the button: ",viewbtn)
        viewbtn.onclick=function(){
            viewBookmark(bookmark);
        }

    }
    const getBookmarks=()=>{
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:8080/bookmark", requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then(data=>{
                data.forEach(item=>{
                    console.log(item)
                    addItem(item)
                
                })
            })
            .catch(error => console.log('error', error));
    }
    getBookmarks()

})
// When the user clicks the button, open the modal 

