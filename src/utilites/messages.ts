export let sendWelcomeEmail=`
<h1>thanks for your registration</h1>

`

export let sendActivationCode=(code :String)=>{
    return `
    <h1>your activation code is ${code}</h1>
    <h3>not that the given code expire after 1 hour</h3>
    
    `
}