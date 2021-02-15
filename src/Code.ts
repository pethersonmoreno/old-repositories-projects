var collaboratorSpreadsheetId = "";
var workerSpreadsheetId = "";
var formId = "";

function getChoicesLength(form: GoogleAppsScript.Forms.Form, item: GoogleAppsScript.Forms.MultipleChoiceItem){
  Utilities.sleep(501);
  var formAgain = FormApp.openById(form.getId());
  var foundItem = formAgain.getItemById(item.getId());
  if (foundItem === null) {
    return 0;
  }
  var choices = foundItem.asMultipleChoiceItem().getChoices()
  return choices.length;
}
function setChoicesOnFormItem(
	form: GoogleAppsScript.Forms.Form,
	item: GoogleAppsScript.Forms.MultipleChoiceItem,
	newChoices: GoogleAppsScript.Forms.Choice[],
){
  while(getChoicesLength(form, item) !== newChoices.length){
    item.setChoices(newChoices);
  }
}

function getCollaboratorData(){
  var collaboratorSpreadsheet = SpreadsheetApp.openById(collaboratorSpreadsheetId);
  var dataRange = collaboratorSpreadsheet.getDataRange();
  
  var data = collaboratorSpreadsheet.getSheetValues(
    dataRange.getRow(),
    dataRange.getColumn(),
    dataRange.getNumRows(),
    dataRange.getNumColumns(),
  );
  return data
    .filter((value, index) => index > 0)
    .map(item => ({
      code: item[0],
      name: item[1],
      status: item[3],
    }));
}
function getWorkerData(){
  var workerSpreadsheet = SpreadsheetApp.openById(workerSpreadsheetId);
  var dataRange = workerSpreadsheet.getDataRange();
  
  var data = workerSpreadsheet.getSheetValues(
    dataRange.getRow(),
    dataRange.getColumn(),
    dataRange.getNumRows(),
    dataRange.getNumColumns(),
  );
  return data
    .filter((value, index) => index > 0)
    .map(item => ({
      code: item[0],
      title: item[1],
      client: item[2],
      location: item[3],
      status: item[4]
    }));
}

function cleanForm(form: GoogleAppsScript.Forms.Form){
  var items = form.getItems();
  while(items.length > 0){
  	const item = items.pop();
  	if(item){
    	form.deleteItem(item);	
  	}
  }
}

function addQuestionCollaborator(form: GoogleAppsScript.Forms.Form){
  var item = form.addMultipleChoiceItem();
  item.setRequired(true);
  item.setTitle('Colaborador?');
  var collaboratorsActive = getCollaboratorData().filter(item => item.status == 'Ativo');
  var choices = collaboratorsActive.map(function (collaborator){
    return item.createChoice(collaborator.code + ' - ' + collaborator.name);
  });
  setChoicesOnFormItem(form, item, choices)
}

function addQuestionWorker(form: GoogleAppsScript.Forms.Form){
  var item = form.addMultipleChoiceItem();
  item.setRequired(true);
  item.setTitle('Obra?');
  var workersActive = getWorkerData().filter(item => item.status == 'Ativo');
  var choices = workersActive.map(function (worker) {
    return item.createChoice(worker.code + ' - ' + worker.title + ' - ' + worker.client);
  });
  setChoicesOnFormItem(form, item, choices)
}

function addQuestionDate(form: GoogleAppsScript.Forms.Form){
  var item = form.addDateItem();
  item.setRequired(false);
  item.setTitle('Data? (Não preencha para usar a data de hoje)');
  item.setIncludesYear(true);
}
function addQuestionAnnotation(form: GoogleAppsScript.Forms.Form){
  var item = form.addTextItem();
  item.setRequired(false);
  item.setTitle('Anotação:');
}

function updateForm() {
  var form = FormApp.openById(formId);
  // form.setRequireLogin(true);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(true);
  form.setCollectEmail(false);
  form.setTitle("Registro de Diária JDomingos");
  cleanForm(form);
  addQuestionCollaborator(form);
  addQuestionWorker(form);
  addQuestionDate(form);
  addQuestionAnnotation(form);
}

function createTriggers() {
  var arraySpreadsheetIdsUpdatForm = [
    collaboratorSpreadsheetId,
    workerSpreadsheetId
  ];
  ScriptApp.getScriptTriggers().forEach(function (trigger){
    if (trigger.getTriggerSource() === ScriptApp.TriggerSource.SPREADSHEETS){
      arraySpreadsheetIdsUpdatForm = arraySpreadsheetIdsUpdatForm.filter(function (id){
        return (id !== trigger.getTriggerSourceId())
      });
    }
  });
  arraySpreadsheetIdsUpdatForm.forEach(function (spreadsheetId){
    ScriptApp.newTrigger('updateForm')
      .forSpreadsheet(spreadsheetId)
      .onEdit()
      .create();
  });
}