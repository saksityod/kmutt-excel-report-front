var getRoleNameFn = function(){
	$.ajax({
        url: apiURL+"/report_role_mapping/role_list",
        type: "get",
        dataType: "json",
        data: {},
        async: true,
        success: function (data) {
        	var htmlrole = "";
        	$.each(data,function(index,indexEntry) {
        		htmlrole += "<option value='"+indexEntry.roleId+"'>"+indexEntry.name+"</option>";
        	});
        	
        	$("#role_name").html(htmlrole);
        	
        }
	});
}

var getAllMappingFn = function()
{
	$.ajax({
        url: apiURL+"/report_role_mapping",
        type: "get",
        dataType: "json",
        data: {},
        async: true,
        success: function (data) {
        	var htmlBody = "";
        	$.each(data,function(index,indexEntry) {
        		htmlBody += "<tr>";
        		htmlBody += "	<td>"+indexEntry.portlet_name+"</td>";
        		htmlBody += "	<td>"+indexEntry.role_name+"</td>";
        		htmlBody += "	<td style='text-align: center;'> <input type='checkbox' disabled='disabled'  "+((indexEntry.is_import==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td style='text-align: center;'> <input type='checkbox' disabled='disabled'  "+((indexEntry.is_export==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td style='text-align: center;'> <i data-trigger='focus' tabindex='"+index+"' data-content=\"" +
        				"<button class='btn btn-warning btn-small btn-gear edit' id='edit-"+indexEntry.report_role_mapping_id+"'>Edit</button>&nbsp;" +
        				"<button id='del-"+indexEntry.report_role_mapping_id+"' class='btn btn-danger btn-small btn-gear del'>Delete</button>\" " +
        				"data-placement='top' data-toggle='popover' data-html='true' class='fa fa-cog font-gear popover-edit-del' data-original-title='' title=''></i> </td>";
        		htmlBody += "</tr>";
        	});
        	
        	$("#listData").html(htmlBody);
        	$(".popover-edit-del").popover(setPopoverDisplay);
        	$("#table-reportRoleMapping").off("click",".popover-edit-del");
        	$("#table-reportRoleMapping").on("click",".popover-edit-del",function(){
        		
        		$(".edit").off("click");
        		$(".edit").on("click",function() {
        			
        			ClearAppraisalFormFn();
        			var id = $(this).attr("id").split("-")[1];
        			$(this).parent().parent().parent().children().click();
        			
        			$("#btnSetRoleSubmitAnother").hide();
        			
        			
        			findOneFn(id);
        			      			
        			$("#id").val(id);
        			$("#action").val("edit");

        			
        		});
        		
        		$(".del").off("click");
        		$(".del").on("click",function(){
        			var id = $(this).attr("id").split("-")[1];
        			$(this).parent().parent().parent().children().click();
        			 
        			$("#confrimModal").modal({
        				"backdrop" : setModalPopup[0],
        				"keyboard" : setModalPopup[1]
        			});
        			$(document).off("click","#btnConfirmOK");
        			$(document).on("click","#btnConfirmOK",function(){
        			
        				$.ajax({
        					 url:apiURL+"/report_role_mapping/"+id,
        					 type : "delete",
        					 dataType:"json",
        					 success:function(data){    
        				    	 
        					     if(data['status']==200){
        					    	 
        					       // callFlashSlide("Delete Successfully.");
        					       alertFn("alert-success", "Success! ", "Delete Successfully.");
        					       $("#confrimModal").modal('hide');
        					       getAllMappingFn();
        					     }else if (data['status'] == "400"){
        					    	 callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
        					    	}
        					 }
        				});
        				
        			});
        			
        		});	
        		
        	});
        	
        }
	});
}


var findOneFn = function(id)
{
	$.ajax({
        url: apiURL+"/report_role_mapping/"+id,
        type: "get",
        dataType: "json",
        data: {},
        async: true,
        success: function (data) {
        	$("#report_name option[value='"+data.portlet_name+"']").prop('selected', true);
        	$("#role_name option[value='"+data.role_id+"']").prop('selected', true);
        	$("#is_import").prop('checked', data.is_import);
        	$("#is_export").prop('checked', data.is_export);
        	
        	$("#saveMappingModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
        	
        }
	});
};


var UpdateReportRoleMappingFn = function()
{
	var report_name = $("#report_name").val();
	var role_id = $("#role_name").val();
	var is_import = Number($('#is_import').prop('checked'));
	var is_export = Number($('#is_export').prop('checked'));
	var user = $("#user_portlet").val();

	$.ajax({
        url: apiURL+"/report_role_mapping/"+$("#id").val(),
        type: "PATCH",
        dataType: "json",
        data: {
        	"portlet_name":report_name,
        	"role_id":role_id,
        	"is_import":is_import,
        	"is_export":is_export,
        	"user":user
        },
        async: true,
        success: function (data) { 
        	if(data['status']=='200'){
        		  		
        		// callFlashSlide("Update successed.");
        		alertFn("alert-success", "Success! ", "Update successed.");
        		$("#table-reportRoleMapping thead th").css("vertical-align", "middle");
        		getAllMappingFn();
    			$("#saveMappingModal").modal('hide');
    			ClearAppraisalFormFn();
    		       	
        	}else if(data['status']=='400'){
        		callFlashSlideInModal(validationFn(data),"#information","error");
			}else if(data['status']=='404'){
        		callFlashSlideInModal(data['data'],"#information","error");
			}
        }
	});
}


var ClearAppraisalFormFn = function()
{
	$("#report_name option:first").prop('selected', true);
	$("#role_name option:first").prop('selected', true);
	$("#saveMappingModal #is_import").prop('checked', false);
	$("#saveMappingModal #is_export").prop('checked', false);
}


var InsertReportRoleMappingFn = function(Status)
{
	var report_name = $("#report_name").val();
	var role_id = $("#role_name").val();
	var is_import = Number($('#is_import').prop('checked'));
	var is_export = Number($('#is_export').prop('checked'));
	var user = $("#user_portlet").val();
	
	$.ajax({
        url: apiURL+"/report_role_mapping",
        type: "post",
        dataType: "json",
        data: {
        	"portlet_name":report_name,
        	"role_id":role_id,
        	"is_import":is_import,
        	"is_export":is_export,
        	"user":user
        },
        async: true,
        success: function (data) { 
        	if(data['status']=='200'){
        		  		
        		if(Status == 'Save'){
        			// callFlashSlide("Insert successed.");
        			alertFn("alert-success", "Success! ", "Insert successed.");
        			ClearAppraisalFormFn();
        			$("#saveMappingModal").modal('hide');
        			
        			$("#table-reportRoleMapping thead th").css("vertical-align", "middle");
        			getAllMappingFn();
        		}else if(Status == 'SaveAnother'){
        			callFlashSlideInModal("Insert success.","#information","");
        			$("#table-reportRoleMapping thead th").css("vertical-align", "middle");
        			getAllMappingFn();
        			ClearAppraisalFormFn();
        		}
        	
        	}else if(data['status']=='400'){
        		callFlashSlideInModal(validationFn(data),"#information","error");
			}else if(data['status']=='404'){
        		callFlashSlideInModal(data['data'],"#information","error");
			}
        }
	});
}



$(document).ready(function(){
    	
	if(getLogin()== false)
		return false;
	
	$('[data-toggle="tooltip"]').css({
         "cursor": "pointer"
    });
    $('[data-toggle="tooltip"]').tooltip({
         html: true
    });
      
	getAllMappingFn();
	getRoleNameFn();
	
	$(".form_list_content").show();
			 
	$("#saveMappingModal").hide();
			 
	$(".btnCancle , .setCloseModal").click(function(){
		ClearAppraisalFormFn();
		$("#saveMappingModal").hide();
		$("#btnSetRoleSubmitAnother").show();
		$("#saveMappingModal").show(); 				 
	});
			 
	$("#btnAdd").click(function(){
		ClearAppraisalFormFn();
		$("#btnSetRoleSubmitAnother").show();
		$("#saveMappingModal").show();
				 
		$("#action").val("add");
	});
			
			 
	$("#btnSetRoleSubmit").click(function(){
				 
		if($("#action").val() == "add" || $("#action").val() == ""){
			InsertReportRoleMappingFn("Save");
		}else{
			UpdateReportRoleMappingFn();
		}
	});
			 
	$("#btnSetRoleSubmitAnother").click(function(){
		InsertReportRoleMappingFn("SaveAnother");
	});
			 	
	 
});