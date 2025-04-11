import { Injectable } from "@angular/core";
import { CondominalManagerInfo } from "./models/condominal-manager-contact-info.model";

@Injectable({
  providedIn: 'root'
})
export class CondominalManagerInfoService {
  private readonly API_URL = "https://localhost:7020/api";

  private mockCondominalManagerInfo: CondominalManagerInfo = {
    name: "João Silva da Costa",
    email: "joaocostasindico@gmail.com",
    phone: "+55 11 91234-5678"
  }

  constructor() { }

  public getCondominalManagerInfo(): CondominalManagerInfo {
    return this.mockCondominalManagerInfo;
  }

}