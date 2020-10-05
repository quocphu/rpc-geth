var HOST = '';
var web3;
var contract;
var ABI_MAP;

// var func = {
//     'getBalance': 1,
//     'getTransaction':1,
//     'getTransactionReceipt':1,
//     'getBlock':2,
//     'sendRawTransaction':1,
//     'getTransactionCount':2
// }

$(document).ready(function () {
    var testabi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    $('#txt-contract-abi').val(JSON.stringify(testabi));

    $('#btn-load').on('click', function () {
        initWeb3();
        initContract(web3);
    });

    $('#btn-connect').on('click', function () {
        initWeb3();

        web3.eth.getBlockNumber(function (err, rs) {
            console.log('connected ', rs);
        })
    })
})


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

    if(abi.payable || abi.stateMutability == 'payable') {
        var input = `<div class="form-group">
                    <label class="control-label col-sm-2" for="${abi.name}-value">Value:</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="txt-${abi.name}-value">
                    </div>
                </div>
                `;
        group.append($(input));
    }

    var btnName = 'Run';
    if(abi.constant || abi.stateMutability == 'pure' || abi.stateMutability == 'view') {
        btnName = 'Read'
    } else {
        var input = `<div class="form-group">
                    <label class="control-label col-sm-2" for="txt-${abi.name}-caller">->Caller<-:</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="txt-${abi.name}-caller">
                    </div>
                </div>
                `;
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

    if(abi.constant || abi.stateMutability == 'pure' || abi.stateMutability == 'view') {
        var rs = await contract.methods[name].apply(null, inputData).call();
        // var rs = await contract.methods[name].apply(null, ["0x9317411384A505F01229859cD7e9EA76365ec7d0"]).call()
        console.log(rs);
    } else {
        var from = $(`#txt-${abi.name}-caller`).val();
        console.log(`#txt-${abi.name}-caller`);
        console.log(from);
        var rs = await contract.methods[name].apply(null, inputData).send({from: from, gas:'0x1E8480'});
        console.log(rs);
    }
}

function initWeb3() {
    var host = $('#txt-ip').val();
    web3 = new Web3(new Web3.providers.HttpProvider(host));
}

function initContract(web3) {
    var addr = $('#txt-contract-addr').val()
    var abis = JSON.parse($('#txt-contract-abi').val())
    var instance = new web3.eth.Contract(abis, addr);

    ABI_MAP = {};

    var funcDiv = $('#func');

    funcDiv.html('')
            

    for(var i = 0; i < abis.length; i++) {
        var abi = abis[i];
        if(abi.type == 'function') {
            ABI_MAP[abi.name] = abi;
            funcDiv.append(createForm(abi))
        }
    }

    contract = instance;
    return instance
}