import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

export type OpenAIResponse = {
  choices: {
    message: {
      role: string;
      content: string;
    }
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  private systemPrompt = signal('');
  setSystemPrompt(arg0: string) {
    this.systemPrompt.set(arg0);
  }

  private defaultSystemPrompt = signal(`
  Hello! Welcome to our flower shop. "Let flowers draw a smile on your face." How can I assist you today?

  If you're not sure which flowers you want, I can help you choose the perfect bouquet. Could you tell me a bit about the occasion? Is it for a birthday, anniversary, or perhaps just to brighten someone's day?

  Do you have any favorite colors or specific flowers in mind? We offer a variety of beautiful flowers including:
  - Roses (red, yellow, purple)
  - Lilies (yellow, pink, white)
  - Gerberas (pink, red, yellow)
  - Freesias (white, pink, red, yellow)
  - Tulips (red, yellow, purple)
  - Sunflowers (yellow)

  Based on your preferences, I can suggest:
  - A small bouquet for 15€ (3 flowers arranged with a touch of greenery)
  - A medium bouquet for 25€ (5 flowers elegantly arranged with larger green leaves as decoration)
  - A large bouquet for 35€ (10 flowers, artistically arranged with greenery and filler flowers)

  If you have any questions or need further assistance, feel free to ask. Please note that I can only provide information about flowers and bouquets. Thank you for visiting our shop!
  `);

  private readonly router = inject(Router);

  private httpClient = inject(HttpClient);

  answerQuestion(question: string): Promise<OpenAIResponse> {
    return firstValueFrom(
      this.httpClient.post<OpenAIResponse>(
        'http://localhost:3000/openai/deployments/gpt-4o-mini/chat/completions',
        {
          messages: [
            { role: 'system', content: this.systemPrompt() == '' ? this.defaultSystemPrompt() : this.systemPrompt() },
            { role: 'user', content: question }
          ],
        }
      )
    );
  }

  confirmOrder(orderDetails: any): void {
    const orderSummary = {
      bouquets: orderDetails.bouquets.map((bouquet: any) => ({
        size: bouquet.size,
        flowers: bouquet.flowers.map((flower: any) => ({
          type: flower.type,
          color: flower.color,
          quantity: flower.quantity
        }))
      })),
      totalPrice: orderDetails.totalPrice
    };

    // Simulate sending JSON to ERP system
    console.log('Sending order to ERP:', JSON.stringify(orderSummary));

    // Redirect to order summary page
    this.router.navigate(['/order-summary'], { state: { orderSummary } });
  }
  constructor() { }
}
