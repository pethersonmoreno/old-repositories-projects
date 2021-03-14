type ParametersType = {
  sheets: {
      parameters: string;
      collaborators: string;
      workers: string;
      collaboratorsDairy: string;
      collaboratorsPayments: string;
      workersExpensives: string;
  };
  formCollaboratorDairy: {
    id: string;
    title: string;
    questions: {
      collaborator: string;
      worker: string;
      date: string;
      annotation: string;
    };
  };
  formCollaboratorPayment: {
    id: string;
    title: string;
    questions: {
      date: string;
      collaborator: string;
      type: string;
      typeOptions: string[];
      value: string;
      annotation: string;
    };
  };
  formWorkExpense: {
    id: string;
    title: string;
    questions: {
      date: string;
      value: string;
      annotation: string;
      paidByCollaborator: string;
      collaborator: string;
    };
  };
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
type Trigger = {
  triggerSourceId: string;
  triggerSource: GoogleAppsScript.Script.TriggerSource;
  functionName: string;
  eventName: string;
};
const namedCellFormCollaboratorDairyId = 'FORM_COLLABORATOR_DAIRY_ID';
const namedCellFormCollaboratorPaymentId = 'FORM_COLLABORATOR_PAYMENT_ID';
const namedCellFormWorkExpenseId = 'FORM_WORK_EXPENSE_ID';
function getParameters(): ParametersType{
  const sheetsParameters = 'Parâmetros';
  const sheetParametersObj = UtilitiesSpreadsheet.getSheetByName(sheetsParameters);
  const getValue = (namedCell: string) => sheetParametersObj.getRange(namedCell).getValue() as string
  return {
    sheets: {
      parameters: sheetsParameters,
      collaborators: getValue('SHEET_COLLABORATORS'),
      workers: getValue('SHEET_WORKERS'),
      collaboratorsDairy: getValue('SHEET_COLLABORATORS_DAIRY'),
      collaboratorsPayments: getValue('SHEET_COLLABORATORS_PAYMENTS'),
      workersExpensives: getValue('SHEET_WORKERS_EXPENSIVES'),
    },
    formCollaboratorDairy: {
      id: getValue(namedCellFormCollaboratorDairyId),
      title: getValue('FORM_COLLABORATOR_DAIRY_TITLE'),
      questions: {
        collaborator: getValue('FORM_COLLABORATOR_DAIRY_QUESTION_COLLABORATOR'),
        worker: getValue('FORM_COLLABORATOR_DAIRY_QUESTION_WORKER'),
        date: getValue('FORM_COLLABORATOR_DAIRY_QUESTION_DATE'),
        annotation: getValue('FORM_COLLABORATOR_DAIRY_QUESTION_ANNOTATION'),
      },
    },
    formCollaboratorPayment: {
      id: getValue(namedCellFormCollaboratorPaymentId),
      title: getValue('FORM_COLLABORATOR_PAYMENT_TITLE'),
      questions: {
        date: getValue('FORM_COLLABORATOR_PAYMENT_QUESTION_DATE'),
        collaborator: getValue('FORM_COLLABORATOR_PAYMENT_QUESTION_COLLABORATOR'),
        type: getValue('FORM_COLLABORATOR_PAYMENT_QUESTION_TYPE'),
        typeOptions: getValue('FORM_COLLABORATOR_PAYMENT_QUESTION_TYPE_OPTIONS').split('|'),
        value: getValue('FORM_COLLABORATOR_PAYMENT_QUESTION_VALUE'),
        annotation: getValue('FORM_COLLABORATOR_PAYMENT_QUESTION_ANNOTATION'),
      },
    },
    formWorkExpense: {
      id: getValue(namedCellFormWorkExpenseId),
      title: getValue('FORM_WORK_EXPENSE_TITLE'),
      questions: {
        date: getValue('FORM_WORK_EXPENSE_QUESTION_DATE'),
        value: getValue('FORM_WORK_EXPENSE_QUESTION_VALUE'),
        annotation: getValue('FORM_WORK_EXPENSE_QUESTION_ANNOTATION'),
        paidByCollaborator: getValue('FORM_WORK_EXPENSE_QUESTION_PAID_BY_COLLABORATOR'),
        collaborator: getValue('FORM_WORK_EXPENSE_QUESTION_COLLABORATOR'),
      },
    },
  };
}
const UtilitiesSpreadsheet = {
  getSheetByName: function(sheetName: string){
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (sheet === null){
      throw new Error('Sheet "'+sheetName+'" not found');
    }
    return sheet;
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
  getDateResponse: function(dateString: string){
    if (!dateString){
      return new Date();
    } else {
      const dateParts = dateString.split('-').map(part => parseInt(part));
      return new Date(dateParts[0], dateParts[1]-1, dateParts[2]);
    }
  }
};
const UtilitiesScript = {
  createTriggers: function(triggersToSet: Trigger[]){
    const currentTriggers = ScriptApp.getProjectTriggers();
    const newTriggers = triggersToSet
      .filter(item => !currentTriggers.find(current => (
        current.getTriggerSourceId() == item.triggerSourceId
        && current.getTriggerSource() == item.triggerSource
      )));
    newTriggers.forEach(trigger => {
      const triggerBuilder = ScriptApp.newTrigger(trigger.functionName);
      if(trigger.triggerSource === ScriptApp.TriggerSource.SPREADSHEETS){
        const spreadsheetTriggerBuilder = triggerBuilder.forSpreadsheet(trigger.triggerSourceId);
        if(trigger.eventName === 'edit'){
          spreadsheetTriggerBuilder.onEdit();
        }
        spreadsheetTriggerBuilder.create();
      } else if(trigger.triggerSource === ScriptApp.TriggerSource.FORMS){
        const spreadsheetTriggerBuilder = triggerBuilder.forForm(trigger.triggerSourceId);
        if(trigger.eventName === 'formSubmit'){
          spreadsheetTriggerBuilder.onFormSubmit();
        }
        spreadsheetTriggerBuilder.create();
      }
    });
  }
};

class FormCollaboratorDairy{
  private parameters: ParametersType;
  private data: SheetData;
  private form: GoogleAppsScript.Forms.Form;
  constructor(parameters: ParametersType){
    this.parameters = parameters;
    this.data = new SheetData(parameters)
    this.form = null as unknown as GoogleAppsScript.Forms.Form;
  }

  createOrUpdateForm() {
    this.form = this.getOrCreateForm();
    this.updateFormSettings();
    this.removeUnusedQuestions();
    this.addOrUpdateQuestionCollaborator();
    this.addOrUpdateQuestionWorker();
    this.addOrUpdateQuestionDate();
    this.addOrUpdateQuestionAnnotation();
  }

  private getOrCreateForm() {
    if(this.parameters.formCollaboratorDairy.id){
      const formFound = FormApp.openById(this.parameters.formCollaboratorDairy.id);
      if(formFound){
        return formFound;
      }
    }
    const newForm = FormApp.create(this.parameters.formCollaboratorDairy.title);

    const sheetParameters = UtilitiesSpreadsheet.getSheetByName(this.parameters.sheets.parameters);
    sheetParameters.getRange(namedCellFormCollaboratorDairyId).setValue(newForm.getId());
    return newForm;
  }

  private updateFormSettings(){
    // form.setRequireLogin(true);
    this.form.setAllowResponseEdits(false);
    this.form.setLimitOneResponsePerUser(false);
    this.form.setShowLinkToRespondAgain(true);
    this.form.setCollectEmail(false);
    this.form.setTitle(this.parameters.formCollaboratorDairy.title);
  }

  private removeUnusedQuestions() {
    const formQuestionsTitles = Object
      .keys(this.parameters.formCollaboratorDairy.questions)
      .map(key => (this.parameters.formCollaboratorDairy.questions as any)[key] as string);
    return FormUtilities.removeQuestionsByCondition(this.form, item => 
      formQuestionsTitles.indexOf(item.getTitle()) === -1
    ); 
  }

  private addOrUpdateQuestionCollaborator() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, this.parameters.formCollaboratorDairy.questions.collaborator)
    item.setRequired(true);
    var collaboratorsActive = this.data.collaborators.filter(item => item.status == 'Ativo');
    var choices = collaboratorsActive.map(function (collaborator){
      return item.createChoice(collaborator.code + ' - ' + collaborator.name);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
  }

  private addOrUpdateQuestionWorker() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, this.parameters.formCollaboratorDairy.questions.worker)
    item.setRequired(true);
    var workersActive = this.data.workers.filter(item => item.status == 'Ativo');
    var choices = workersActive.map(function (worker) {
      return item.createChoice(worker.code + ' - ' + worker.title + ' - ' + worker.client);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
  }

  private addOrUpdateQuestionDate() {
    var item = FormUtilities.getOrCreateDateItem(this.form, this.parameters.formCollaboratorDairy.questions.date);
    item.setRequired(false);
    item.setIncludesYear(true);
  }

  private addOrUpdateQuestionAnnotation() {
    var item = FormUtilities.getOrCreateTextItem(this.form, this.parameters.formCollaboratorDairy.questions.annotation)
    item.setRequired(false);
  }

  public onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit){
    const infoResponse = this.getInfoResponse(event)
    const sheet = UtilitiesSpreadsheet.getSheetByName(this.parameters.sheets.collaboratorsDairy);
    const dataRange = sheet.getDataRange();
    const numLine = dataRange.getRowIndex() + dataRange.getNumRows()
    sheet.getRange(numLine, 1).setValue(Utilities.formatDate(infoResponse.date, "America/Sao_Paulo", "dd/MM/yyyy"));
    sheet.getRange(numLine, 2).setValue(infoResponse.collaborator.code);
    sheet.getRange(numLine, 3).setFormula(`=VLOOKUP(B${numLine};TABELA_COLABORADOR;2;True)`);
    sheet.getRange(numLine, 4).setNumberFormat("[$R$ ]#,##0.00");
    sheet.getRange(numLine, 4).setValue(infoResponse.collaborator.dailyRate);
    sheet.getRange(numLine, 5).setValue(infoResponse.worker.code);
    sheet.getRange(numLine, 6).setFormula(`=VLOOKUP(E${numLine};TABELA_OBRAS;2;True)`);
    sheet.getRange(numLine, 7).setFormula(`=VLOOKUP(E${numLine};TABELA_OBRAS;3;True)`);
    sheet.getRange(numLine, 8).setValue(infoResponse.annotation);
  }
  private getInfoResponse(event: GoogleAppsScript.Events.FormsOnFormSubmit){
    const itemResponses = event.response.getItemResponses();
    const collaboratorCode = (itemResponses[0].getResponse() as string).split(' - ')[0];
    const workerCode = (itemResponses[1].getResponse() as string).split(' - ')[0];
    const dateString = itemResponses[2].getResponse() as string;
    const date = FormUtilities.getDateResponse(dateString);
    const annotation = itemResponses[3].getResponse();

    const collaborator = this.data.getCollaboratorByCode(collaboratorCode);
    const worker = this.data.getWorkerByCode(workerCode);
    return {
      collaborator,
      worker,
      date,
      annotation,
    }
  }
}

class FormCollaboratorPayment{
  private parameters: ParametersType;
  private data: SheetData;
  private form: GoogleAppsScript.Forms.Form;
  constructor(parameters: ParametersType){
    this.parameters = parameters;
    this.data = new SheetData(parameters)
    this.form = null as unknown as GoogleAppsScript.Forms.Form;
  }

  createOrUpdateForm() {
    this.form = this.getOrCreateForm();
    this.updateFormSettings();
    this.removeUnusedQuestions();
    this.addOrUpdateQuestionDate();
    this.addOrUpdateQuestionCollaborator();
    this.addOrUpdateQuestionType();
    this.addOrUpdateQuestionValue();
    this.addOrUpdateQuestionAnnotation();
  }

  private getOrCreateForm() {
    if(this.parameters.formCollaboratorPayment.id){
      const formFound = FormApp.openById(this.parameters.formCollaboratorPayment.id);
      if(formFound){
        return formFound;
      }
    }
    const newForm = FormApp.create(this.parameters.formCollaboratorPayment.title);

    const sheetParameters = UtilitiesSpreadsheet.getSheetByName(this.parameters.sheets.parameters);
    sheetParameters.getRange(namedCellFormCollaboratorPaymentId).setValue(newForm.getId());
    return newForm;
  }

  private updateFormSettings(){
    this.form.setAllowResponseEdits(false);
    this.form.setLimitOneResponsePerUser(false);
    this.form.setShowLinkToRespondAgain(true);
    this.form.setCollectEmail(false);
    this.form.setTitle(this.parameters.formCollaboratorPayment.title);
  }

  private removeUnusedQuestions() {
    const formQuestionsTitles = Object
      .keys(this.parameters.formCollaboratorPayment.questions)
      .filter(key => key !== 'typeOptions')
      .map(key => (this.parameters.formCollaboratorPayment.questions as any)[key] as string);
    return FormUtilities.removeQuestionsByCondition(this.form, item => 
      formQuestionsTitles.indexOf(item.getTitle()) === -1
    ); 
  }

  private addOrUpdateQuestionDate() {
    var item = FormUtilities.getOrCreateDateItem(this.form, this.parameters.formCollaboratorPayment.questions.date);
    item.setRequired(false);
    item.setIncludesYear(true);
  }

  private addOrUpdateQuestionCollaborator() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, this.parameters.formCollaboratorPayment.questions.collaborator)
    item.setRequired(true);
    var collaboratorsActive = this.data.collaborators.filter(item => item.status == 'Ativo');
    var choices = collaboratorsActive.map(function (collaborator){
      return item.createChoice(collaborator.code + ' - ' + collaborator.name);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
  }

  private addOrUpdateQuestionType() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, this.parameters.formCollaboratorPayment.questions.type)
    item.setRequired(true);
    var choices = this.parameters.formCollaboratorPayment.questions.typeOptions.map(function (typeOption) {
      return item.createChoice(typeOption);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
  }

  private addOrUpdateQuestionValue() {
    var item = FormUtilities.getOrCreateTextItem(this.form, this.parameters.formCollaboratorPayment.questions.value)
    item.setValidation(
      (FormApp.createTextValidation()
        .requireNumberGreaterThan(0) as any)
      .setHelpText('Informe um valor maior que zero')
      .build()
    )
    item.setRequired(true);
  }

  private addOrUpdateQuestionAnnotation() {
    var item = FormUtilities.getOrCreateTextItem(this.form, this.parameters.formCollaboratorPayment.questions.annotation)
    item.setRequired(false);
  }

  public onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit){
    const infoResponse = this.getInfoResponse(event)
    const sheet = UtilitiesSpreadsheet.getSheetByName(this.parameters.sheets.collaboratorsPayments);
    const dataRange = sheet.getDataRange();
    const numLine = dataRange.getRowIndex() + dataRange.getNumRows()
    sheet.getRange(numLine, 1).setValue(Utilities.formatDate(infoResponse.date, "America/Sao_Paulo", "dd/MM/yyyy"));
    sheet.getRange(numLine, 2).setValue(infoResponse.collaborator.code);
    sheet.getRange(numLine, 3).setFormula(`=VLOOKUP(B${numLine};TABELA_COLABORADOR;2;True)`);
    sheet.getRange(numLine, 4).setValue(infoResponse.type);
    sheet.getRange(numLine, 5).setNumberFormat("[$R$ ]#,##0.00");
    sheet.getRange(numLine, 5).setValue(infoResponse.value);
    sheet.getRange(numLine, 6).setValue(infoResponse.annotation);
  }

  private getInfoResponse(event: GoogleAppsScript.Events.FormsOnFormSubmit){
    const itemResponses = event.response.getItemResponses();
    const dateString = itemResponses[0].getResponse() as string;
    const date = FormUtilities.getDateResponse(dateString);
    const collaboratorCode = (itemResponses[1].getResponse() as string).split(' - ')[0];
    const type = itemResponses[2].getResponse() as string;
    const value = parseFloat(itemResponses[3].getResponse() as string);
    const annotation = itemResponses[4].getResponse();

    const collaborator = this.data.getCollaboratorByCode(collaboratorCode);
    return {
      date,
      collaborator,
      type,
      value,
      annotation,
    }
  }
}

