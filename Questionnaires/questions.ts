class Unregistered_user {
    ip: string;

    fill_out_questionaire(selection): void {

    }
    search_for_questionaire(string): void {

    }
    view_statics(): void {

    }
    sign_up(name, passwort): void {

    }

}
class Registered_user extends Unregistered_user {
    user_name: string;
    passwort: string;


    get_questionaire(): string[] {
        let _rueckgabe: string[] = ["hallo", "du"]
        return _rueckgabe
    }
    sign_in(name, passwort): void {

    }
    create_questionaire(): void {

    }
    show_questionaire(): void {

    }

}

class Questionarie {
    title: string;
    time_Span: Date;
    questions: string[];
    is_valid: boolean;
    
    constructor(_title: string, _time_span: Date, _questions: string[], _is_valid: boolean) {

        this.time_Span = _time_span;
        this.questions = _questions;
        this.is_valid = _is_valid;

        if (this.title != null ){ //title ist eindeutig 
            this.title = _title;
        }
        if(_is_valid == true){
            this.finalize_questionaire();
        }
    }
    add_question(_question:Question): void {
        if (_question.text!= null && _question.answers !=null) {
            this.is_valid = true;
        }
        else if (this.is_valid == true){
            this.questions.push(_question.text);
            for (let i:number = 0; i <= _question.answers.length; i++){
                this.questions.push(_question.answers[i]);

            }
   


        }
        else {
            this.add_question(_question);
        }

    }
    show_statistics(boolean): void {

    }
    finalize_questionaire(): void {
        let mindestanzahl: number = 7;
        if (this.questions.length >= mindestanzahl) {
            console.log("umfrage erstellt");
        }
        else {
            console.log("das sind nicht genug fragen für eine Umfrage")
            //this.add_question( Question);

        }
       
    }
}
class Question {
    text: string;
    answers: string[];
    get_answers(): string[] {
        let _rueckgabe: string[] = ["hallo", "du"]
        return _rueckgabe
    }
}