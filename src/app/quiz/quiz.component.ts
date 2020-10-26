import { Component, OnInit } from '@angular/core';
import { Option,Question } from '../models';
import { Quiz } from '../models/quiz';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  score = 0
  quizes
  quizName
  quiz : Quiz = new Quiz(null);
  questions
  numQuestion
  questionAnswered = 0;
  option : Option = new Option(null);
  
  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizes = this.quizService.getQuiz();
    this.quizName = this.quizes.id;
    this.quizService.get(this.quizName).subscribe(res => {

      this.quiz = new Quiz(res);
      this.questions = this.quiz.questions;
      this.numQuestion = this.quiz.questions.length
      //this.startTime = new Date();
      //this.ellapsedTime = '00:00';
      //this.timer = setInterval(() => { this.tick(); }, 1000);
      //this.duration = this.parseTime(this.config.duration);
    });
  }
  reset(){
    this.quizes = this.quizService.getQuiz();
    this.quizName = this.quizes.id;
    this.quizService.get(this.quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.questions = this.quiz.questions;
      this.numQuestion = this.quiz.questions.length
      //this.startTime = new Date();
      //this.ellapsedTime = '00:00';
      //this.timer = setInterval(() => { this.tick(); }, 1000);
      //this.duration = this.parseTime(this.config.duration);
    });
    this.score = 0;
    this.questionAnswered = 0;
  }
  onSelect(question, option){
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { 
        if (x.id !== option.id) {
          x.selected = false;
        } else {
          x.selected = true;
          if (x.isAnswer) {
            question.isCorrect = true;
            this.score += 10;
          }
          else question. isCorrect = false
        }
      });
      this.questionAnswered++;
      question.isAnswered = true;
      console.log(question)
    }
  };

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };
}
