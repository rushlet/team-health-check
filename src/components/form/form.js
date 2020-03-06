import Results from './../results/results';
import conf from '../../config.json';
export default class Form {
    constructor() {
        console.log('building form');
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((btn) => {
            btn.addEventListener('change', (e) => this.clickBtn(e));
        });
        this.questionContainers = document.querySelectorAll('.question-container');
        this.categories = conf['team_health_questions'].map(question => question.id);
        this.userData = this.categories.reduce((a, b) => (a[b] = '', a), {});
        this.questionNumber = 0;

        this.emojiConf =  {
            red: "😔",
            amber: "😐",
            green: "😁"
        };

        this.showQuestion();
    }

    showQuestion() {
        const questionContainer = document.querySelector(`.question-container.${this.categories[this.questionNumber]}`);
        questionContainer.classList.add('in-view');
        questionContainer.classList.remove('to-answer');
    }

    hideQuestion(questionContainer) {
        questionContainer.classList.remove('in-view');
        questionContainer.classList.add('answered');
    }

    clickBtn(evt) {
        console.log('evt', evt);
        const selector = evt.target.id.split('_');
        const [ , category, rating] = selector;
        this.userData[category] = rating;
        console.log('userData', this.userData);
        
        this.questionNumber++;
        this.hideQuestion(evt.path[2]);
        (this.questionNumber <= this.categories.length - 1) ? this.showQuestion() : this.showSummaryAndSubmit();
    }

    showSummaryAndSubmit() {
        const finalScreen = this.questionContainers[this.questionContainers.length - 1];
        finalScreen.classList.add('in-view');
        finalScreen.classList.remove('to-answer');

        const summaryContainer = document.querySelector('.summary-container');
        const output = this.categories.reduce((previous, category, i) => {
            console.log('rating', this.userData[this.categories[i]], category);
            return `
                ${previous}
                <div class="summary-${this.categories[i]}"><span>${conf['team_health_questions'][i].title}: ${this.emojiConf[this.userData[this.categories[i]]]}</span></div>
            `;
        }, '');
        summaryContainer.innerHTML = output;
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