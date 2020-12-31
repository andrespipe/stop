import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'stop-game-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  formNewGame = this.fb.group({
    isPrivateGame: [true, Validators.required],
    language: ['ES', Validators.required],
    nickName: ['AFMV', Validators.required],
    rounds: [5, Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public onSubmitNewGame(): void {
    
  }

}
