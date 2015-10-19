(function($) {
    function diff(base_data,new_data) {
        var result = {};
        for (i in base_data) {
            try {
                if (new_data == null || !(i in new_data)) {
                    if ($.type(base_data[i]) == 'object') {
                        result[i] = base_data[i];    
                    } else {
                        result[i] = "<em style='color:red'>[Removed] " + base_data[i]+"</em>";
                    }
                } else {
                    for (j in new_data) {
                        if (base_data == null || !(j in base_data)) {
                            if ($.type(base_data[i]) == 'object') {
                                result[j] = new_data[j];
                            } else {
                                result[j] = "<em style='color:green'>[Added] " + new_data[j]+"</em>";    
                            }
                        } else {
                            if (base_data[i] != new_data[i]) {
                                if ($.type(base_data[i]) == 'object') { 
                                    result[i] = diff(base_data[i],new_data[i]);
                                } else {
                                    result[i] = "<em style='color:blue'>[Changed] " + base_data[i] + " => " + new_data[i]+"</em>";
                                }
                            } else {
                                result[i] = base_data[i];    
                            }
                        }
                    }
                }
    } catch (e) {
                console.log("base_data=");
                console.log(base_data);
                console.log("new_data=");
                console.log(new_data);
                console.log("i="+i);
                console.log("j="+j);
                console.log("base_data["+i+"]="+base_data[i]);
                console.log("base_data["+j+"]="+base_data[j]);
                console.log("new_data["+i+"]="+new_data[i]);
                console.log("new_data["+j+"]="+new_data[j]);
            }
        }
        return result;
    }

    function formatJSON(data,tab_size) {
        tab_size = typeof tab_size !== 'undefined' ? tab_size : 4;
        var jsonString = "{\n";
        var spaces = "";
        for(x=0;x<tab_size;x++) {
            spaces += " ";
        }
        for (i in data) {
            //console.log($.type(data[i]));
            if ($.type(data[i]) == 'object') {
                jsonString += spaces + i + ":" + formatJSON(data[i],tab_size * 2) + ",\n"; 
            } else {
                jsonString += spaces + i + ":" + data[i] + ",\n"; 
            }
        }
        jsonString += "}";
        return jsonString;
    }

    $("#button").click(function(e){
        e.preventDefault();
        var base_data = $.parseJSON($("#base-json").val());
        var new_data  = $.parseJSON($("#new-json").val());

        var res = diff(base_data,new_data);
        $("#result").html(formatJSON(res));
        //console.log(res);
    });

})(jQuery);