class FormWorkExpense{
  private parameters: ParametersType;
  private data: SheetData;
  private form: GoogleAppsScript.Forms.Form;
  constructor(parameters: ParametersType){
    this.parameters = parameters;
    this.data = new SheetData(parameters)
    this.form = null as unknown as GoogleAppsScript.Forms.Form;
  }

  createOrUpdateForm() {
    this.form = this.getOrCreateForm();
    this.updateFormSettings();
    this.removeUnusedQuestions();
    this.addOrUpdateQuestionDate();
    this.addOrUpdateQuestionValue();
    this.addOrUpdateQuestionAnnotation();
    this.addOrUpdateQuestionPaidByCollaborator();
    this.addOrUpdateQuestionCollaborator();
  }

  private getOrCreateForm() {
    if(this.parameters.formWorkExpense.id){
      const formFound = FormApp.openById(this.parameters.formWorkExpense.id);
      if(formFound){
        return formFound;
      }
    }
    const newForm = FormApp.create(this.parameters.formWorkExpense.title);

    const sheetParameters = UtilitiesSpreadsheet.getSheetByName(this.parameters.sheets.parameters);
    sheetParameters.getRange(namedCellFormWorkExpenseId).setValue(newForm.getId());
    return newForm;
  }

  private updateFormSettings(){
    this.form.setAllowResponseEdits(false);
    this.form.setLimitOneResponsePerUser(false);
    this.form.setShowLinkToRespondAgain(true);
    this.form.setCollectEmail(false);
    this.form.setTitle(this.parameters.formWorkExpense.title);
  }

