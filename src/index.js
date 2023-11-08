// write your code here
// started at 11:10am ~ Finshed at 12:24pm : Approx 74 Minutes 

//add all images from api to ramen menu
const ramenUrl = "http://127.0.0.1:3000/ramens"

const ramenMenuContainer = document.getElementById('ramen-menu')
const ramenDetailContainer = document.getElementById('ramen-detail')
// console.log(ramenDetailContainer)

const ramenFormContainer = document.getElementById("new-ramen")
const ramenUpdateFormContainer = document.getElementById("edit-ramen")

let updateRamenId = ""



ramenFormContainer.addEventListener("submit", (el) => {
    // debugger

    el.preventDefault()
    let newRamen = {
        name: el.target.name.value,
        restaurant: el.target.restaurant.value,
        image: el.target.image.value,
        rating: el.target.rating.value,
        comment: el.target["new-comment"].value // due to new-comment as the id
    }
    fetch(ramenUrl, {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRamen)
    }).then(renderTopMenuRamen(newRamen))


})

ramenUpdateFormContainer.addEventListener("submit", (el) => {
    el.preventDefault()
    let updateRamen = {
        rating: el.target.rating.value,
        comment: el.target["new-comment"].value // due to new-comment as the id
    }
    //GOT here at the end of the 90 didn't finish patch
    console.log("Object to be updated")
    console.log(updateRamen)
    fetch(ramenUrl + "/" + updateRamenId, {
        method: "PATCH", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateRamen)
    }).then((res) => {
        console.log(res.status)
        fetch(ramenUrl + "/" + updateRamenId)
            .then(res => res.json())
            .then(data => {
                renderRamen(data)
                renderTopMenuRamen(data)
            })
    })



})



fetch(ramenUrl)
    .then(res => res.json())
    .then(data => {
        // console.log(data) //Array of objects 
        //stretch render first bowl

        renderRamen(data[0])
        data.forEach((ramen) => {
            // console.log(ramen) //indy objects 

            // Goals
            // 1) get images into ramenMenuContainer
            // 2) add a click event for every bowl
            renderTopMenuRamen(ramen)
        })
    })

function renderTopMenuRamen(ramen) {
    let ramenImgContainer = document.createElement('img')
    ramenImgContainer.src = ramen.image
    ramenImgContainer.height = 250
    ramenImgContainer.width = 250

    ramenMenuContainer.appendChild(ramenImgContainer)
    ramenImgContainer.addEventListener('click', () => {
        //We want to pass in the scoped ramen from the forEach!
        renderRamen(ramen)
        updateRamenId = ramen.id



    })
}

function renderRamen(ramen) {
    // debugger

    // Add details of clicked ramen to ramenDetailContainer
    console.log(ramen)

    let imgClickRamen = document.getElementsByClassName("detail-image")[0]
    //Tripped me up for around 7 minutes: needed to console log line 8 and see the difference
    imgClickRamen.src = ramen.image

    let nameClickRamen = document.getElementsByClassName("name")[0]
    nameClickRamen.textContent = ramen.name

    let restaurantClickRamen = document.getElementsByClassName("restaurant")[0]
    restaurantClickRamen.textContent = ramen.restaurant

    let ratingClickRamen = document.getElementById('rating-display')
    ratingClickRamen.textContent = ramen.rating

    let commentClickRamen = document.getElementById('comment-display')
    commentClickRamen.textContent = ramen.comment

}