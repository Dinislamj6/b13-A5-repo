const cardContainer = document.getElementById("cardContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const issusDetailsModal = document.getElementById("issus-details-modal")
let currentTab = "All"
const tabActive = ["bg-primary" , "border-primary","text-white"]
const tabInactive = ["bg-transparent","text-slate-700" ,"border-state-200"]



// problem acha nicha id gula ta 
const tabClosed = document.getElementById("tab-Closed")
const tabOpen = document.getElementById("tab-Open")
const tabAll = document.getElementById("tab-All")

const allContainer = document.getElementById("all-container")
const openContainer = document.getElementById("open-container")
const closeContainer = document.getElementById("close-container")


function switchTab (tab) {
//    console.log(tab)
   const tabs = ["All" , "Open","Closed"]

   for (const t of tabs){
     const tabName = document.getElementById("tab-"+ t)
     if(t === tab){
        tabName.classList.remove(...tabInactive)
        tabName.classList.add(...tabActive)
     }else{
        tabName.classList.add(...tabInactive)
        tabName.classList.remove(...tabActive)
     }
   }
   
   
   

}
switchTab(currentTab)


function showLoading() {
    loadingSpinner.classList.remove("hidden")
    cardContainer.innerHTML = "";
}
function hideLoading() {
    loadingSpinner.classList.add("hidden")

}

async function loadIssue() {
    showLoading()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    displayIssue(data)
    hideLoading()
    
}
loadIssue()

function displayIssue(data) {
    cardContainer.innerHTML = "" ;

    data.data.forEach(issue => {
        const newCard = document.createElement("div")
        newCard.innerHTML = `
         <div class="card w-90 bg-base-100 card-lg shadow-sm">
                    <div class="card-body">
                              <div class="flex justify-between">
                            <img src="./assets/Open-Status.png" alt="">
                             <button onClick="openIssueModal(${issue.id})" class="btn btn-xs rounded-full">${issue.priority}</button>
                        </div>
                        <h2 class="font-bold">${issue.title}</h2>
                        <p class="text-[#64748B]">${issue.description}</p>
                        <div class="flex gap-3">
                           ${issue.labels
                .map((singleLabel) => {
                    return `<button class="btn rounded-full btn-sm btn-dash btn-error">${singleLabel}</button>`;
                })
                .join(" ")}
                      
                        </div>
                        <hr>
                           <div class="flex justify-between space-x-20">
                          <p class="text-[#64748B]">${issue.author}</p>
                        <p class="text-[#64748B]">${issue.createdAt}</p>
                       </div>
                       <div class="flex justify-between space-x-20">
                          <p class="text-[#64748B]">${issue.assignee}</p>
                        <p class="text-[#64748B]">${issue.updatedAt}</p>
                       </div>
                    </div>
                </div> 
        `
        cardContainer.append(newCard)
    })
}

 async function openIssueModal (issueId){
      const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
      const data = await res.json()

      const issueDetails = data.data
     issusDetailsModal.innerHTML = ``
       const newDetail = document.createElement('div')
       newDetail.innerHTML =` 
         <div class="modal-box space-y-2">
               <h2 id="modal-titlle" class="font-bold text-2xl">${issueDetails.title}</h2>
               <div class="flex space-x-3">
                <button class="btn-sm bg-green-500 rounded-md px-2">open</button> <p>Opened by Fahim Ahmed</p> <p >22/02/2026</p>
               </div>
               
               <div class="flex space-x-1">
                <button  class="btn btn-sm bg-red-300">bug</button>
                <button  class="btn btn-sm bg-yellow-200">help</button>
               </div>
               <p  class="text-[#64748B]">${issueDetails.description}</p>
                
               <div class="card w-96 bg-base-100 card-xs shadow-sm ">
               <div class="flex justify-between">
                     <div>
                        <p>piority</p>
                    <button class="btn bg-red-500">high</button>
                    </div>
                    <div>
                             <p>assinge</p>
                    <h2 class="font-bold">Fahim</h2>
                    </div>
               </div>
            
               </div>
            
                <div onClick=" issusDetailsModal.close()" class="modal-action">
                    <form method="dialog">
            
                        <button class="btn btn-primary">Close</button>
                    </form>
                </div>
            </div>
       `
         issusDetailsModal.append(newDetail)

     issusDetailsModal.showModal()
}
 


// search related kaj

document.getElementById("btn-search").addEventListener("click" , () =>{
    const input = document.getElementById("input-search")
    const searchValue = input.value.trim().toLowerCase()
    console.log(searchValue)

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res => res.json())
    .then(data => {
      displayIssue(data)
    
    })
     

    
})

