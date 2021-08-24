firebase.database().ref('todos').on('child_added',function(data){
     let list = document.createElement('li');
    let displayList = document.createTextNode(data.val().value); //replace getInput with data.va()
    list.appendChild(displayList);
    let showList = document.getElementById('list');
    showList.appendChild(list)
    let dltBtn = document.createElement('button');
    let dltBtnText = document.createTextNode('DELETE');
    dltBtn.appendChild(dltBtnText);
    dltBtn.setAttribute('onclick','delete2(this)');
    dltBtn.setAttribute('id',data.val().key);                    //giving id of key
    list.appendChild(dltBtn);
    let editBtn = document.createElement('button');
    let editBtnText = document.createTextNode('EDIT');
    editBtn.appendChild(editBtnText);
    editBtn.setAttribute('onclick','edit(this)'); 
    editBtn.setAttribute('id',data.val().key) //giving id of key
    list.appendChild(editBtn);

    
})


let add = ()=>{
    let getInput = document.getElementById('text');

    let key = firebase.database().ref('todos').push().key;

    let todo = {
        value : getInput.value,
        key : key
    }

firebase.database().ref('todos').child(key).set(todo);     

getInput.value = ""
}

let delete2= (e)=>{
      firebase.database().ref('todos').child(e.id).remove();
    e.parentNode.remove();
}

let edit = (e)=>{
     let edit = prompt('Please Enter The Changes',e.parentNode.firstChild.nodeValue);
    let editTodo = {
        value : edit,
        key : e.id
    }

    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = edit;
}

let delete1 = ()=>{
    firebase.database().ref('todos').remove();
   document.getElementById('list').innerHTML = ""
}


