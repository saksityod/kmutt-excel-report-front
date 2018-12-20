/* for portlet*/
var tokenID= [];
var is_hr = [];

var is_all_employee;
var cMain_emp_id;
var cMain_emp_name;
var cMain_position_id;
var cMain_position_name;
var cMain_level_id;

const setModalPopup = ['static','false'];

const setPopoverDisplay = {
		delay : {
			hide : 100
		}
};

var alertFn = function(classAlert, head, txtSt) {
	var html = "";
	html += '<div class="alert ' + classAlert + '" style="margin-bottom: 0px;" id="alertClose">';
	html += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
	html += '<strong >' + head + '</strong> ' + txtSt + '';
	html += '</div>';
	$("#slide_status").html(html);
	
	if(classAlert == "alert-error" || classAlert == ""){
		$("#slide_status").slideDown("slow");
		
	}else{
		$("#slide_status").slideDown("slow");
		setTimeout(function(){
			$("#slide_status").slideUp();
		},4000);
	}
}

function getLogin (){
	var	user_portlet  = $("#user_portlet").val();
	var	url_portlet   = $("#url_portlet").val();
	var	plid_portlet = $("#plid_portlet").val();
	var password_portlet = $('#pass_portlet').val()
	
	if(user_portlet == "null"  || password_portlet  == "null"){
		$("#page_report_hidden").hide();
		return false;
	}
	else{
		$("#page_report_hidden").show();
		return true;
	}
}


function Comma(Num) { //function to add commas to textboxes
    Num += '';
    Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    x = Num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}

function getParamValue(paramName)
{
    var url = window.location.search.substring(1); //get rid of "?" in querystring
    var qArray = url.split('&'); //get key-value pairs
    for (var i = 0; i < qArray.length; i++) 
    {
        var pArr = qArray[i].split('='); //split key and value
        if (pArr[0] == paramName) 
            return pArr[1]; //return value
    }
}

jQuery.fn.ForceNumericOnly =
	function()
	{
	    return this.each(function()
	    {
	        $(this).keydown(function(e)
	        {
	            var key = e.charCode || e.keyCode || 0;
	            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
	            // home, end, period, and numpad decimal
	            return (
	                key == 8 || 
	                key == 9 ||
	                key == 13 ||
	                key == 46 ||
	                key == 110 ||
	                key == 190 ||
	                (key >= 35 && key <= 40) ||
	                (key >= 48 && key <= 57) ||
	                (key >= 96 && key <= 105));
	        });
	    });
	};


function IsNumeric(sText,obj){

	var ValidChars = "0123456789.";
	var IsNumber=true;
	var Char;
		for (i = 0; i < sText.length && IsNumber == true; i++) { 
			Char = sText.charAt(i); 
			if (ValidChars.indexOf(Char) == -1) {
				 IsNumber = false;
			}
		}
		if(IsNumber==false){
			
			obj.value=sText.substr(0,sText.length-1);
		}
		
		return IsNumber;
	
		
  }
function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
function removeComma(nStr){
	nStr = (nStr == undefined || nStr == null || nStr=="" ? "0" : nStr);
	return parseFloat(nStr.replace(/,/g, ''))
}

function clearParamSearch(data) {
	var i;
	var dataLength = data.length;
	for (i = 0; i < dataLength; i++) {
		$(""+data[i]['id']+"").val("");
	}
}

function setParamSearch(data) {
	//console.log(data,'setParamSearch');
	var i;
	var dataLength = data.length;
	if(is_all_employee==0) {
		for (i = 0; i < dataLength; i++) {
			$(""+data[i]['id']+"").val(data[i]['val']);
		}
	}
}

var flashSLideUp=function(){
	
	$("#slide_status").slideUp();
	
}

var flashSlideInModalSlideUp=function(){
	
	$(".information").slideUp();
	
	
}
$(document).on("click","#btnCloseSlide",function(){
	flashSLideUp();
});
$(document).on("click",".btnModalClose",function(){
	flashSlideInModalSlideUp();
});

var callFlashSlide = function(text,flashType){
	if(flashType=="error"){
		
		$("#slide_status_area").html(text);
		$("#slide_status").slideDown("slow");
		
	}else{
		$("#slide_status_area").html(text);
		$("#slide_status").slideDown("slow");
		setTimeout(function(){
			$("#slide_status").slideUp();
		},3000);
	}
}
var callFlashSlideInModal =function(text,id,flashType){
	var btnClose="<div class=\"btnModalClose\">×</div>";
	
	if(flashType=="error"){
		
		if(id!=undefined){
			$(id).html(btnClose+""+text).show();
			
		}else{
			
			$("#information").html(btnClose+""+text).show();
		}
		
	}else{
		
		if(id!=undefined){
			$(id).html(btnClose+""+text).show();
		}else{
			$("#information").html(btnClose+""+text).show();
		}
		setTimeout(function(){
			if(id!=undefined){
				$(id).hide("slow");
			}else{
				$("#information").hide("slow");
			}
		},3000);
	}
	

}