  private removeUnusedQuestions() {
    const formQuestionsTitles = Object
      .keys(this.parameters.formWorkExpense.questions)
      .map(key => (this.parameters.formWorkExpense.questions as any)[key] as string);
    return FormUtilities.removeQuestionsByCondition(this.form, item => 
      formQuestionsTitles.indexOf(item.getTitle()) === -1
    ); 
  }

  private addOrUpdateQuestionDate() {
    var item = FormUtilities.getOrCreateDateItem(this.form, this.parameters.formWorkExpense.questions.date);
    item.setRequired(false);
    item.setIncludesYear(true);
  }

  private addOrUpdateQuestionValue() {
    var item = FormUtilities.getOrCreateTextItem(this.form, this.parameters.formWorkExpense.questions.value)
    item.setValidation(
      (FormApp.createTextValidation()
        .requireNumberGreaterThan(0) as any)
      .setHelpText('Informe um valor maior que zero')
      .build()
    )
    item.setRequired(true);
  }

  private addOrUpdateQuestionAnnotation() {
    var item = FormUtilities.getOrCreateTextItem(this.form, this.parameters.formWorkExpense.questions.annotation)
    item.setRequired(false);
  }

  private addOrUpdateQuestionPaidByCollaborator() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, this.parameters.formWorkExpense.questions.paidByCollaborator)
    item.setRequired(true);
    const options = ['Sim', 'Não'];
    var choices = options.map(function (option) {
      return item.createChoice(option);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
  }

  private addOrUpdateQuestionCollaborator() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, this.parameters.formWorkExpense.questions.collaborator)
    item.setRequired(false);
    var collaboratorsActive = this.data.collaborators.filter(item => item.status == 'Ativo');
    var choices = collaboratorsActive.map(function (collaborator){
      return item.createChoice(collaborator.code + ' - ' + collaborator.name);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
  }

  public onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit){
    const infoResponse = this.getInfoResponse(event)
    const addCollaboratorInfo = (
      infoResponse.paidByCollaborator === 'Sim'
      && !!infoResponse.collaborator
    );
    const sheet = UtilitiesSpreadsheet.getSheetByName(this.parameters.sheets.workersExpensives);
    const dataRange = sheet.getDataRange();
    const numLine = dataRange.getRowIndex() + dataRange.getNumRows()
    sheet.getRange(numLine, 1).setValue(Utilities.formatDate(infoResponse.date, "America/Sao_Paulo", "dd/MM/yyyy"));
    sheet.getRange(numLine, 2).setNumberFormat("[$R$ ]#,##0.00");
    sheet.getRange(numLine, 2).setValue(infoResponse.value);
    sheet.getRange(numLine, 3).setValue(infoResponse.annotation);
    sheet.getRange(numLine, 4).setValue(infoResponse.paidByCollaborator);
    sheet.getRange(numLine, 5).setValue(addCollaboratorInfo?infoResponse.collaborator?.code:'');
    sheet.getRange(numLine, 6).setFormula(`=if(E${numLine}<>"";VLOOKUP(E${numLine};TABELA_COLABORADOR;2;True);"")`);
  }
  private getInfoResponse(event: GoogleAppsScript.Events.FormsOnFormSubmit){
    const itemResponses = event.response.getItemResponses();
    const dateString = itemResponses[0].getResponse() as string;
    const date = FormUtilities.getDateResponse(dateString);
    const value = parseFloat(itemResponses[1].getResponse() as string);
    const annotation = itemResponses[2].getResponse();
    const paidByCollaborator = itemResponses[3].getResponse() as string;
    let collaborator = null;
    if (itemResponses[4]){
      const collaboratorCode = (itemResponses[4].getResponse() as string).split(' - ')[0];
  
      collaborator = this.data.getCollaboratorByCode(collaboratorCode);
    }
    return {
      date,
      value,
      annotation,
      paidByCollaborator,
      collaborator,
    }
  }
}

