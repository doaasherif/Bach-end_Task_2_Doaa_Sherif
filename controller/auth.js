let users = [
    {email: "test@gmail.com", password: "123"},
    {email: "test1@gmail.com", password: "1234"}
]

module.exports.login = function(req, res){
    for(let user of users){
        if(user.password == req.body.password && user.email == req.body.email){
            return res.json({"token": "12345"})
        }
    }
    return res.send('invalid credential')
}