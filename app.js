//query the dom
const ref= document.querySelector('.chat-list');
const newchat= document.querySelector('.new-chat');
const newname= document.querySelector('.new-name');
const updmsg= document.querySelector('.update-mssg');
const updroom= document.querySelector('.chat-rooms');


const username= localStorage.username ? localStorage.username : 'anon';
//instance of chatroom

const chatroom = new Chatroom('general', username);
const chatui= new chatUI(ref);

newchat.addEventListener('submit', e=>{
    e.preventDefault();
    const message= newchat.message.value.trim();
    chatroom.addChat(message)
     .then(()=> {newchat.reset()})
     .catch(err => {console.log(err)});
});


newname.addEventListener('submit', e=>{
    e.preventDefault();
    const usrname=  newname.name.value.trim();
    chatroom.updateuser(usrname);
    newname.reset();
    updmsg.innerHTML+= `you have been updated to ${usrname}`;

    setTimeout(()=>{ updmsg.innerHTML= ``}, 3000);


})

updroom.addEventListener('click', e=>{
    e.preventDefault();
    //console.log(e);
    if(e.target.tagName=== 'BUTTON'){
        chatui.clear();
        chatroom.updateroom(e.target.getAttribute('id'));
        chatroom.getchat(chat => { chatui.render(chat)});
    }
});

  
  chatroom.getchat(data=> {
      chatui.render(data);
  });
