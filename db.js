

var mongoose = require('mongoose');
mongoose.connect('mongodb://abc:12345@cluster0-shard-00-00-ezags.mongodb.net:27017,cluster0-shard-00-01-ezags.mongodb.net:27017,cluster0-shard-00-02-ezags.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true},(err)=>{
if(!err){
  console.log('connect')
}
else{
  console.log('error')
}
});
require(__dirname,'/employee-model')