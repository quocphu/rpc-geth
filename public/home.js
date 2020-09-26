var HOST = '';
var web3;

var func = {
    'getBalance': 1,
    'getTransaction':1,
    'getTransactionReceipt':1,
    'getBlock':2,
    'sendRawTransaction':1,
    'getTransactionCount':2
}

$(document).ready(function () {
    var funcDiv = $('#func');

    for (var f in func) {
        var t = `<form class="form-inline">
                    <button type="button" class="btn btn-default" id="btn-${f}">${f}</button>
                    <div class="form-group">`

        for (var j = 0; j < func[f]; j++) {
            t += `<input type="text" class="form-control" id="param_${f}_${j}" value="">`
        }
        t += `</div></form>`;
        funcDiv.append(t);

        (function (f) {
            $(`#btn-${f}`).on('click', function () {
                console.log(`#btn_${f}`);
                var self = $(this);
                var params = [];
                for (var j = 0; j < func[f]; j++) {
                    var val = $(`#param_${f}_${j}`).val()
                    params[j] = val;
                }
                var cb = function (err, rs) {
                    if(err) {
                        console.log(err);
                    }
                    if (rs instanceof web3.BigNumber) {
                        console.log(rs.toString(10));
                    } else {
                        console.log(rs);
                    }
                    
                }
                params.push(cb)
                console.log(params);
                web3.eth[f].apply(null, params)

            });
        })(f);
    }

    $('#btn-connect').on('click', function () {
        var HOST = $('#ip').val();
        console.log('Host ', HOST);
        if (!HOST) {
            alert('Please fill-out host information')
        }

        if (HOST.indexOf('http') == -1) {
            HOST = 'http://' + HOST;
        }
        // if (typeof web3 !== 'undefined') {
        //     web3 = new Web3(web3.currentProvider);
        // } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider(HOST));
        // }
        web3.eth.getBlockNumber(function (err, rs) {
            console.log('connected ', rs);
        })
    })
})
