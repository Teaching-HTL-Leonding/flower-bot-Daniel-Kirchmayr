import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAiService } from '../open-ai.service';

@Component({
  selector: 'app-system-prompt',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './system-prompt.component.html',
  styleUrl: './system-prompt.component.css'
})
export class SystemPromptComponent {

  systemPrompt = signal('');
  private readonly openAiService = inject(OpenAiService);

  submitSystemPrompt() {
    this.openAiService.setSystemPrompt(this.systemPrompt());
  }
}
