<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>

<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.liferay.portal.kernel.util.WebKeys"%>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme"%>
<liferay-theme:defineObjects />
<portlet:defineObjects />
<%
	String username = themeDisplay.getUser().getScreenName();
	String password = (String) request.getSession().getAttribute(WebKeys.USER_PASSWORD);
	layout = themeDisplay.getLayout();
	plid = layout.getPlid();
%>

<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%=renderRequest.getContextPath()%>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%=plid%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">

<style>
.aui #breadcrumbs {
	margin-bottom: 0;
}

.aui .row-fluid [class*="span"] {
	min-height: auto;
	margin-bottom: 1px;
}
.aui #file {
	width: 100%;
	height: 100%;
}


</style>

<div id="page_report_hidden" style="display:none">

	<div class='row-fluid'>
		<div class='col-xs-12'>
			<div id="slide_status" class="span12" style="z-index: 9000;">
			</div>
		</div>
	</div>
	
	<!-- Panel mapping data start-->
	<div class="panel panel-primary " id="panel_advanced_search"
		style="padding-bottom: 15px;">
		<div class="panel-heading">Advanced Search</div>
		<div class="panel-body">
		
			<div class="row-fluid ">
				<!-- <div id="drop_down_organization" class="form-group pull-left span3" style="margin-left: 5px">
					<select data-original-title="Year" data-toggle="tooltip" title="" class="input span12 m-b-n" id="param_year" name="param_year" style="cursor: pointer;"></select>
				</div> -->
				<div class="form-group pull-left span3" style="margin-left: 5px">
					<select data-original-title="ปีการศึกษา" data-toggle="tooltip" title="" class="input span12 m-b-n" id="param_year" name="param_year" style="cursor: pointer;">
						<option  value="">ปีการศึกษาทั้งหมด</option>
					</select>
				</div>
				<div class="form-group pull-left span3" style="margin-left: 5px">
					<select data-original-title="คณะ" data-toggle="tooltip" title="" class="input span12 m-b-n" id="param_faculty" name="param_faculty" style="cursor: pointer;">
						<option  value="">คณะทั้งหมด</option>
					</select>
				</div>
				<div class="form-group pull-left span3" style="margin-left: 5px">
					<select name="param_type" id="param_type" class="input form-control input-sm span12 m-b-n" title="" data-toggle="tooltip" data-original-title="Output Type" style="cursor: pointer;" >
						<option value="pdf">PDF</option> 
						<option value="xlsx">Excel</option> 
					</select>
				</div>
				<div class="form-group pull-right m-b-none ">
					<div class="form-group pull-right m-b-none ">
						<button id="btn_import" type="button" class="btn btn-success btn-sm " style="margin-left: 5px;">
							<i class="fa fa-upload"></i>&nbsp;Import
						</button>
					</div>
					<div class="form-group pull-right m-b-none ">
						<form id="formExportToExcel" action="" method="post" class="pull-right " style="margin-bottom: 0px; margin-left: 5px">
							<button id="exportToExcel" class="btn btn-warning btn-sm" type="submit">
								<i class="fa fa-download"></i> Download
							</button>
						</form>
					</div>
					<div class="form-group pull-right m-b-none ">
						<button type="button" name="btnSearchAdvance" id="btnSearchAdvance" class="btn btn-info input-sm " style="margin-left: 5px;">
							<i class="fa fa-search"></i>&nbsp;Search
						</button>
					</div>
				</div>
			</div>
			
		</div>
	</div>
	<!-- Panel mapping data End -->
	<iframe id="iFrame_report" style="width: 100%; height: 500px; border:0;">
	</iframe>
	
	<!-- Modal Import Employee Role -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalImport"
		class="modal inmodal" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header" style="background: rgb(0, 154, 237) none repeat scroll 0% 0%;">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='icon-remove'></i></span>
					</button>
					<h4 class="modal-title" id="" style="color:#fff;">Import File</h4>
				</div>
				<div class="modal-body">
					<!-- content start -->
					<!-- form start -->
					<div class="form-group">
					<form id="fileImportExcel">
					<!-- 	<h4>FILE IMPORT</h4> -->
						<div class="fileUpload ">
							<input type="file" id="file" class="dropify" accept=".xls, .xlsx" /><span></span>
						</div>
					</form>
					</div>
					<!-- form End -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<button class="btn btn-success" type="submit" id="importFileMobile" form="fileImportExcel">Import</button>
					<button data-dismiss="modal" class="btn btn-danger btnCancle"
						type="button">Cancel</button>
						<div class="alert alert-warning information" id="informationFile"
						style="height:120px; overflow-y: scroll; position:relative;display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal End Role -->
	
</div>