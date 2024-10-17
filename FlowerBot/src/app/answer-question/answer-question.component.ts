import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAiService } from '../open-ai.service';
import { MarkdownComponent } from 'ngx-markdown';
import { SystemPromptService } from '../system-prompt.service';

@Component({
  selector: 'app-answer-question',
  standalone: true,
  imports: [FormsModule, MarkdownComponent],
  templateUrl: './answer-question.component.html',
  styleUrl: './answer-question.component.css'
})
export class AnswerQuestionComponent {
  question = signal('');
  answer = signal('');
  conversationHistory: { sender: string, text: string}[] = [];


  private readonly openAiService = inject(OpenAiService);

  async answerQuestion() {
    if (this.conversationHistory.length >= 20) {
      this.answer.set('Starte die Konversation von neu du hast schon 20 Prompts erreicht');
      return;
    } else if (!this.question()) {
      this.answer.set('Bitte stelle eine Frage');
      return;
    }
    this.conversationHistory.push({ sender: 'user', text: this.question() });
    const res = await this.openAiService.answerQuestion(this.question());
    this.conversationHistory.push({ sender: 'bot', text: res.choices[0].message.content });
    this.question.set('');
    this.answer.set(res.choices[0].message.content);
  }

  startOver() {
    this.conversationHistory = [];
    this.answer.set('');
    this.question.set('');
  }
}


