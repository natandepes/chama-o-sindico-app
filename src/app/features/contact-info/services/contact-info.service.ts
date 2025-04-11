import { Injectable } from "@angular/core";
import { ContactInfo } from "../models/contact-info";

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {
  private readonly API_URL = "https://localhost:7020/api";

  private mockCondominalManagerInfo: ContactInfo = {
    name: "João Silva da Costa",
    email: "joaocostasindico@gmail.com",
    phone: "+55 11 91234-5678"
  }

  constructor() { }

  public getCondominalManagerInfo(): ContactInfo {
    return this.mockCondominalManagerInfo;
  }

}