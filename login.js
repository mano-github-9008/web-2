

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
        alert("YOU LOGGED IN SUCCESSFULLY")
        window.location.href = "error404.html"
    }else{
        alert("You are not allowed !")
         window.location.href = "index.html"
    }
})

// function for checking username and password

function authentication(username,password){
    
    if(username === "dods@admin1"    && password === "admin@dodslab"){
        return true
    }else if (username === "mano"    && password === "mano@tamilguys"){
        return true
    }else if (username === "lathisha"    && password === "lathu@tamilguys"){
        return true
    }else if (username === "shalini"    && password === "shalu@tamilguys"){
        return true
    }else if (username === "shakti"    && password === "shakti@tamilguys"){
        return true
    }else if (username === "jaiganesh"    && password === "jai@tamilguys"){
        return true
    }else if (username === "vishwa"    && password === "vishwa@tamilguys"){
        return true
    }else if (username === "anusha"    && password === "anu@tamilguys"){
        return true
    }else if (username === "vinciya"    && password === "vinci@tamilguys"){
        return true
    }else if (username === "prakash"    && password === "jd@tamilguys"){
        return true
    }else if (username === "akash"    && password === "ak@tamilguys"){
        return true
    }
    else{
        return false
    }
}