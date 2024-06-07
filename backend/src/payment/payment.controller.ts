import { Controller, Get, Post, Redirect, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Get('/zalo-pay')
  async createZaloPayment(@Req() req, @Res() res) {
    const response = await this.paymentService.createZaloPayment();
    res.redirect(response.order_url);
  }
  @Post('/zalopayCallback')
  async handleCallbackZaloPayment(@Req() req, @Res() res) {
    console.log('zalopay callback');
    const result = await this.paymentService.handleCallbackZaloPayment(
      req,
      res,
    );
    console.log('result :', result);
  }
}
