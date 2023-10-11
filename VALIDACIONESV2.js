$(document).ready(function () {
    if($("button:contains('Título')").length == 0) {//IF RUNNING
        var PBstop=false;
        var PBmax=0;
        $("input[name='micorreo']").addClass("verifyMe asMail");
        $("input[name='minumero']").addClass("verifyMe asInt ln05");
        $("input[name='micorreo2']").addClass("verifyMe asMail");

        $(".verifyMe.asInt").on("input", function () {
                this.value = this.value.replace(/[^0-9]/ig, "");
                if ($(this).val().length > PBmax) {   
                    $(this).val($(this).val().slice(0, PBmax));     
                }
                if ($(this).val().length == PBmax) { 
                    $( "#e_"+$(this).attr("name")).remove();
                    PBstop=false;
                }
        });
        $(".verifyMe.asInt").on("focus", function() {
            if($(this).hasClass('asInt')){
                checkInt($(this).attr("name"),"f");
            }
        });
        $(".verifyMe").keydown(function(event){            
            if(event.which==13){ 
                verifyAll($(this).attr('name'), "k");
            }
        });
        $(".verifyMe").on("blur", function() {
            //alert(0);
            verifyAll($(this).attr('name'), "b");
        });
        function verifyAll(pName, pEvent){
            tbox=$("input[name='"+pName+"']");
            
            if(tbox.hasClass('asInt')){
                checkInt(pName, pEvent);
            }
            if(tbox.hasClass('asMail')){
                checkMail(pName, pEvent);
            }
        }
        function checkInt(pName, pEvent){
                campo=$('input[name="'+pName+'"]');
                var cList = campo.attr("class");
                var cArr = cList.split(/\s+/);  //crea array de classes 
                cArr.forEach(function(valor, indice){
                    if(valor.substr(0,2)=='ln'){
                        PBmax=parseInt(valor.substr(valor.length-2, 2));//saca longitud
                        return;
                    }
                });   
                //alert(PBmax);        
                if (campo.val().length < PBmax){ 
                    PBstop=true;
                    if(pEvent!="f"){//no se dispara después al llamar desde .on(focus())
                        if ($("#e_"+pName).length==0){
                            showError(pName,"Longitud debe ser de "+PBmax);
                        }
                        campo.focus();
                    }
                } 
        }
        function checkMail(pName, pEvent){
            x=false;//r='';
            tbox = $('input[name="'+pName+'"]');
            t = tbox.val();            
            x=(/[a-z]{3,}[@][a-z]{3,}\.[a-z]{2,}/g).test(t);
            if(!x && ( t.length > 0)){
                PBstop=true;
                if(pEvent!="f"){//no se dispara después al llamar desde .on(focus())
                    if($("#e_"+pName).length==0){
                        //tbox.parents('div.campo').children(0).children(".control-label").append('<span id="e_'+pName+'" style="color:red;font-weight:bold">&nbspInválido</span>');
                        showError(pName,"Correo inválido");                    
                    }
                }
                tbox.focus();
            }else{            
                $( "#e_"+pName).remove();PBstop=false;
            }
        }
        function showError(pName, pMsg){
            $(".validacion").append("<div id=\"e_"+pName+"\" class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">"+pMsg+"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span>  </button></div>");
            window.scrollTo({top:0,left:0,behavior:"smooth"});
        }
    
        $('.ajaxForm').submit(function(e){
            var valide=false;
            $(".verifyMe").each(function(){
                //buscara al menos uno que este visible y si lo hay, validara mas abajo.
                //if($(this).parents('div.campo').attr("style")!="display: none;"){
                nombre=$(this).attr("name");                
                if($("#e_"+nombre).length > 0){                    
                    if($(this).hasClass("asInt")){
                        checkInt(nombre,"s");                        
                    }
                    if($(this).hasClass("asMail")){
                        checkMail(nombre,"s");                        
                    }
                    valide=true;
                }
            });        
            if(valide){
                if(PBstop){
                    e.preventDefault();
                    window.scrollTo({top:0,left:0,behavior:"smooth"});
                    return false;
                }
            }      
        });
    }//IF RUNNING
 });
