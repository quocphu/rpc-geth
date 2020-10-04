var HOST = '';

var contract;
var ABI_MAP;
var currentAccount;
var contractAddress;
var metamaskAccounts;
// var func = {
//     'getBalance': 1,
//     'getTransaction':1,
//     'getTransactionReceipt':1,
//     'getBlock':2,
//     'sendRawTransaction':1,
//     'getTransactionCount':2
// }

$(document).ready(()=> {
    var testabi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    var testabi = [{"inputs":[{"internalType":"uint256","name":"blockReward","type":"uint256"},{"internalType":"address","name":"rewardTokenAddr","type":"address"},{"internalType":"address","name":"stakingTokenAddr","type":"address"},{"internalType":"address","name":"ownerAddr","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"constant":true,"inputs":[],"name":"base","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bkRpt1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bkRpt2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"latestDepositBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"latestWithdrawBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"oldRpt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"oldTotalStakingAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenPrev","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakingBalances","outputs":[{"internalType":"uint256","name":"num","type":"uint256"},{"internalType":"uint256","name":"dem","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stakingBlockTimeLife","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startStakingBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalRewardAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalStakingAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"addFund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"staker","type":"address"}],"name":"estimateReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBlockDistance","outputs":[{"internalType":"uint256","name":"blockDistance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentRpt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"staker","type":"address"}],"name":"stakeBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getDepositAge","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
    $('#txt-contract-abi').val(JSON.stringify(testabi));

    $('#btn-load').on('click', async function () {
        await initWeb3();
        await initContract(web3);
    });

    $('#btn-connect').on('click', function () {
        initWeb3();

        web3.eth.getBlockNumber(function (err, rs) {
            console.log('connected ', rs);
        })
    })
});

// MAIN
(async()=>{
    await connectMetamask();
})()

async function connectMetamask() {
    console.log('connect');
    return ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
  }
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      console.log('current addr ', currentAccount);
      // Do any other work!
    }
  }

function createForm(abi) {
    // <div class="form-group">
    //     <b>balance Of</b><br>
    //     <label for="11">address</label>
    //     <input type="text" class="form-control" id="11" value="localhost:8545">
    //     <button type="button" class="btn btn-default" id="btn-load">Run</button>
    // </div>

    var form = $(`<form class="form-horizontal">`)
    var group = $('<div class="form-group">');
    var name = `<b>${abi.name}</b><br>`;
    
    group.append($(name));
    for(var i = 0; i < abi.inputs.length; i++) {
        var inp = abi.inputs[i];
      
        var input = `<div class="form-group">
                    <label class="control-label col-sm-2" for="${abi.name}_${inp.name}">${inp.name}:</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" name="txt-${abi.name}" id="${abi.name}_${inp.name}">
                    </div>
                </div>
                `;
        
        group.append($(input));
    }

    if(abi.payable) {
        var input = `<div class="form-group">
                    <label class="control-label col-sm-2" for="${abi.name}-value">->Value<-:</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="txt-${abi.name}-value-eth">
                    </div>
                </div>
                `;
        group.append($(input));
    }

    var btnName = 'Run';
    if(abi.constant) {
        btnName = 'Read'
    } else {
        var input = `<div class="form-group">
                    <label class="control-label col-sm-2" for="txt-${abi.name}-caller">->Caller<-:</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="txt-${abi.name}-caller" value="${currentAccount}">
                    </div>
                </div>
                `;
        // var input = createAccountSelectElement(metamaskAccounts, `txt-${abi.name}-caller`)
        group.append($(input));
    }
    var button = `<div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                    <button type="button" class="btn btn-default" id="btn-${abi.name}" onclick="hello('${abi.name}')">${btnName}</button>
                    </div>
                </div>`
    
    group.append(button)

    form.append(group)
    form.append($('<hr>'))
    return form;
}

