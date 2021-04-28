const api = `https://randomuser.me/api`;
const addUser = document.getElementById("user-btn");
// const mainApp = document.getElementById("app");
const userList = document.getElementById("userList");
const ascsortBtn= document.getElementById("sort-asc")
const dscsortBtn= document.getElementById("sort-dsc")

const searchInput = document.getElementById("search");
const appState = [];
class User{
  constructor(title,firstname,lastname,gender,email){
  this.name = `${title} ${firstname} ${lastname}`
  this.gender = gender
  this.email = email
  }
}
addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });

  const userJson = await userData.json();
  // console.log(userJson.results[0])
  const user = userJson.results[0];
  const classUser = new User(user.name.title, user.name.first, user.name.last, user.gender, user.email)
  appState.push(classUser);
  console.log(appState);
  domRenderer(appState);
});
const domRenderer = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userOb) => {
    const userEl = document.createElement("div");
    userEl.innerHTML = `<div>
 Name: ${userOb.name} 
  <ul>
  <li> Gender: ${userOb.gender}</li>
  <li>Email: ${userOb.email}</li>
  </ul>
  </div>`;
    userList.appendChild(userEl);
  });
};
searchInput.addEventListener("keyup",(e)=>{
  console.log(e,searchInput.value)
  const filteredState = appState.filter(user=>
  user.name.toLowerCase().includes(searchInput.value.toLowerCase())||
  user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
  user.email.toLowerCase().includes(searchInput.value.toLowerCase())


  
  );
  domRenderer(filteredState)
})
ascsortBtn.addEventListener("click", ()=>{
 const  appStateCopy= [...appState]
  appStateCopy.sort((a,b)=>a.name>b.name?1:-1)
  domRenderer(appStateCopy)
})
dscsortBtn.addEventListener("click", ()=>{
  const  appStateCopy= [...appState]
   appStateCopy.sort((a,b)=>a.name>b.name?-1:1)
   domRenderer(appStateCopy)
 })