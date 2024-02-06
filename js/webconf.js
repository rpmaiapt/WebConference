window.onload = function(){
    const btnRegister = document.getElementById("btnRegister")
    btnRegister.addEventListener("click", function(){
        })

    swal({
        title: "Signup for Webconference",
        html:
        '<input id="txtName" class="swal2-input" placeholder="name">' + '<input id="txtEmail" class="swal2-input" placeholder="email">',
        showCancelButton: true,
        confirmButtonText: "SignUp",
        cancelButtonText: "Cancel",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            const name = document.getElementById('txtName').value
            const email = document.getElementById('txtEmail').value
            const url_base = "https://fcawebbook.herokuapp.com"
            return
            fetch (`${url_base}/conferences/1/participants/${email}`),{
                headers: {"Content-Type": "application/x-www-form-urlenconded"},
                method: "POST",
                body: `nomeparticipant=${name}`
            }
            .then (response =>{
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(error => {
                swal.showValidationError(`Request Error: ${error}`)
            });
        },
        allowOutsideClick: () => !swal.isLoading()
    }).then(result => {
        if(result.value){
            if(!result.value.err_code){
                swal({title: "SignUp done sucessfully!"})
            }
            else{
                swal({title: `${result.value.err_message}`})
            }
        }
    })

    (async () =>{
        const renderSpeakers = document.getElementById("renderSpeakers")
        let txtSpeakers = ""
        const response = await fetch (`${urlBase}/conferences/1/speakers`)
        const speakers = await response.json()

        for (const speaker of speakers){
            txtSpeakers += `
            <div class="col-sm-4">
                <div class="team-member>
                    <img class="mx-auto rounded-circle viewSpeaker" src="${speaker.foto}" id="${speaker.idSpeaker}" alt="">
                    <h4>${speaker.nome}</h4>
                    <p class="text-muted">${speaker.cargo}</p>
                    <ul class="list-inline social-buttons">`
                    if(speaker.twitter!==null){
                        txtSpeakers += `
                        <li class="list-inline-item">
                            <a href="${speaker.twitter}" target="_blank">
                                <i class="fab fa-twitter"></i>
                            </a>
                        </li>`
                    }
                    if(speaker.facebook!==null){
                        txtSpeakers += `
                        <li class="list-inline-item">
                            <a href="${speaker.facebook}" target="_blank">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                        </li>`
                    }
                    if(speaker.linkedin!==null){
                        txtSpeakers += `
                        <li class="list-inline-item">
                            <a href="${speaker.linkedin}" target="_blank">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </li>`
                    }
                    txtSpeakers += `
                        </ul>
                    </div>
                </div>`
                const btnView = document.getElementsByClassName("viewSpeaker")
                for (let i=0; i < btnView.length; i++){
                    btnView[i].addEventListener("click", () =>{
                        for(const speaker of speakers){
                            if(speaker.idSpeaker == btnView[i].getAttribute("id")){
                                swal({
                                    title:speaker.nome,
                                    text:speaker.bio,
                                    imageUrl:speaker.foto,
                                    imageWidth:400,
                                    imageHeight:400,
                                    imageAlt: 'Foto do Orador',
                                    animation: false
                                })
                            }
                        }
                    })
                }
        }
        renderSpeakers.innerHTML = txtSpeakers
    }) ()
}