const { get } = require('http');
const { MongoClient } = require('mongodb');
uri = process.env['mongo_db_uri']
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function checkAccountExistance (id, callback) {
    client.connect(err => {
        if (err) {
            return callback({"status":"error","msg":err});
        }
        const collection = client.db("MoneyData").collection("ClientData");
        // perform actions on the collection object
        collection.find({"_id":String(id)}).toArray(function(err, result) {
            if (err) {
                return callback({"status":"error","msg":err});
            }
            client.close();
            if (result.length > 0) {
                callback({"status":"success","result":true})
            } else {
                callback({"status":"success","result":false})
            }
        });
        
    });
}

function checkBalance(id, callback){
    client.connect(err => {
        if (err) {
            return callback({"status":"error","msg":err});
        }
        const collection = client.db("MoneyData").collection("ClientData");
        // perform actions on the collection object
        collection.find({"_id":String(id)}).toArray(function(err, result) {
            if (err) {
                return callback({"status":"error","msg":err});
            }
            client.close();
            if (result.length > 0) {
                return callback({"status":"success","amount":result[0]["money"]})
            } else {
                return callback({"status":"error","msg":"Account does not exist"})
            }
            
        });
        
    });
}

function changePt(id, amount, callback) {
    client.connect(err => {
        if (err) {
            console.log(err)
            return callback({"status":"error","msg":err});
        }
        const collection = client.db("MoneyData").collection("ClientData");
        // perform actions on the collection object
        collection.find({"_id":String(id)}).toArray(function(err, result) {
            if (err) {
                return callback({"status":"error","msg":err});
            }
            if (result.length > 0) {
                pre_money = result[0]["money"]
                if (pre_money < -amount) {
                    client.close();
                    return callback({"status":"error","msg":"Not enough pt"});
                }
                collection.updateOne({"_id":String(id)}, {$set: { "money" : pre_money + amount }}, (err, res) => {
                    if (err) {
                        client.close();
                        return callback({"status":"error","msg":err});
                    }
                    callback({"status":"success","amount":pre_money + amount});
                    //client.close();
                })  
            } else {
                callback({"status":"error","msg":"Account does not exist"})
                client.close();
            }
            
        });
    });
}

function addCard(user_id, card, callback) {
    client.connect(err => {
        if (err) {
            console.log(err)
        }
        const collection = client.db("PlayerInventory").collection("Normal-1");
        collection.find({_id:user_id}).toArray((err, res) => {
            if (res.length === 0) {
                collection.insertOne({_id:user_id, cards:card}, (err, res) => {
                    if(err) console.log(err);
                    client.close();
                    return callback()
                }) 
            } else {
                const result = res[0]
                const _card = [...result.cards, ...card]
                collection.updateOne({_id:user_id}, {$set: {cards:_card}}, function(err, r) {
                    if (err) console.log(err);   
                    client.close();
                    return callback()
                })
            }
            
        })
    })
}

function getInventory(user_id, callback) {
    client.connect(err => {
        const collection = client.db("PlayerInventory").collection("Normal-1");
        /*collection.find({_id:user_id}).toArray((err, res) => {
            if (err) {
                return callback({"status":"error", "msg":err})
            }
            client.close();
            return callback({"status":"success", "result":res[0]})
            
        })*/
        collection.findOne({"_id":user_id}, (err, res) => {
            client.close();
            if (res) {
              callback({cards:res.cards})
            } else {
              callback({cards:[]})
            }
            
        })
    })
}

function updateDrew(card_pool_id, user_id, cb) {
     client.connect(err => {
        const collection = client.db("PlayerInventory").collection("Drew");
        collection.findOne({"_id":card_pool_id}, (err, res) => {
          if (res) {
                let drew_user = res.drew_user
                drew_user.push(user_id)
                collection.updateOne({_id:card_pool_id}, {$set: {cards:drew_user}}, function(err, r) {
                if (err) console.log(err);   
                client.close();
                return cb()
            })
          } else {
                collection.insertOne({"_id":card_pool_id, "drew_user":[user_id]}, (err, res) => {
                    return cb()
                })
          }
        })
    })  
}

function getDrew(card_pool_id, cb) {
  client.connect(err => {
    const collection = client.db("PlayerInventory").collection("Drew");
    collection.findOne({"_id":card_pool_id}, (err, res) => {
        if (res) {
          cb(res)
        } else {
          cb({"drew_user":[]})
        }
    })
  })
}

function clearDrew(cb) {
    client.connect(err => {
    const collection = client.db("PlayerInventory").collection("Drew");
    collection.deleteMany({}, (err, res) => {
        cb()
    })
  })
}

module.exports = {checkAccountExistance, checkBalance, changePt, addCard, getInventory}
if (require.main === module) {
    getInventory("442138699493539840", (result) => {
        console.log(result)
    })
}