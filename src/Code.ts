type ParametersType = {
  sheets: {
      parameters: string;
      collaborators: string;
      workers: string;
      collaboratorsDairy: string;
  };
  formId: string;
};
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
  status: 'Ativo' | 'Inativo';
};
const sheets = {
  collaborators: 'Colaboradores',
  workers: 'Obras',
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
const namedCells = {
  sheetCollaborators: 'SHEET_COLLABORATORS',
  sheetWorkers: 'SHEET_WORKERS',
  sheetCollaboratorsDairy: 'SHEET_COLLABORATORS_DAIRY',
  formCollaboratorsDairyId: 'FORM_COLLABORATORS_DAIRY_ID',
}
function getParameters(): ParametersType{
  const sheetsParameters = 'Parâmetros';
  const sheetParametersObj = UtilitiesSpreadsheet.getSheetByName(sheetsParameters);
  const sheetCollaborators = sheetParametersObj.getRange(namedCells.sheetCollaborators).getValue() as string;
  const sheetWorkers = sheetParametersObj.getRange(namedCells.sheetWorkers).getValue() as string;
  const sheetCollaboratorsDairy = sheetParametersObj.getRange(namedCells.sheetCollaboratorsDairy).getValue() as string;
  const formId = sheetParametersObj.getRange(namedCells.formCollaboratorsDairyId).getValue() as string;
  return {
    sheets: {
      parameters: sheetsParameters,
      collaborators: sheetCollaborators,
      workers: sheetWorkers,
      collaboratorsDairy: sheetCollaboratorsDairy,
    },
    formId,
  };
}
const UtilitiesSpreadsheet = {
  getSheetByName: function(sheetName: string){
    const sheetcollaborator = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (sheetcollaborator === null){
      throw new Error('Sheet "'+sheetName+'" not found');
    }
    return sheetcollaborator;
  },
  getDataBySheetName: function(sheetName: string) {
    const sheet = this.getSheetByName(sheetName);
    const dataRange = sheet.getDataRange();
    
    return sheet.getSheetValues(
      dataRange.getRow(),
      dataRange.getColumn(),
      dataRange.getNumRows(),
      dataRange.getNumColumns(),
    );
  },
}
const localData = {
  collaborators: undefined as undefined | Collaborator[],
  workers: undefined as undefined | WorkerData[],
};
class SheetData{
  private parameters: ParametersType;
  private _collaborators: undefined | Collaborator[];
  private _workers: undefined | WorkerData[];
  constructor(parameters: ParametersType){
    this.parameters = parameters;
    this._collaborators = undefined;
    this._workers = undefined;
  }
  get collaborators(){
    if(!this._collaborators){
      this._collaborators =
      UtilitiesSpreadsheet.getDataBySheetName(this.parameters.sheets.collaborators)
        .filter((value, index) => index > 0)
        .map(item => ({
          code: item[0],
          name: item[1],
          dailyRate: item[2],
          status: item[3],
        } as Collaborator));
    }
    return this._collaborators;
  }
  get workers() {
    if(!this._workers){
      this._workers =
      UtilitiesSpreadsheet.getDataBySheetName(this.parameters.sheets.workers)
        .filter((value, index) => index > 0)
        .map(item => ({
          code: item[0],
          title: item[1],
          client: item[2],
          location: item[3],
          status: item[4]
        } as WorkerData));
    }
    return this._workers;
  }
  getCollaboratorByCode(code: string) {
    var found = this.collaborators.find(collaborator => collaborator.code === code);
    if(!found){
      throw new Error('Not found collaborator with code '+code+'!')
    }
    return found;
  }
  getWorkerByCode(code: string) {
    var found = this.workers.find(worker => worker.code === code);
    if(!found){
      throw new Error('Not found worker with code '+code+'!')
    }
    return found;
  }
}
const FormUtilities = {
  hasSameChoices: function(
    form: GoogleAppsScript.Forms.Form,
    item: GoogleAppsScript.Forms.MultipleChoiceItem,
    newChoices: GoogleAppsScript.Forms.Choice[]
  ){
    var formAgain = FormApp.openById(form.getId());
    var foundItem = formAgain.getItemById(item.getId());
    if (foundItem === null) {
      return false;
    }
    var choices = foundItem.asMultipleChoiceItem().getChoices();
    if(choices.length !== newChoices.length){
      return false;
    }
    const isEqualNewChoices = choices.reduce((acc, choice, index) => {
      if(!acc){
        return false;
      }
      const newChoice = newChoices[index];
      return (
        choice.getValue() === newChoice.getValue()
        && choice.getGotoPage() === newChoice.getGotoPage()
        && choice.getPageNavigationType() === newChoice.getPageNavigationType()
        && choice.isCorrectAnswer() === newChoice.isCorrectAnswer()
      )
    }, true);
    return isEqualNewChoices;
  },
  setChoicesOnFormItem: function(
    form: GoogleAppsScript.Forms.Form,
    item: GoogleAppsScript.Forms.MultipleChoiceItem,
    newChoices: GoogleAppsScript.Forms.Choice[],
  ){
    while(!this.hasSameChoices(form, item, newChoices)){
      item.setChoices(newChoices);
      Utilities.sleep(500);
    }
  },
  removeQuestionsByCondition: function(form: GoogleAppsScript.Forms.Form, conditionFn: (item: GoogleAppsScript.Forms.Item) => boolean){
    const items = form.getItems();
    const itemsToRemove = items.
      filter(item => conditionFn(item));
    itemsToRemove.forEach(item => form.deleteItem(item));
  },
  getItemByQuestionTitle: function(form: GoogleAppsScript.Forms.Form, questionTitle: string){
    return form.getItems()
    .find(item => questionTitle == item.getTitle())
  },
  getOrCreateMultipleChoiceItem: function(form: GoogleAppsScript.Forms.Form, questionTitle: string){
    const itemFound = this.getItemByQuestionTitle(form, questionTitle);
    if (itemFound){
      return itemFound.asMultipleChoiceItem();
    } else {
      const item = form.addMultipleChoiceItem();
      item.setTitle(questionTitle);
      return item;
    }
  },
  getOrCreateDateItem: function(form: GoogleAppsScript.Forms.Form, questionTitle: string){
    const itemFound = this.getItemByQuestionTitle(form, questionTitle);
    if (itemFound){
      return itemFound.asDateItem();
    } else {
      const item = form.addDateItem();
      item.setTitle(questionTitle);
      return item;
    }
  },
  getOrCreateTextItem: function(form: GoogleAppsScript.Forms.Form, questionTitle: string){
    const itemFound = this.getItemByQuestionTitle(form, questionTitle);
    if (itemFound){
      return itemFound.asTextItem();
    } else {
      const item = form.addTextItem();
      item.setTitle(questionTitle);
      return item;
    }
  },
};
class FormCollaboratorsDairy{
  private data: SheetData;
  private form: GoogleAppsScript.Forms.Form;
  constructor(parameters: ParametersType){
    this.data = new SheetData(parameters)
    this.form = null as unknown as GoogleAppsScript.Forms.Form;
  }

  updateForm() {
    this.form = this.getOrCreateForm();
    this.updateFormSettings();
    this.removeUnusedQuestions();
    this.addOrUpdateQuestionCollaborator();
    this.addOrUpdateQuestionWorker();
    this.addOrUpdateQuestionDate();
    this.addOrUpdateQuestionAnnotation();
  }

  private getOrCreateForm() {
    const parameters = getParameters();
    if(parameters.formId){
      const formFound = FormApp.openById(parameters.formId);
      if(formFound){
        return formFound;
      }
    }
    const newForm = FormApp.create(formCollaboratorsDairy.title);

    const sheetParameters = UtilitiesSpreadsheet.getSheetByName(sheets.parameters);
    sheetParameters.getRange(namedCells.formCollaboratorsDairyId).setValue(newForm.getId());
    return newForm;
  }

  private updateFormSettings(){
    // form.setRequireLogin(true);
    this.form.setAllowResponseEdits(false);
    this.form.setLimitOneResponsePerUser(false);
    this.form.setShowLinkToRespondAgain(true);
    this.form.setCollectEmail(false);
    this.form.setTitle(formCollaboratorsDairy.title);
  }

  private removeUnusedQuestions() {
    const formQuestionsTitles = Object
      .keys(formCollaboratorsDairy.questions)
      .map(key => (formCollaboratorsDairy.questions as any)[key] as string);
    return FormUtilities.removeQuestionsByCondition(this.form, item => 
      formQuestionsTitles.indexOf(item.getTitle()) === -1
    ); 
  }

  private addOrUpdateQuestionCollaborator() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, formCollaboratorsDairy.questions.collaborator)
    item.setRequired(true);
    var collaboratorsActive = this.data.collaborators.filter(item => item.status == 'Ativo');
    var choices = collaboratorsActive.map(function (collaborator){
      return item.createChoice(collaborator.code + ' - ' + collaborator.name);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
  }

  private addOrUpdateQuestionWorker() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, formCollaboratorsDairy.questions.worker)
    item.setRequired(true);
    var workersActive = this.data.workers.filter(item => item.status == 'Ativo');
    var choices = workersActive.map(function (worker) {
      return item.createChoice(worker.code + ' - ' + worker.title + ' - ' + worker.client);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
  }

  private addOrUpdateQuestionDate() {
    var item = FormUtilities.getOrCreateDateItem(this.form, formCollaboratorsDairy.questions.date);
    item.setRequired(false);
    item.setIncludesYear(true);
  }

  private addOrUpdateQuestionAnnotation() {
    var item = FormUtilities.getOrCreateTextItem(this.form, formCollaboratorsDairy.questions.annotation)
    item.setRequired(false);
  }
}

function updateForm() {
  const parameters = getParameters();
  const form = new FormCollaboratorsDairy(parameters);
  form.updateForm();
}


function createTriggers() {
  var arraySpreadsheetIdsUpdatForm = [
    SpreadsheetApp.getActiveSpreadsheet().getId(),
  ];
  ScriptApp.getProjectTriggers().forEach(function (trigger){
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
  const parameters = getParameters();
  const data = new SheetData(parameters)
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
  const dairySheet = UtilitiesSpreadsheet.getSheetByName(sheets.collaboratorsDairy);
  var dataRange = dairySheet.getDataRange();
  Logger.log(dataRange.getRowIndex() + dataRange.getNumRows() + 1);
  Logger.log(dataRange.getColumn());
  Logger.log(dataRange.getNumColumns());
  const sheetData = UtilitiesSpreadsheet.getSheetByName(sheets.collaboratorsDairy);
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
