$(document).ready( ()=>{
    $('#btn-convert-abi-selector').on('click', ()=>{
        convertAbiToSelector()
    })
})

function convertAbiToSelector() {
    var abiText = $('#txtAbi').val()
    var jsonAbi = JSON.parse(abiText)

    var selector = ''
    if (jsonAbi.length) {
        
        for (var i = 0; i < jsonAbi.length; i++) {
            var item = jsonAbi[i]
            if(item.type!== "function") {
                continue
            }

            selector += (item.name +"=>"+ abiToSelector(item) +"\n")
            console.log(item.name +":"+ abiToSelector(item));
        }
        $('#txtSelector').val(selector)
        
    } else{
        alert("ABI must be a array")
    }
}

function abiToSelector(abi) {
    var name = abi.name;
    var types = []
    abi.inputs.map((item, idx)=>{
        types.push( item.type)
    })

    var id = ethereumjs.ABI.methodID(name, types)
    return id.toString('hex')
}