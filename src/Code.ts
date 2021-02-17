const sheets = {
  collaborators: 'Colaboradores',
  workers: 'Obras',
  data: 'Dados',
  collaboratorsDairy: 'Diárias dos Colaboradores',
  parameters: 'Parâmetros',
};
const formCollaboratorsDairy = {
  title: "Registro de Diária JDomingos",
  questions: {
    collaborator: 'Colaborador?',
    worker: 'Obra?',
    date: 'Data? (Não preencha para usar a data de hoje)',
    annotation: 'Anotação:',
  }
};
const spreadsheetId = "";
var collaboratorSpreadsheetId = "";
var workerSpreadsheetId = "";
var formId = "";

function getSheetByName(sheetName: string){
  const sheetcollaborator = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (sheetcollaborator === null){
    throw new Error('Sheet "'+sheetName+'" not found');
  }
  return sheetcollaborator;
}

function getDataBySheetName(sheetName: string) {
  const sheet = getSheetByName(sheetName);
  const dataRange = sheet.getDataRange();
  
  const data = sheet.getSheetValues(
    dataRange.getRow(),
    dataRange.getColumn(),
    dataRange.getNumRows(),
    dataRange.getNumColumns(),
  );
  return data;
}

type Collaborator = {
  code: string;
  name: string;
  dailyRate: number;
  status: 'Ativo' | 'Inativo';
};
type WorkerData = {
  code: string;
  title: string;
  client: string;
  location: string;
  status: string;
};

const localData = {
  collaborators: undefined as undefined | Collaborator[],
  workers: undefined as undefined | WorkerData[],
};
const data = {
  collaborators: function(){
    if(!localData.collaborators){
      localData.collaborators =
        getDataBySheetName(sheets.collaborators)
        .filter((value, index) => index > 0)
        .map(item => ({
          code: item[0],
          name: item[1],
          dailyRate: item[2],
          status: item[3],
        } as Collaborator));
    }
    return localData.collaborators;
  },
  workers: function() {
    if(!localData.workers){
      localData.workers =
        getDataBySheetName(sheets.workers)
        .filter((value, index) => index > 0)
        .map(item => ({
          code: item[0],
          title: item[1],
          client: item[2],
          location: item[3],
          status: item[4]
        } as WorkerData));
    }
    return localData.workers;
  },
  getCollaboratorByCode: function(code: string){
    var found = data.collaborators().find(collaborator => collaborator.code === code);
    if(!found){
      throw new Error('Not found collaborator with code '+code+'!')
    }
    return found;
  },
  getWorkerByCode: function(code: string){
    var found = data.workers().find(worker => worker.code === code);
    if(!found){
      throw new Error('Not found worker with code '+code+'!')
    }
    return found;
  },
};

