const sheets = {
  parameters: 'Parâmetros',
  passwords: 'Senhas',
  collaborators: 'Colaboradores',
  workers: 'Obras',
  collaboratorsDairy: 'Diárias dos Colaboradores',
  collaboratorsPayments: 'Pagamento dos Colaboradores',
  workersExpensives: 'Despesas com Obras',
  customersReceipts: 'Recebimentos por Cliente',
};
const namedRange = {
  formCollaboratorDairyId: 'FORM_COLLABORATOR_DAIRY_ID',
  formCollaboratorPaymentId: 'FORM_COLLABORATOR_PAYMENT_ID',
  formWorkExpenseId: 'FORM_WORK_EXPENSE_ID',
  tableCollaborator: 'TABELA_COLABORADOR',
  tableWorkers: 'TABELA_OBRAS',
  tableCollaboratorDairy: 'TABELA_DIARIA_COLABORADOR',
  tableCollaboratorPayment: 'TABELA_PAGAMENTO_COLABORADOR',
  tableWorkerExpensive: 'TABELA_DESPESA_OBRA',
  tableCustomerReceipts: 'TABLE_RECEBIMENTO_CLIENTE',
}
type ParametersType = {
  questionPassword: string;
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
type Password = {
  password: string;
  identity: string;
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

const activeSpreadsheet = {
  data: null as null | GoogleAppsScript.Spreadsheet.Spreadsheet,
};
function getActiveSpreadsheet(){
  if(!activeSpreadsheet.data){
    activeSpreadsheet.data = SpreadsheetApp.getActiveSpreadsheet();
  }
  return activeSpreadsheet.data;
}
function getParameters(): ParametersType{
  const sheetParametersObj = UtilitiesSpreadsheet.getSheetByName(sheets.parameters);
  const getValue = (namedCell: string) => sheetParametersObj.getRange(namedCell).getValue() as string
  return {
    questionPassword: getValue('QUESTION_PASSWORD'),
    formCollaboratorDairy: {
      id: getValue(namedRange.formCollaboratorDairyId),
      title: getValue('FORM_COLLABORATOR_DAIRY_TITLE'),
      questions: {
        collaborator: getValue('FORM_COLLABORATOR_DAIRY_QUESTION_COLLABORATOR'),
        worker: getValue('FORM_COLLABORATOR_DAIRY_QUESTION_WORKER'),
        date: getValue('FORM_COLLABORATOR_DAIRY_QUESTION_DATE'),
        annotation: getValue('FORM_COLLABORATOR_DAIRY_QUESTION_ANNOTATION'),
      },
    },
    formCollaboratorPayment: {
      id: getValue(namedRange.formCollaboratorPaymentId),
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
      id: getValue(namedRange.formWorkExpenseId),
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
    const sheet = getActiveSpreadsheet().getSheetByName(sheetName);
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
  private _passwords: undefined | Password[];
  private _collaborators: undefined | Collaborator[];
  private _workers: undefined | WorkerData[];
  constructor(){
    this._passwords = undefined;
    this._collaborators = undefined;
    this._workers = undefined;
  }
  get passwords(){
    if(!this._passwords){
      this._passwords =
      UtilitiesSpreadsheet.getDataBySheetName(sheets.passwords)
        .filter((value, index) => index > 0)
        .map(item => ({
          password: item[0],
          identity: item[1],
        } as Password));
    }
    return this._passwords;
  }
  isValidPassword(password: string) {
    return !!this.passwords.find(item => item.password === password);
  }
  get collaborators(){
    if(!this._collaborators){
      this._collaborators =
      UtilitiesSpreadsheet.getDataBySheetName(sheets.collaborators)
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
      UtilitiesSpreadsheet.getDataBySheetName(sheets.workers)
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
  getItemByQuestionTitleAndIndex: function(form: GoogleAppsScript.Forms.Form, questionTitle: string, questionIndex: number){
    return form.getItems().find((item, index) => questionTitle == item.getTitle() && index === questionIndex);
  },
  removeItemsMoreThanOrEqualIndex: function(form: GoogleAppsScript.Forms.Form, questionIndex: number){
    form.getItems().filter((item, index) => index >= questionIndex).forEach(item => {
      form.deleteItem(item);
    });
  },
  getOrCreateMultipleChoiceItem: function(form: GoogleAppsScript.Forms.Form, questionTitle: string, questionIndex: number){
    const itemFound = this.getItemByQuestionTitleAndIndex(form, questionTitle, questionIndex);
    if (itemFound){
      return itemFound.asMultipleChoiceItem();
    } else {
      this.removeItemsMoreThanOrEqualIndex(form, questionIndex);
      const item = form.addMultipleChoiceItem();
      item.setTitle(questionTitle);
      return item;
    }
  },
  getOrCreateDateItem: function(form: GoogleAppsScript.Forms.Form, questionTitle: string, questionIndex: number){
    const itemFound = this.getItemByQuestionTitleAndIndex(form, questionTitle, questionIndex);
    if (itemFound){
      return itemFound.asDateItem();
    } else {
      this.removeItemsMoreThanOrEqualIndex(form, questionIndex);
      const item = form.addDateItem();
      item.setTitle(questionTitle);
      return item;
    }
  },
  getOrCreateTextItem: function(form: GoogleAppsScript.Forms.Form, questionTitle: string, questionIndex: number){
    const itemFound = this.getItemByQuestionTitleAndIndex(form, questionTitle, questionIndex);
    if (itemFound){
      return itemFound.asTextItem();
    } else {
      this.removeItemsMoreThanOrEqualIndex(form, questionIndex);
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
  createTriggersNotFound: function(triggersToSet: Trigger[]){
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
  private questionIndex: number;
  constructor(parameters: ParametersType){
    this.parameters = parameters;
    this.data = new SheetData()
    this.form = null as unknown as GoogleAppsScript.Forms.Form;
    this.questionIndex = 0;
  }

  createOrUpdateForm() {
    this.form = this.getOrCreateForm();
    this.updateFormSettings();
    this.addOrUpdateQuestionPassword();
    this.addOrUpdateQuestionCollaborator();
    this.addOrUpdateQuestionWorker();
    this.addOrUpdateQuestionDate();
    this.addOrUpdateQuestionAnnotation();
    this.removeUnusedQuestions();
  }

  private getOrCreateForm() {
    if(this.parameters.formCollaboratorDairy.id){
      const formFound = FormApp.openById(this.parameters.formCollaboratorDairy.id);
      if(formFound){
        return formFound;
      }
    }
    const newForm = FormApp.create(this.parameters.formCollaboratorDairy.title);

    const sheetParameters = UtilitiesSpreadsheet.getSheetByName(sheets.parameters);
    sheetParameters.getRange(namedRange.formCollaboratorDairyId).setValue(newForm.getId());
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
    FormUtilities.removeItemsMoreThanOrEqualIndex(this.form, this.questionIndex);
  }

  private addOrUpdateQuestionPassword() {
    var item = FormUtilities.getOrCreateTextItem(this.form, this.parameters.questionPassword, this.questionIndex)
    item.setRequired(true);
    this.questionIndex++;
  }

  private addOrUpdateQuestionCollaborator() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, this.parameters.formCollaboratorDairy.questions.collaborator, this.questionIndex)
    item.setRequired(true);
    var collaboratorsActive = this.data.collaborators.filter(item => item.status == 'Ativo');
    var choices = collaboratorsActive.map(function (collaborator){
      return item.createChoice(collaborator.code + ' - ' + collaborator.name);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
    this.questionIndex++;
  }

  private addOrUpdateQuestionWorker() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, this.parameters.formCollaboratorDairy.questions.worker, this.questionIndex)
    item.setRequired(true);
    var workersActive = this.data.workers.filter(item => item.status == 'Ativo');
    var choices = workersActive.map(function (worker) {
      return item.createChoice(worker.code + ' - ' + worker.title + ' - ' + worker.client);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
    this.questionIndex++;
  }

  private addOrUpdateQuestionDate() {
    var item = FormUtilities.getOrCreateDateItem(this.form, this.parameters.formCollaboratorDairy.questions.date, this.questionIndex);
    item.setRequired(false);
    item.setIncludesYear(true);
    this.questionIndex++;
  }

  private addOrUpdateQuestionAnnotation() {
    var item = FormUtilities.getOrCreateTextItem(this.form, this.parameters.formCollaboratorDairy.questions.annotation, this.questionIndex)
    item.setRequired(false);
    this.questionIndex++;
  }

  public onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit){
    const infoResponse = this.getInfoResponse(event);
    if(!this.data.isValidPassword(infoResponse.password)){
      Logger.log("Submited form with invalid password!");
      return;
    }
    const sheet = UtilitiesSpreadsheet.getSheetByName(sheets.collaboratorsDairy);
    const dataRange = sheet.getDataRange();
    const numLine = dataRange.getRowIndex() + dataRange.getNumRows()
    sheet.getRange(numLine, 1).setValue(Utilities.formatDate(infoResponse.date, "America/Sao_Paulo", "dd/MM/yyyy"));
    sheet.getRange(numLine, 2).setValue(infoResponse.collaborator.code);
    sheet.getRange(numLine, 3).setFormula(`=VLOOKUP(B${numLine};${namedRange.tableCollaborator};2;False)`);
    sheet.getRange(numLine, 4).setNumberFormat("[$R$ ]#,##0.00");
    sheet.getRange(numLine, 4).setValue(infoResponse.collaborator.dailyRate);
    sheet.getRange(numLine, 5).setValue(infoResponse.worker.code);
    sheet.getRange(numLine, 6).setFormula(`=VLOOKUP(E${numLine};TABELA_OBRAS;2;False)`);
    sheet.getRange(numLine, 7).setFormula(`=VLOOKUP(E${numLine};TABELA_OBRAS;3;False)`);
    sheet.getRange(numLine, 8).setValue(infoResponse.annotation);
  }
  private getInfoResponse(event: GoogleAppsScript.Events.FormsOnFormSubmit){
    const itemResponses = event.response.getItemResponses();
    const password = (itemResponses[0].getResponse() as string);
    const collaboratorCode = (itemResponses[1].getResponse() as string).split(' - ')[0];
    const workerCode = (itemResponses[2].getResponse() as string).split(' - ')[0];
    const dateString = itemResponses[3].getResponse() as string;
    const date = FormUtilities.getDateResponse(dateString);
    const annotation = itemResponses[4].getResponse();

    const collaborator = this.data.getCollaboratorByCode(collaboratorCode);
    const worker = this.data.getWorkerByCode(workerCode);
    return {
      password,
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
  private questionIndex: number;
  constructor(parameters: ParametersType){
    this.parameters = parameters;
    this.data = new SheetData()
    this.form = null as unknown as GoogleAppsScript.Forms.Form;
    this.questionIndex = 0;
  }

  createOrUpdateForm() {
    this.form = this.getOrCreateForm();
    this.updateFormSettings();
    this.addOrUpdateQuestionPassword();
    this.addOrUpdateQuestionDate();
    this.addOrUpdateQuestionCollaborator();
    this.addOrUpdateQuestionType();
    this.addOrUpdateQuestionValue();
    this.addOrUpdateQuestionAnnotation();
    this.removeUnusedQuestions();
  }

  private getOrCreateForm() {
    if(this.parameters.formCollaboratorPayment.id){
      const formFound = FormApp.openById(this.parameters.formCollaboratorPayment.id);
      if(formFound){
        return formFound;
      }
    }
    const newForm = FormApp.create(this.parameters.formCollaboratorPayment.title);

    const sheetParameters = UtilitiesSpreadsheet.getSheetByName(sheets.parameters);
    sheetParameters.getRange(namedRange.formCollaboratorPaymentId).setValue(newForm.getId());
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
    FormUtilities.removeItemsMoreThanOrEqualIndex(this.form, this.questionIndex);
  }

  private addOrUpdateQuestionPassword() {
    var item = FormUtilities.getOrCreateTextItem(this.form, this.parameters.questionPassword, this.questionIndex);
    item.setRequired(true);
    this.questionIndex++;
  }

  private addOrUpdateQuestionDate() {
    var item = FormUtilities.getOrCreateDateItem(this.form, this.parameters.formCollaboratorPayment.questions.date, this.questionIndex);
    item.setRequired(false);
    item.setIncludesYear(true);
    this.questionIndex++;
  }

  private addOrUpdateQuestionCollaborator() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, this.parameters.formCollaboratorPayment.questions.collaborator, this.questionIndex);
    item.setRequired(true);
    var collaboratorsActive = this.data.collaborators.filter(item => item.status == 'Ativo');
    var choices = collaboratorsActive.map(function (collaborator){
      return item.createChoice(collaborator.code + ' - ' + collaborator.name);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
    this.questionIndex++;
  }

  private addOrUpdateQuestionType() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, this.parameters.formCollaboratorPayment.questions.type, this.questionIndex);
    item.setRequired(true);
    var choices = this.parameters.formCollaboratorPayment.questions.typeOptions.map(function (typeOption) {
      return item.createChoice(typeOption);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
    this.questionIndex++;
  }

  private addOrUpdateQuestionValue() {
    var item = FormUtilities.getOrCreateTextItem(this.form, this.parameters.formCollaboratorPayment.questions.value, this.questionIndex);
    item.setValidation(
      (FormApp.createTextValidation()
      .requireNumberGreaterThan(0) as any)
      .setHelpText('Informe um valor maior que zero')
      .build()
    );
    item.setRequired(true);
    this.questionIndex++;
  }

  private addOrUpdateQuestionAnnotation() {
    var item = FormUtilities.getOrCreateTextItem(this.form, this.parameters.formCollaboratorPayment.questions.annotation, this.questionIndex);
    item.setRequired(false);
    this.questionIndex++;
  }

  public onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit){
    const infoResponse = this.getInfoResponse(event);
    if(!this.data.isValidPassword(infoResponse.password)){
      Logger.log("Submited form with invalid password!");
      return;
    }
    const sheet = UtilitiesSpreadsheet.getSheetByName(sheets.collaboratorsPayments);
    const dataRange = sheet.getDataRange();
    const numLine = dataRange.getRowIndex() + dataRange.getNumRows()
    sheet.getRange(numLine, 1).setValue(Utilities.formatDate(infoResponse.date, "America/Sao_Paulo", "dd/MM/yyyy"));
    sheet.getRange(numLine, 2).setValue(infoResponse.collaborator.code);
    sheet.getRange(numLine, 3).setFormula(`=VLOOKUP(B${numLine};${namedRange.tableCollaborator};2;False)`);
    sheet.getRange(numLine, 4).setValue(infoResponse.type);
    sheet.getRange(numLine, 5).setNumberFormat("[$R$ ]#,##0.00");
    sheet.getRange(numLine, 5).setValue(infoResponse.value);
    sheet.getRange(numLine, 6).setValue(infoResponse.annotation);
  }

  private getInfoResponse(event: GoogleAppsScript.Events.FormsOnFormSubmit){
    const itemResponses = event.response.getItemResponses();
    const password = (itemResponses[0].getResponse() as string);
    const dateString = itemResponses[1].getResponse() as string;
    const date = FormUtilities.getDateResponse(dateString);
    const collaboratorCode = (itemResponses[2].getResponse() as string).split(' - ')[0];
    const type = itemResponses[3].getResponse() as string;
    const value = parseFloat(itemResponses[4].getResponse() as string);
    const annotation = itemResponses[5].getResponse();

    const collaborator = this.data.getCollaboratorByCode(collaboratorCode);
    return {
      password,
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
  private questionIndex: number;
  constructor(parameters: ParametersType){
    this.parameters = parameters;
    this.data = new SheetData()
    this.form = null as unknown as GoogleAppsScript.Forms.Form;
    this.questionIndex = 0;
  }

  createOrUpdateForm() {
    this.form = this.getOrCreateForm();
    this.updateFormSettings();
    this.addOrUpdateQuestionPassword();
    this.addOrUpdateQuestionDate();
    this.addOrUpdateQuestionValue();
    this.addOrUpdateQuestionAnnotation();
    this.addOrUpdateQuestionPaidByCollaborator();
    this.addOrUpdateQuestionCollaborator();
    this.removeUnusedQuestions();
  }

  private getOrCreateForm() {
    if(this.parameters.formWorkExpense.id){
      const formFound = FormApp.openById(this.parameters.formWorkExpense.id);
      if(formFound){
        return formFound;
      }
    }
    const newForm = FormApp.create(this.parameters.formWorkExpense.title);

    const sheetParameters = UtilitiesSpreadsheet.getSheetByName(sheets.parameters);
    sheetParameters.getRange(namedRange.formWorkExpenseId).setValue(newForm.getId());
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
    FormUtilities.removeItemsMoreThanOrEqualIndex(this.form, this.questionIndex);
  }

  private addOrUpdateQuestionPassword() {
    var item = FormUtilities.getOrCreateTextItem(this.form, this.parameters.questionPassword, this.questionIndex)
    item.setRequired(true);
    this.questionIndex++;
  }

  private addOrUpdateQuestionDate() {
    var item = FormUtilities.getOrCreateDateItem(this.form, this.parameters.formWorkExpense.questions.date, this.questionIndex);
    item.setRequired(false);
    item.setIncludesYear(true);
    this.questionIndex++;
  }

  private addOrUpdateQuestionValue() {
    var item = FormUtilities.getOrCreateTextItem(this.form, this.parameters.formWorkExpense.questions.value, this.questionIndex)
    item.setValidation(
      (FormApp.createTextValidation()
        .requireNumberGreaterThan(0) as any)
      .setHelpText('Informe um valor maior que zero')
      .build()
    )
    item.setRequired(true);
    this.questionIndex++;
  }

  private addOrUpdateQuestionAnnotation() {
    var item = FormUtilities.getOrCreateTextItem(this.form, this.parameters.formWorkExpense.questions.annotation, this.questionIndex)
    item.setRequired(false);
    this.questionIndex++;
  }

  private addOrUpdateQuestionPaidByCollaborator() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, this.parameters.formWorkExpense.questions.paidByCollaborator, this.questionIndex)
    item.setRequired(true);
    const options = ['Sim', 'Não'];
    var choices = options.map(function (option) {
      return item.createChoice(option);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
    this.questionIndex++;
  }

  private addOrUpdateQuestionCollaborator() {
    const item = FormUtilities.getOrCreateMultipleChoiceItem(this.form, this.parameters.formWorkExpense.questions.collaborator, this.questionIndex)
    item.setRequired(false);
    var collaboratorsActive = this.data.collaborators.filter(item => item.status == 'Ativo');
    var choices = collaboratorsActive.map(function (collaborator){
      return item.createChoice(collaborator.code + ' - ' + collaborator.name);
    });
    FormUtilities.setChoicesOnFormItem(this.form, item, choices)
    this.questionIndex++;
  }

  public onFormSubmit(event: GoogleAppsScript.Events.FormsOnFormSubmit){
    const infoResponse = this.getInfoResponse(event);
    if(!this.data.isValidPassword(infoResponse.password)){
      Logger.log("Submited form with invalid password!");
      return;
    }
    const addCollaboratorInfo = (
      infoResponse.paidByCollaborator === 'Sim'
      && !!infoResponse.collaborator
    );
    const sheet = UtilitiesSpreadsheet.getSheetByName(sheets.workersExpensives);
    const dataRange = sheet.getDataRange();
    const numLine = dataRange.getRowIndex() + dataRange.getNumRows()
    sheet.getRange(numLine, 1).setValue(Utilities.formatDate(infoResponse.date, "America/Sao_Paulo", "dd/MM/yyyy"));
    sheet.getRange(numLine, 2).setNumberFormat("[$R$ ]#,##0.00");
    sheet.getRange(numLine, 2).setValue(infoResponse.value);
    sheet.getRange(numLine, 3).setValue(infoResponse.annotation);
    sheet.getRange(numLine, 4).setValue(infoResponse.paidByCollaborator);
    sheet.getRange(numLine, 5).setValue(addCollaboratorInfo?infoResponse.collaborator?.code:'');
    sheet.getRange(numLine, 6).setFormula(`=if(E${numLine}<>"";VLOOKUP(E${numLine};${namedRange.tableCollaborator};2;False);"")`);
  }
  private getInfoResponse(event: GoogleAppsScript.Events.FormsOnFormSubmit){
    const itemResponses = event.response.getItemResponses();
    const password = (itemResponses[0].getResponse() as string);
    const dateString = itemResponses[1].getResponse() as string;
    const date = FormUtilities.getDateResponse(dateString);
    const value = parseFloat(itemResponses[2].getResponse() as string);
    const annotation = itemResponses[3].getResponse();
    const paidByCollaborator = itemResponses[4].getResponse() as string;
    let collaborator = null;
    if (itemResponses[5]){
      const collaboratorCode = (itemResponses[5].getResponse() as string).split(' - ')[0];
  
      collaborator = this.data.getCollaboratorByCode(collaboratorCode);
    }
    return {
      password,
      date,
      value,
      annotation,
      paidByCollaborator,
      collaborator,
    }
  }
}
function updateNamedRanges(sheetNameChanged: string) {
  const sheetsToNamedRanges = [
    {sheetName: sheets.collaborators, namedRange: namedRange.tableCollaborator},
    {sheetName: sheets.workers, namedRange: namedRange.tableWorkers},
    {sheetName: sheets.collaboratorsDairy, namedRange: namedRange.tableCollaboratorDairy},
    {sheetName: sheets.collaboratorsPayments, namedRange: namedRange.tableCollaboratorPayment},
    {sheetName: sheets.workersExpensives, namedRange: namedRange.tableWorkerExpensive},
    {sheetName: sheets.customersReceipts, namedRange: namedRange.tableCustomerReceipts},
  ];
  const itemToUpdate = sheetsToNamedRanges.find(item => item.sheetName === sheetNameChanged);
  if(itemToUpdate){
    Logger.log('found itemToUpdate');
    const namedRanges = getActiveSpreadsheet().getNamedRanges();
    const namedRange = namedRanges.find(range => range.getName() === itemToUpdate.namedRange);
    const newRange = UtilitiesSpreadsheet.getSheetByName(itemToUpdate.sheetName).getDataRange();
    if(namedRange){
      namedRange.setRange(newRange);
    } else {
      getActiveSpreadsheet().setNamedRange(itemToUpdate.namedRange, newRange);
    }
  } else {
    Logger.log('not found itemToUpdate');
  }
}
function createOrUpdateForms() {
  const parameters = getParameters();
  const formCollaboratorDairy = new FormCollaboratorDairy(parameters);
  const formCollaboratorPayment = new FormCollaboratorPayment(parameters);
  const formWorkExpense = new FormWorkExpense(parameters);
  formCollaboratorDairy.createOrUpdateForm();
  formCollaboratorPayment.createOrUpdateForm();
  formWorkExpense.createOrUpdateForm();
}

function createOrUpdateFormsIfNeeded(sheetNameChanged: string){
  const sheetsThatUpdateForms = [
    sheets.parameters,
    sheets.collaborators,
    sheets.workers,
  ];
  const found = !!sheetsThatUpdateForms.find(sheet => sheet === sheetNameChanged);
  if (found){
    Logger.log('called createOrUpdateForms');
    createOrUpdateForms();
  } else {
    Logger.log('not called createOrUpdateForms');
  }
}

function onEditSpreadsheet(event: GoogleAppsScript.Events.SheetsOnEdit) {
  const sheetNameChanged = event.range.getSheet().getName();
  updateNamedRanges(sheetNameChanged);
  createOrUpdateFormsIfNeeded(sheetNameChanged);
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

function createTriggersNotFound() {
  const parameters = getParameters();
  const triggersToSet = [
    {
      triggerSourceId: getActiveSpreadsheet().getId(),
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
  UtilitiesScript.createTriggersNotFound(triggersToSet);
}
