const email = document.getElementById('email')
const searchBtn = document.getElementById('search')
const usersList = document.getElementById('users-list')

const initDetails = {
    method: 'get',
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
    mode: "cors"
}


searchBtn.addEventListener('click', async function handleFormSubmit(event) {
    const uri = `http://localhost:8000/search-user/${email.value}`;
    if(!email.value){
        event.preventDefault()
    }
    else{
        fetch(uri, initDetails)
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            console.log(response.headers.get("Content-Type"));
            return response.json();
        }
        )
        .then(myJson => {
            usersList.innerHTML = "";
            if(!myJson){
                $('#users-list').append('<h4>No user found</h4>')
            }
            else {
                myJson.forEach(ele => {
                    const user = `<div class="col-10 col-sm-8 col-md-6 col-lg-3   offset-sm-2 offset-md-0 my-2"  >
                     <div class="user">
                         <i class="fas fa-user p-3 d-inline-block" style="border: 2px solid black;">
                         </i>
                         <div class="d-inline-block u-info">
                             <a href="#" class="user-name">${ele.name}</a>
                             <a href="#" id="${ele._id}" class="user-chat">Chat with this user</a>
                         </div>
                        </div>
                    </div>`
                    $('#users-list').append(user)
                });
            }
        })
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });
    }  
})



