import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FeedbackService } from '../../service/feedback.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-feedback',
   standalone: true,
  imports: [MatRadioModule,MatFormFieldModule,MatDividerModule,FormsModule,MatCardModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  selectedQ1Answer: string = '';
  selectedQ2Answer: string = '';
  selectedQ3Answer: string = '';
  selectedQ4Answer: string = '';
  selectedQ5Answer: string = '';
  feedback: string = '';

  constructor(private feedbackService: FeedbackService) { } // Inject FeedbackService

  submitFeedback(form: NgForm) {
    const feedbackData = {
      q1_answer: this.selectedQ1Answer,
      q2_answer: this.selectedQ2Answer,
      q3_answer: this.selectedQ3Answer,
      q4_answer: this.selectedQ4Answer,
      q5_answer: this.selectedQ5Answer,
      feedback: this.feedback
    };
  
    this.feedbackService.submitFeedback(feedbackData).subscribe(response => {
      console.log('Feedback submitted successfully:', response);
      form.reset(); // Clear form after successful submission
      this.selectedQ1Answer = ''; // Reset selected radio button for question 1
      this.selectedQ2Answer = ''; // Reset selected radio button for question 2
      this.selectedQ3Answer = ''; // Reset selected radio button for question 3
      this.selectedQ4Answer = ''; // Reset selected radio button for question 4
      this.selectedQ5Answer = ''; // Reset selected radio button for question 5
      // Alternatively, you can show a success message
    }, error => {
      console.error('Error submitting feedback:', error);
      // Handle error
    });
  }
}  