async function hello(name) {
    var abi = ABI_MAP[name];

    var inputs = $(`[name='txt-${name}'`)
    var inputData = [];
    for(var i = 0 ; i < inputs.length; i++) {
        var el = $(inputs[i]).val();
        inputData.push(el);
    }

    var data = ethAbi.encodeMethod.apply(null, [abi, inputData])
    // console.log(data); 
    var from = $(`#txt-${abi.name}-caller`).val();

    if(abi.constant) {
          // txHash is a hex string
          // As with any RPC call, it may throw an error
          
          const rsData = await ethereum.request({
            method: 'eth_call',
            params: [{
                from: from,
                to: contractAddress,
                data: data
            }],
          });

        //   var decoded = ethAbi.decodeMethod.apply(null, [abi, rsData])
        decodeData(abi, rsData)
    } else {
        var value = "0";
        if (abi.payable) {
            value = $(`#txt-${abi.name}-value-eth`).val()
        }
        console.log(value);
        var bValue  = new BigNumber(value).toString(16)
        console.log(bValue.toString(16));
          const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: from,
                to: contractAddress,
                data: data,
                value: '0x'+bValue
            }],
          });
          console.log(txHash);
    }
}

async function initWeb3() {
    // var host = $('#txt-ip').val();
    // web3 = new Web3(new Web3.providers.HttpProvider(host));

    const accounts = await ethereum.request({ method: 'eth_accounts' })
    metamaskAccounts = accounts;
}

async function initContract(web3) {
    var addr = $('#txt-contract-addr').val()
    var abis = JSON.parse($('#txt-contract-abi').val())
    // var instance = new web3.eth.Contract(abis, addr);

    ABI_MAP = {};

    contractAddress = addr;

    var funcDiv = $('#func');

    funcDiv.html('')
            

    for(var i = 0; i < abis.length; i++) {
        var abi = abis[i];
        if(abi.type == 'function') {
            ABI_MAP[abi.name] = abi;
            funcDiv.append(createForm(abi))
        }
    }

    // contract = instance;
    // return instance
}

// TODO: shouldn't loop over accounts many time
function createAccountSelectElement(accounts, id) {
    var option = ''
    for(var i = 0; i < accounts.length; i++) {
        option += `<option>${accounts[i]}</option>`
    }
    var el = `<div class="form-group">
    <label for="sel1">Select list:</label>
    <select class="form-control" id="${id}">
      ${option}
    </select>
  </div>`
  return el;
}

function createFunctionSignature(abi) {
    console.log(abi);
    var input =""
    if(abi.inputs.length > 0) {
        input = '(';
        for(var i = 0; i < abi.inputs.length; i++) {
            input += abi.inputs[i].type;
            if (i < abi.inputs.length - 1) {
                input += ','
            }
        }
        input += ')';
    }

    var rs = `${abi.name}${input}`;
    if(abi.outputs.length > 0) {
        var output = '(';
        for(var i = 0; i < abi.outputs.length; i++) {
            output += abi.outputs[i].type;
            if (i < abi.outputs.length - 1) {
                output += ','
            }
        }
        output += ')';
    

        rs = `${rs}:${output}`;
    }
    
    return rs;
    
}

function buf2hex(buffer) { // buffer is an ArrayBuffer
    return Array.prototype.map.call(buffer, x => ('00' + x.toString(16)).slice(-2)).join('');
  }

  function decodeData(abi, data) {
      console.log(abi);
      console.log(data);
    //   data = "0x0000000000000001ad7aed8b79ae351d89fc52c04c8bf4be6fb41841400000000000000000000000000000000000000000000000000000000000000000000000"
      var decoded = ethAbi.decodeMethod(abi, data)
      console.log(decoded);
      for(var i = 0; i < abi.outputs.length; i++) {
          var out = abi.outputs[i];
          if (out.type.startsWith('uint')) {
                if (out.name) {
                    console.log(out.name, ':', decoded[out.name].toString(10))
                } else {
                    
                    console.log(i, ':', decoded[i].toString(10))
                }
          } else {
            if (out.name) {
                console.log(out.name, ':', decoded[out.name].toString())
            } else {
                console.log(i, ':', decoded[i].toString())
            }
          }
      }
  }

//   var abi = {
//     "constant": true,
//     "inputs": [],
//     "name": "rewardPerToken",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "num",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "dem",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   }
//   decodeData(abi)