//check value not null
var notNullFn = function(data){
	var dataNotNull="";
	if((data == '' || data == undefined || data == 'undefined' || data == null ||data == 'null')){
		dataNotNull="0.00";
	}else{
		dataNotNull=data;
	}
	return parseFloat(dataNotNull).toFixed(2);
}
//check value not null
var notNullTextFn = function(data){
	var dataNotNull="";
	if((data == '' || data == undefined || data == 'undefined' || data == null ||data == 'null')){
		dataNotNull="";
	}else{
		dataNotNull=data;
	}
	return dataNotNull;
}
//oops: isObject(Object) -> false
function isObject(val) {
    return (typeof val === 'object');
}
var validationFn = function(data){
	var errorData="";
	var count=0;
	$.each(data['data'],function(index,indexEntry){
		if(index!=undefined){
			if(count==0){
				errorData+=""+indexEntry+"";
			}else{
				errorData+="<br>"+indexEntry+" ";
			}
		}
		
		count++;
	});
	
	return errorData;
	
}
var searchMultiFn=function(search,searchName){
	var paramSearchName="";
	 if(searchName==undefined){
		 paramSearchName="";
	 }else{
		 paramSearchName =searchName;
	 }
	 
	 var search = search.trim().toLowerCase();
	 $(".rowSearch"+paramSearchName).hide();
     $.each( $(".rowSearch"+paramSearchName),function(index1,indexEntry1){
    	 //console.log(indexEntry1);	
    	 var i=0;
    	 $.each($(".columnSearch"+paramSearchName,this),function(index2,indexEntry2){
    		 //console.log($(indexEntry2).text());
    		 //console.log($(indexEntry2).text().indexOf(search));
    		 if($(indexEntry2).text().trim().toLowerCase().indexOf(search)>=0){
    			 $(this).parent().show();
    			 return false;
    		 }
    	 });
     });
}

var firstDayInMonthFn = function(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	
	var output = d.getFullYear() + '-' +
	    ((''+	month).length<2 ? '0' : '') + month + '-01';
	return output;
}
var currentDateFn = function(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var output = d.getFullYear() + '-' +
	    ((''+month).length<2 ? '0' : '') + month + '-';
	    if(day==1){
	    	output+= ((''+day).length<2 ? '0' : '') + day;
	    }else{
	    	 output+= ((''+day).length<2 ? '0' : '') + (day-1);	
	    }
	return output;
}
var currentDateTimeFn = function(){
	/*New Code Start*/

	var now = new Date();

	var year = now.getFullYear();

	var month = now.getMonth()+1;

	var day = now.getDate();

	var hour = now.getHours();

	var minute = now.getMinutes();

	var second = now.getSeconds();

	if(month.toString().length == 1) {

	var month = '0'+month;

	}

	if(day.toString().length == 1) {

	var day = '0'+day;

	}

	if(hour.toString().length == 1) {

	var hour = '0'+hour;

	}

	if(minute.toString().length == 1) {

	var minute = '0'+minute;

	}

	if(second.toString().length == 1) {

	var second = '0'+second;

	}

	var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;

	

	/*New Code End*/
	return dateTime;
}

var getPastMonthTH = function(){
	var dataReturn;
	var monthTH=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน",
	             "พฤษาภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน",
	             "ตุลาคม","พฤจิกายน","ธันวาคม"];
	
	var d = new Date();
	var month = d.getMonth();
	var year =d.getFullYear()+543;
	
	if(month==0){
		dataReturn=monthTH[11]+" "+(year-1);
	}else{
		dataReturn=monthTH[month]+" "+year;
	}
	return dataReturn;
	
}




$( document ).ajaxStart(function() {
	$("body").mLoading();
});
$( document ).ajaxStop(function() {
	$("body").mLoading('hide');
});


$("#logOut").click(function(){
	logoutFn();
});

//set paginate start
var paginationSetUpFn = function(pageIndex,pageButton,pageTotal){
	
	if(pageTotal==0){
		pageTotal=1
	}
	$('.pagination_top,.pagination_bottom').off("page");
	$('.pagination_top,.pagination_bottom').bootpag({
	    total: pageTotal,//page Total
	    page: pageIndex,//page index
	    maxVisible: 5,//จำนวนปุ่ม
	    leaps: true,
	    firstLastUse: true,
	    first: '←',
	    last: '→',
	    wrapClass: 'pagination',
	    activeClass: 'active',
	    disabledClass: 'disabled',
	    nextClass: 'next',
	    prevClass: 'prev',
	    next: 'next',
	    prev: 'prev',
	    lastClass: 'last',
	    firstClass: 'first'
	}).on("page", function(event, num){
		var rpp=10;
		if($("#rpp").val()==undefined){
			rpp=10;
		}else{
			rpp=$("#rpp").val();
		}
		
		getDataFn(num,rpp);
		
	    $(".pagingNumber").remove();
	    var htmlPageNumber= "<input type='hidden' id='pageNumber' name='pageNumber' class='pagingNumber' value='"+num+"'>";
	    $("body").append(htmlPageNumber);
	   
	}); 

	$(".countPagination").off("change");
	$(".countPagination").on("change",function(){

		$("#countPaginationTop").val($(this).val());
		$("#countPaginationBottom").val($(this).val());
		
		getDataFn(1,$(this).val());
		
		$(".rpp").remove();
		$(".pagingNumber").remove();
		var htmlRrp="";
			htmlRrp+= "<input type='hidden' id='rpp' name='rpp' class='rpp' value='"+$(this).val()+"'>";
	        htmlRrp+="<input type='hidden' id='pageNumber' name='pageNumber' class='pagingNumber' value='1'>";
	    $("body").append(htmlRrp);
	});
}
//set paginate end 
var hexToRgb = function (hex, alpha) {
	   hex   = hex.replace('#', '');
	   var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
	   var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
	   var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
	   if ( alpha ) {
	      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
	   }
	   else {
	      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	   }
	}
//******************** updateTheme start********//
var setThemeColorFn = function(color){
	$(".ibox-title").css({"background-color": "#"+color , "border-color": "#"+color});
	$(".ibox-title2").css({"background-color": hexToRgb("#"+color,0.75), "border-color": "#"+color});
	$(".ibox-title3").css({"background-color": hexToRgb("#"+color,0.75), "border-color": "#"+color});
	$(".ibox-content").css({"border-color": "#"+color});
	$(".modal-header").css({"background": "#"+color});
};
//******************** updateTheme end********//















