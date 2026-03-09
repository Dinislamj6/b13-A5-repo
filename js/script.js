const cardContainer = document.getElementById("cardContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const issusDetailsModal = document.getElementById("issus-details-modal")
const openCardContainer = document.getElementById("openCardContainer")
const closeCardContainer = document.getElementById("closeCardContainer")
let allData = []
let currentTab = "All"
const tabActive = ["bg-primary", "border-primary", "text-white"]
const tabInactive = ["bg-transparent", "text-slate-700", "border-state-200"]


const tabClosed = document.getElementById("tab-Closed")
const tabOpen = document.getElementById("tab-Open")
const tabAll = document.getElementById("tab-All")

// toggle function
function switchTab(tab) {

    const tabs = ["All", "Open", "Closed"]

    for (const t of tabs) {

        const tabBtn = document.getElementById("tab-" + t)

        if (t === tab) {
            tabBtn.classList.add(...tabActive)
            tabBtn.classList.remove(...tabInactive)
        }
        else {
            tabBtn.classList.remove(...tabActive)
            tabBtn.classList.add(...tabInactive)
        }

    }

    cardContainer.classList.add("hidden")
    openCardContainer.classList.add("hidden")
    closeCardContainer.classList.add("hidden")

    if (tab === "All") {
        cardContainer.classList.remove("hidden")
        loadIssue()
    }

    if (tab === "Open") {
        openCardContainer.classList.remove("hidden")
        displayOpenIssue()
    }

    if (tab === "Closed") {
        closeCardContainer.classList.remove("hidden")
        displayCloseIssue()
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

// all issue API function 
async function loadIssue() {
    showLoading()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    displayIssue(data)
    console.log(data)

    allData = data.data
    hideLoading()

}
loadIssue()


// all issue function
function displayIssue(data) {

    const allIssue = data.data.length
    const issuesCount = document.getElementById("issues-count")
    issuesCount.innerText = `${allIssue} Issues`


    cardContainer.innerHTML = "";
    data.data.forEach(issue => {

        const newCard = document.createElement("div")
        let borderColor = issue.status === "open" ? "bg-[#00A96E]" : "bg-[#A855F7]"
        newCard.innerHTML = `
         <div class="card w-90 bg-base-100 card-lg shadow-sm">
         <div class="h-1 ${borderColor} w-full"> </div>
                    <div class="card-body" onClick="openIssueModal(${issue.id})">
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


//modal function
async function openIssueModal(issueId) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
    const data = await res.json()

    const issueDetails = data.data
    issusDetailsModal.innerHTML = ``
    const newDetail = document.createElement('div')
    newDetail.innerHTML = ` 
         <div class="modal-box space-y-2">
               <h2 id="modal-titlle" class="font-bold text-2xl">${issueDetails.title}</h2>
               <div class="flex space-x-3">
                <button class="btn-sm bg-green-500 rounded-md px-2">${issueDetails.status}</button> <p>Opened by ${issueDetails.author}</p> <p >${issueDetails.createdAt}</p>
               </div>
               
               <div class="flex space-x-1">
               ${issueDetails.labels
            .map((singleLabel) => {
                return `<button class="btn rounded-full btn-sm btn-dash btn-error">${singleLabel}</button>`;
            })
            .join(" ")}
               </div>
               <p  class="text-[#64748B]">${issueDetails.description}</p>
                
               <div class="card w-96 bg-base-100 card-xs shadow-sm ">
               <div class="flex justify-between">
                     <div>
                        <p>Assignee:</p>
                     <h2 class="font-bold">${issueDetails.author}</h2>
                    </div>
                    <div>
                             <p>priority:</p>
                       <button class="btn bg-red-500">${issueDetails.priority}</button>
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



// search related function

document.getElementById("btn-search").addEventListener("click", () => {
    const input = document.getElementById("input-search")
    const searchValue = input.value.trim().toLowerCase()
    console.log(searchValue)

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            displayIssue(data)

        })



})



//open issue function

function displayOpenIssue() {

    const openIssusFilter = allData.filter(issue => issue.status.toLowerCase() == "open")
    const openIssue = openIssusFilter.length
    const issuesCount = document.getElementById("issues-count")
    issuesCount.innerText = `${openIssue} Issues`

    openCardContainer.innerHTML = ''
    openIssusFilter.forEach(openIssue => {
        let borderColor = openIssue.status === "open" ? "bg-[#00A96E]" : "bg-[#A855F7]"
        const openCard = document.createElement("div")
        openCard.innerHTML = ` 
     <div class="card  mx-auto bg-base-100 card-lg shadow-sm">
     <div class="h-1 ${borderColor} w-full"> </div>
                    <div class="card-body" onClick="openIssueModal(${openIssue.id})">
                              <div class="flex justify-between">
                            <img src="./assets/Open-Status.png" alt="">
                             <button onClick="openIssueModal(${openIssue.id})" class="btn btn-xs rounded-full">${openIssue.priority}</button>
                        </div>
                        <h2 class="font-bold">${openIssue.title}</h2>
                        <p class="text-[#64748B]">${openIssue.description}</p>
                          <div class="flex gap-3">
                           ${openIssue.labels
                .map((singleLabel) => {
                    return `<button class="btn rounded-full btn-sm btn-dash btn-error">${singleLabel}</button>`;
                })
                .join(" ")}
                      
                        </div>
              
                        <hr>
                           <div class="flex justify-between space-x-20">
                          <p class="text-[#64748B]">${openIssue.author}</p>
                        <p class="text-[#64748B]">${openIssue.createdAt}</p>
                       </div>
                       <div class="flex justify-between space-x-20">
                          <p class="text-[#64748B]">${openIssue.assignee}</p>
                        <p class="text-[#64748B]">${openIssue.updatedAt}</p>
                       </div>
                    </div>
                </div> 
        `
        openCardContainer.append(openCard)

    })
}


//close issue function

function displayCloseIssue() {

    const closeIssusFilter = allData.filter(issue => issue.status.toLowerCase() == "closed")
    const closeIssue = closeIssusFilter.length
    const issuesCount = document.getElementById("issues-count")
    issuesCount.innerHTML = `${closeIssue} Issues`



    closeCardContainer.innerHTML = ""
    closeIssusFilter.forEach(closeIssue => {
        let borderColor = closeIssue.status === "open" ? "bg-[#00A96E]" : "bg-[#A855F7]"
        const closeCard = document.createElement("div")
        closeCard.innerHTML = ` 
         <div class="card w-90 bg-base-100 card-lg shadow-sm">
         <div class="h-1 ${borderColor} w-full"> </div>
                    <div class="card-body" onClick="openIssueModal(${closeIssue.id})">
                              <div class="flex justify-between">
                            <img src="./assets/Open-Status.png" alt="">
                             <button onClick="openIssueModal(${closeIssue.id})" class="btn btn-xs rounded-full">${closeIssue.priority}</button>
                        </div>
                        <h2 class="font-bold">${closeIssue.title}</h2>
                        <p class="text-[#64748B]">${closeIssue.description}</p>
                                       <div class="flex gap-3">
                           ${closeIssue.labels
                .map((singleLabel) => {
                    return `<button class="btn rounded-full btn-sm btn-dash btn-error">${singleLabel}</button>`;
                })
                .join(" ")}
                      
                        </div>
              
                        <hr>
                
                           <div class="flex justify-between space-x-20">
                          <p class="text-[#64748B]">${closeIssue.author}</p>
                        <p class="text-[#64748B]">${closeIssue.createdAt}</p>
                       </div>
                       <div class="flex justify-between space-x-20">
                          <p class="text-[#64748B]">${closeIssue.assignee}</p>
                        <p class="text-[#64748B]">${closeIssue.updatedAt}</p>
                       </div>
                    </div>
                </div> 


        `
        closeCardContainer.append(closeCard)
    })

}






