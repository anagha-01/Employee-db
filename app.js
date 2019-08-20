const Express=require('express')
var bodyParser=require('body-parser')
const Mongoose=require('mongoose')
var request=require('request')
var app=new Express()
app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const EmployeeModel=Mongoose.model("employeedetails",{name:String,desg:String,sal:String})
Mongoose.connect("mongodb+srv://atlas:atlas@cluster0-eieo6.mongodb.net/test?retryWrites=true&w=majority")
app.get('/',(req,res)=>{
    res.render('home')
})

app.post('/readapi',(req,res)=>{
    console.log(req.body)
    var employee=new EmployeeModel(req.body)
    var result=employee.save((error,data)=>{
        if(erro){
            throw error
            res.send(error)
        }
        else{
            res.send(data)
        }
    })
    res.send(result)
})
app.get('/getdatas',(req,res)=>{
    result=EmployeeModel.find((error,data)=>{
        if(error)
        {
            throw error
        }
        else{
            res.send(data)
        }
    })
})
const getdataApi="http://localhost:3000/getdatas"

app.get('/disp',(req,res)=>{
    request(getdataApi,(error,response,body)=>{
        var data=JSON.parse(body)
        console.log(data)
        res.render('disp',{'data':data})
    })
})
app.get('/getEmployeeApi/:name',(req,res)=>{
    var Name=req.params.name
    EmployeeModel.find({name:Name},(error,data)=>{
        if(error){
            throw error
        }
        else{
            res.send(data)
        }
    })
})
app.get('/search',(req,res)=>{
    res.render('search')
})

app.get('/searchapi',(req,res)=>{
    var input=req.params.search
    res.send(input)
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running")
   
})