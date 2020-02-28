import Results from './../results/results';

export default class Form {
    constructor() {
        console.log('building form');
    }

    onFormSubmit() {
        this.form.querySelector('input[type="submit"]').addEventListener('click', (evt) => {
            event.preventDefault();
            this.results.renderResults({
                type: this.selectedType,
                unit: this.selectedUnit,
                value: this.inputValueEl.value,
            });
        }, false);
    }

    setUpEventListeners() {
        this.typeRadioBtns = document.querySelectorAll('.input-container__type input[type="radio"]');
        this.typeRadioBtns.forEach((el) => {
            el.addEventListener('change', (evt) => this.updateUnitOptions(evt));
        });
        this.unitRadioBtns = document.querySelectorAll('.input-container__unit input[type="radio"]');
        this.unitRadioBtns.forEach((el) => {
            el.addEventListener('change', (evt) => this.showValue(evt));
        });
    }
}