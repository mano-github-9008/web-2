document.oncontextmenu = () =>{
    alert("Viewing source page is not allowed")
    return false
}

document.onkeydown = e =>{
    if(e.key == "F12"){
        alert("Viewing source page is not allowed")
        return false
    }
    if(e.ctrlKey && e.key=="u"){
        alert("Don't try to view the source code")
        return false
    }

    if(e.ctrlKey && e.key=="c"){
        alert("Don't try to copy")
        return false
    }
}
const form = document.querySelector("form")

form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const username = form.username.value
    const password = form.password.value

    const authenticated = authentication(username,password)

    if(authenticated){
        window.location.href = "course.html"
    }else{
        alert("You are not allowed !")
         window.location.href = "index.html"
    }
})

// function for checking username and password

function authentication(username,password){
   var nameid = "admin" 
    if(username === nameid   && password === "admin"){
        return true
    }else{
        return false
    }
}