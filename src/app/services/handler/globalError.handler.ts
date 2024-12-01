
import { ErrorHandler, inject, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../error.service';
import { NotificationService } from '../notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    errorService = inject(ErrorService);
    notifier = inject(NotificationService);

    handleError(error: Error | HttpErrorResponse) {
        let message;
        let stackTrace;

        if (error instanceof HttpErrorResponse) {
            message = this.errorService.getServerMessage(error);
            this.notifier.showError(message);
        } else {
            message = `Ocurrio un error ${error.message}`; 
            this.notifier.showError(message);
        }
    }
}