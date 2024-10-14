import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Datadto } from './Data.dto';
import {  Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
  @Get('foglal')
  @Render('foglal.ejs')
  getFoglal(@Body() datadto: Datadto){
    return {
      errors: [],
      data: datadto,
    }
  }
  @Post('foglal')
  postFoglal(@Body() datadto: Datadto,
  @Res() response: Response ){
    let errors = [];
    const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH'; 
    const date= new Date();
  
    
    if(!datadto.name){
      errors.push("Név megadása kötelező!")
    }
    if(!datadto.email){
      errors.push("E-mail megadása kötelező!")
    }
    else if(! /^\w{1,}@\w{1,}$/.test(datadto.email)){
      errors.push('A @ jel előtt és után legyen min. 1-1 karakter')
  }
    if(!datadto.date){
      errors.push("Dátum választás kötelező!")
    }else if(new Date(datadto.date)<= date){
      errors.push("Nem foglalhat régebbre.")
    }
    
    if(!datadto.viewer){
      errors.push("Nézőszám megadása kötelező!")
    }
    else if(datadto.viewer<=0){
      errors.push("Minusz/nulla ember nem lehet!")
    }else if(datadto.viewer>=11){
      errors.push("10 ember a maximum!")
    }


    if(errors.length>0){
      response.render('foglal',{
        data: datadto,
        errors
      }
      )
      return;
    
    
    }
  
    response.redirect('sikeresFoglalas');
    

  }

  @Get('sikeresFoglalas')
  openOrderSeccess(){
    return 'Sikeres foglalás.'
  }

}
