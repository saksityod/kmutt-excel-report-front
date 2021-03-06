var restfulPathCheckRoleUser = apiURL+"/AdmissionScore/CheckRoleUser";
var restfulPathDropDownYear = apiURL+"/AdmissionScore/YearList";
var restfulPathDropDownFacultyField = apiURL+"/AdmissionScore/FacultyFieldList";
var restfulPathImportExcel = apiURL+"/AdmissionScore/Import";
var restfulPathExportExcel = apiURL+"/AdmissionScore/Export";

var files;

var gerReportFn = function() {
	$("body").mLoading('show'); //Loading
	 
	var param_year= $("#param_year").val();
	var param_faculty_field= $("#param_faculty_field").val();
	var param_type = $("#param_type").val();
	var parameter = {};
	var template_name ="";
	
	parameter = {
			param_year:param_year,
			param_faculty_field_name:param_faculty_field,
			param_type:param_type
	};
	
	  var data = JSON.stringify(parameter);
	  var url_report_jasper = apiURL+"/generate?template_name=admission_score_report&template_format="+param_type+"&used_connection=1&inline=1&data="+data+"&subreport_bundle=0";
	  
	  console.log(url_report_jasper);
	  
		 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		 window.open(url_report_jasper,"_blank");
		} else {
			$('#iFrame_report').attr('src',url_report_jasper);
		}
	$("body").mLoading('hide'); //Loading
};

var checkRoleUser = function(){
	$.ajax ({
		url:restfulPathCheckRoleUser,
		type:"get" ,
		data: { 
			user:$("#user_portlet").val(),
			report: "admission_score"
		},
		dataType:"json" ,
		async:true,
		success:function(data){
			if (data['status'] == 400){
				alertFn("alert-error", "Sorry! ", data['error']);
			}
			
			$.each(data['data'],function(index,indexEntry){
				// button Import
				if(indexEntry["is_import"] > 0)	{
					$('#btn_import').prop('disabled', false);
				}else if (indexEntry["is_import"] == 0){
					$('#btn_import').prop('disabled', true);
				}
				
				// button Download
				if(indexEntry["is_export"] > 0)	{
					$('#exportToExcel').prop('disabled', false);
				}else if (indexEntry["is_export"] == 0){
					$('#exportToExcel').prop('disabled', true);
				}
			});
		}
	});	
};

var dropDownListYear = function(){
	var html="";
	$.ajax ({
		url:restfulPathDropDownYear,
		type:"get" ,
		dataType:"json" ,
		async:true,
		success:function(data){
			html+="<option value=''>ปีการศึกษาทั้งหมด</option>";
			$.each(data,function(index,indexEntry){
					html+="<option  value='"+indexEntry["academic_year"]+"'>"+indexEntry["academic_year"]+"</option>";	
			});
			$("#param_year").html(html);
			dropDownListFacultyField();
		}
	});	
};

var dropDownListFacultyField = function(){
	var html="";
	$.ajax ({
		url:restfulPathDropDownFacultyField,
		type:"get" ,
		data: { param_year:$("#param_year").val() },
		dataType:"json" ,
		async:true,
		success:function(data){
			html+="<option value=''>คณะ/สาขาทั้งหมด</option>";
			$.each(data,function(index,indexEntry){
					html+="<option  value='"+indexEntry["faculty_field_name"]+"'>"+indexEntry["faculty_field_name"]+"</option>";	
			});
			$("#param_faculty_field").html(html);
		}
	});	
};

$(document).ready(function() {
	if(getLogin()== false)
		return false;
	
	  $('[data-toggle="tooltip"]').css({
          "cursor": "pointer"
      });
      $('[data-toggle="tooltip"]').tooltip({
          html: true
      });
      
      $("#exportToExcel").click(function(){
    		var param="";
    		param+="param_year="+$("#param_year").val();
    		param+="&param_faculty_field="+$("#param_faculty_field").val();

    		$("form#formExportToExcel").attr("action",restfulPathExportExcel+"?"+param);
    	});
    
    checkRoleUser();
   
	dropDownListYear();
	
	$("#param_year").change(function () {
		dropDownListFacultyField();
	});
	$("#btnSearchAdvance").click(function () {
		gerReportFn();
	});
	
	$("#btn_import").click(function () {
		$("#ModalImport").modal({
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		});
		$('#file').val("");
		$(".btnModalClose").click();
		$(".dropify-clear").click(); 
	});
	
	// Add events
	$('#file').on('change', prepareUpload);

	// Grab the files and set them to our variable
	function prepareUpload(event)
	{
	  files = event.target.files;
	}
	$('form#fileImportExcel').on('submit', uploadFiles);

	// Catch the form submit and upload the files
	function uploadFiles(event)
	{
		event.stopPropagation(); // Stop stuff happening
		event.preventDefault(); // Totally stop stuff happening

		// START A LOADING SPINNER HERE
		// Create a form data object and add the files
		var data = new FormData();
		$.each(files, function(key, value)
		{
			data.append(key, value);
		});
		 data.append('user', $("#user_portlet").val());
		$("body").mLoading();
		$.ajax({
			url:restfulPathImportExcel,
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			success: function(data, textStatus, jqXHR)
			{
				if(data['status'] == 200 && data['errors'].length == 0){
					alertFn("alert-success", "Success! ", "Import data successfully.");
					$("body").mLoading('hide');
					$('#ModalImport').modal('hide');

				}else{
					alertFn("", "Sorry! ", "Import data failed.");
					$("body").mLoading('hide');
				}
				dropDownListYear();
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				alertFn("alert-error","Sorry! ","Can not connect to server. (500)");
			}
		});
		return false;
	}
	
// Import file start -----------------------------------------------------------
	
    $('.dropify').dropify();    // Basic
    $('.dropify-fr').dropify({ // Translated
        messages: {
        	 'default': 'Glissez-dposez un fichier ici ou cliquez',
            replace: 'Glissez-dposez un fichier ou cliquez pour remplacer',
            remove:  'Supprimer',
            error:   'Dsol, le fichier trop volumineux'
        }
    });
     
  // Used events
     var drEvent = $('#input-file-events').dropify();
     
     drEvent.on('dropify.beforeClear', function(event, element){
         return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
     });

     drEvent.on('dropify.afterClear', function(event, element){
         alert('File deleted');
     });

     drEvent.on('dropify.errors', function(event, element){
         console.log('Has Errors');
     });

     var drDestroy = $('#input-file-to-destroy').dropify();
     drDestroy = drDestroy.data('dropify');
     $('#toggleDropify').on('click', function(e){
         e.preventDefault();
         if (drDestroy.isDropified()) {
             drDestroy.destroy();
         } else {
             drDestroy.init();
         }
     });	
     
  // Import file end -----------------------------------------------------------
});