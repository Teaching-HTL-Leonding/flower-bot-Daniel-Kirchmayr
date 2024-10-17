import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemPromptService {
  private systemPrompt = signal('');

  setSystemPrompt(prompt: string) {
    this.systemPrompt.set(prompt);
  }

  getSystemPrompt() {
    return this.systemPrompt();
  }

  constructor() { }
}