function getChoicesLength(form: GoogleAppsScript.Forms.Form, item: GoogleAppsScript.Forms.MultipleChoiceItem){
  Utilities.sleep(502);
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

function cleanForm(form: GoogleAppsScript.Forms.Form){
  const items = form.getItems();
  while(items.length > 0){
  	const item = items.pop();
  	if(item){
    	form.deleteItem(item);	
  	}
  }
}
function removeUnusedQuestions(form: GoogleAppsScript.Forms.Form){
  const items = form.getItems();
  const formQuestionsTitles = Object
    .keys(formCollaboratorsDairy.questions)
    .map(key => (formCollaboratorsDairy.questions as any)[key] as string)
  const itemsToRemove = items.
    filter(item => formQuestionsTitles.indexOf(item.getTitle()) === -1);
  itemsToRemove.forEach(item => form.deleteItem(item));
}

function getItemByQuestionTitle(form: GoogleAppsScript.Forms.Form, questionTitle: string){
  return form.getItems()
  .find(item => questionTitle == item.getTitle())
}

function getOrCreateMultipleChoiceItem(form: GoogleAppsScript.Forms.Form, questionTitle: string){
  const itemFound = getItemByQuestionTitle(form, questionTitle);
  if (itemFound){
    return itemFound.asMultipleChoiceItem();
  } else {
    const item = form.addMultipleChoiceItem();
    item.setTitle(questionTitle);
    return item;
  }
}

function getOrCreateDateItem(form: GoogleAppsScript.Forms.Form, questionTitle: string){
  const itemFound = getItemByQuestionTitle(form, questionTitle);
  if (itemFound){
    return itemFound.asDateItem();
  } else {
    const item = form.addDateItem();
    item.setTitle(questionTitle);
    return item;
  }
}

function getOrCreateTextItem(form: GoogleAppsScript.Forms.Form, questionTitle: string){
  const itemFound = getItemByQuestionTitle(form, questionTitle);
  if (itemFound){
    return itemFound.asTextItem();
  } else {
    const item = form.addTextItem();
    item.setTitle(questionTitle);
    return item;
  }
}

function addOrUpdateQuestionCollaborator(form: GoogleAppsScript.Forms.Form){
  const item = getOrCreateMultipleChoiceItem(form, formCollaboratorsDairy.questions.collaborator)
  item.setRequired(true);
  var collaboratorsActive = data.collaborators().filter(item => item.status == 'Ativo');
  var choices = collaboratorsActive.map(function (collaborator){
    return item.createChoice(collaborator.code + ' - ' + collaborator.name);
  });
  setChoicesOnFormItem(form, item, choices)
}

function addOrUpdateQuestionWorker(form: GoogleAppsScript.Forms.Form){
  const item = getOrCreateMultipleChoiceItem(form, formCollaboratorsDairy.questions.worker)
  item.setRequired(true);
  var workersActive = data.workers().filter(item => item.status == 'Ativo');
  var choices = workersActive.map(function (worker) {
    return item.createChoice(worker.code + ' - ' + worker.title + ' - ' + worker.client);
  });
  setChoicesOnFormItem(form, item, choices)
}

function addOrUpdateQuestionDate(form: GoogleAppsScript.Forms.Form){
  var item = getOrCreateDateItem(form, formCollaboratorsDairy.questions.date);
  item.setRequired(false);
  item.setIncludesYear(true);
}
function addOrUpdateQuestionAnnotation(form: GoogleAppsScript.Forms.Form){
  var item = getOrCreateTextItem(form, formCollaboratorsDairy.questions.annotation)
  form.addTextItem();
  item.setRequired(false);
}

function updateForm() {
  const sheetParameters = getSheetByName(sheets.parameters);
  let formId = sheetParameters.getRange('FORM_ID').getValue();
  let form;
  if(formId){
    form = FormApp.openById(formId);
  }
  if (!form) {
    form = FormApp.create(formCollaboratorsDairy.title);
    sheetParameters.getRange('FORM_ID').setValue(form.getId());
  }
  // form.setRequireLogin(true);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(true);
  form.setCollectEmail(false);
  form.setTitle(formCollaboratorsDairy.title);
  removeUnusedQuestions(form);
  addOrUpdateQuestionCollaborator(form);
  addOrUpdateQuestionWorker(form);
  addOrUpdateQuestionDate(form);
  addOrUpdateQuestionAnnotation(form);
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


function onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit) {
  var formResponse = event.response;
  var itemResponses = formResponse.getItemResponses();
  var collaboratorCode = (itemResponses[0].getResponse() as string).split(' - ')[0];
  var workerCode = (itemResponses[1].getResponse() as string).split(' - ')[0];
  const dateString = itemResponses[2].getResponse() as string;
  let date;
  if (!dateString){
    date = new Date();
  } else {
    var dateParts = dateString.split('-').map(part => parseInt(part));
    date = new Date(dateParts[0], dateParts[1]-1, dateParts[2]);
  }
  var annotation = itemResponses[3].getResponse();

  const collaborator = data.getCollaboratorByCode(collaboratorCode);
  const worker = data.getWorkerByCode(workerCode);
  const dairySheet = getSheetByName(sheets.collaboratorsDairy);
  var dataRange = dairySheet.getDataRange();
  Logger.log(dataRange.getRowIndex() + dataRange.getNumRows() + 1);
  Logger.log(dataRange.getColumn());
  Logger.log(dataRange.getNumColumns());
  const sheetData = getSheetByName(sheets.data);
  var rangeNewData = sheetData.getRange(
    dataRange.getRowIndex() + dataRange.getNumRows(),
    dataRange.getColumn(),
    1,
    dataRange.getNumColumns()
  );
  rangeNewData.setValues([
    [
      Utilities.formatDate(date, "America/Sao_Paulo", "dd/MM/yyyy"),
      collaborator.code,
      collaborator.name,
      collaborator.dailyRate,
      worker.code,
      worker.title,
      worker.client,
      annotation
    ]
  ]);
}
