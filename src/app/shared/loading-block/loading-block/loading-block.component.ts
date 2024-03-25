import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading-service/loading-service.service';

@Component({
  selector: 'app-loading-block',
  templateUrl: './loading-block.component.html',
  styleUrls: ['./loading-block.component.scss'],
})
export class LoadingBlockComponent {
  show!: boolean;
  constructor(public loadingService: LoadingService) {}
}