function onEditSpreadsheet() {
  const parameters = getParameters();
  const formCollaboratorDairy = new FormCollaboratorDairy(parameters);
  const formCollaboratorPayment = new FormCollaboratorPayment(parameters);
  const formWorkExpense = new FormWorkExpense(parameters);
  formCollaboratorDairy.createOrUpdateForm();
  formCollaboratorPayment.createOrUpdateForm();
  formWorkExpense.createOrUpdateForm();
}

function onSubmitFormCollaboratorDairy(event: GoogleAppsScript.Events.FormsOnFormSubmit) {
  const parameters = getParameters();
  const form = new FormCollaboratorDairy(parameters);
  form.onFormSubmit(event);
}
function onSubmitFormCollaboratorPayment(event: GoogleAppsScript.Events.FormsOnFormSubmit) {
  const parameters = getParameters();
  const form = new FormCollaboratorPayment(parameters);
  form.onFormSubmit(event);
}
function onSubmitFormWorkExpense(event: GoogleAppsScript.Events.FormsOnFormSubmit) {
  const parameters = getParameters();
  const form = new FormWorkExpense(parameters);
  form.onFormSubmit(event);
}

function createTriggers() {
  const parameters = getParameters();
  const triggersToSet = [
    {
      triggerSourceId: SpreadsheetApp.getActiveSpreadsheet().getId(),
      triggerSource: ScriptApp.TriggerSource.SPREADSHEETS,
      functionName: 'onEditSpreadsheet',
      eventName: 'edit',
    },
    {
      triggerSourceId: parameters.formCollaboratorDairy.id,
      triggerSource: ScriptApp.TriggerSource.FORMS,
      functionName: 'onSubmitFormCollaboratorDairy',
      eventName: 'formSubmit',
    },
    {
      triggerSourceId: parameters.formCollaboratorPayment.id,
      triggerSource: ScriptApp.TriggerSource.FORMS,
      functionName: 'onSubmitFormCollaboratorPayment',
      eventName: 'formSubmit',
    },
    {
      triggerSourceId: parameters.formWorkExpense.id,
      triggerSource: ScriptApp.TriggerSource.FORMS,
      functionName: 'onSubmitFormWorkExpense',
      eventName: 'formSubmit',
    },
  ];
  UtilitiesScript.createTriggers(triggersToSet);
}
