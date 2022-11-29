
// When the user clicks the button, open the modal 
const openModel=()=>{
    //alert("Model")
    const modal = document.getElementById("myModal");
    console.log("style", modal)
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
const closeModel=()=>{
    console.log("Closing")
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}
const closeDetailsModel=()=>{
    console.log("Closing")
    const modal = document.getElementById("details-model");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    const modal1 = document.getElementById("myModal");
    const modal2= document.getElementById("details-model");
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
  if(event.target==modal2 ){
    modal2.style.display="none"
  }
}
let bookmarks=[]
let viewIds=[]
let editIds=[]
const saveBookMark=(event)=>{
    
    event.preventDefault();
    const category=document.getElementById("category").value;
    const title=document.getElementById("title").value;
    const description=document.getElementById('description').value;
    const link=document.getElementById("link").value;
    const data={
        category:category,
        title:title,
        description:description,
        link:link
    }
    console.log("data: ",data)
    bookmarks.push(data)
    updateList(bookmarks)
    for(let i=0;i<bookmarks.length;i++){
        console.log("Book mark "+1);
        console.log(bookmarks[i])
       const viewId='view-'+i;
        let viewbtn=document.getElementById(viewId)
        console.log("Hello this is the button: ",viewbtn)
        viewbtn.onclick=function(){
           viewBookmark(bookmarks[i]);
        }
    }
let filliteredBookmarks=[]
let selected=null
const filliter=document.getElementById("filliter");
if(filliter!=null)
filliter.addEventListener('change',function handelChange(event){
    console.log("Change.......")
    filliteredBookmarks=[]
    console.log("Selected ",event.target.value)
    selected=filliter.options[filliter.selectedIndex].value;
    console.log("Found ",selected)
    for(let i=0;i<bookmarks.length;i++){

        if(selected!=null){
            if(bookmarks[i].category==selected){
                filliteredBookmarks.push(bookmarks[i])
            }
        }
    }
    updateList(filliteredBookmarks)
    for(let i=0;i<filliteredBookmarks.length;i++){

        console.log("Book mark "+1);
        console.log(filliteredBookmarks[i])
       const viewId='view-'+i;
        let viewbtn=document.getElementById(viewId)
        console.log("Hello this is the button: ",viewbtn)
        viewbtn.onclick=function(){
           viewBookmark(filliteredBookmarks[i]);
        }
    }
})
}


const viewBookmark=(bookmark)=>{
    const modal = document.getElementById("details-model");
    console.log("style", modal)
    modal.style.display = "block";
let temp='<div><p class="title" id="bookmark-title">Bookmark details</p><div class="container"><div class="items-1 item"> <div  class="view-item view-item-1">Category:</div><div class="view-item view-item-2">'+bookmark.category+'</div></div><div class="items-2 item"> <div class="view-item view-item-1">Title: </div><div class="view-item view-item-2">'+bookmark.title+'</div></div> <div class="items-3 item"><div class="view-item view-item-1">Description:</div><div  class="view-item view-item-2">'+bookmark.description+'</div></div><div class="items-4 item"><div class="view-item view-item-1">Link:</div><div class="book-link view-item view-item-2" id="book-link"><a href='+bookmark.link+'>'+bookmark.link+'</a></div></div></div></div>'
let detailsDiv=document.getElementById("bookmark");
detailsDiv.innerHTML=temp
}
const updateList=(bookmarks)=>{
console.log("Clicking......")
let listDiv=document.getElementById("datalist");
listDiv.innerHTML=null
listDiv.innerHTML+='<div class="main"><div class="filliter">filliter: <select name="select" id="filliter"><option id="" value="">Choose one</option><option id="life" value="Life">Life</option><option id="music" value="Music">Music</option><option id="history" value="History">History</option><option id="football" value="Football">Football</option><option id="movie" value="Movie">Movie</option></select></di>'
for(let index=0;index<bookmarks.length;index++){
    let bookmark=bookmarks[index]
    let category=bookmark.category
let classes="item-"+(index+1)+" elements"
console.log("Index",index)

console.log(listDiv)
const title=""+bookmark.title
const link=""+bookmark.link
console.log("title: ",title)


listDiv.innerHTML+='<div class='+classes+'><div class="elements"><div class="element-1 title element">'+title+'</div> <div class=" element element-3 view" id="view-'+index+'"><img src="view.png"/></div><div class="element element-4 edit" id="edit-'+index+'"><img src="edit.png"/></div></div>'
let id='view-'+index
viewIds.push(id)
editIds.push(id)

closeModel();

}
listDiv.innerHTML+='</div>'


}
