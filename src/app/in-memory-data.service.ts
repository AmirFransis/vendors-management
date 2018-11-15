import { InMemoryDbService } from 'angular-in-memory-web-api';;
import { Injectable } from '@angular/core';
import { Vendor } from './vendor';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const vendors = [
      { id: 11, name: 'SAP', address: "1658  Concord Street", services: ['First aid','saddling','X-ray'] },
      { id: 12, name: 'FIS Global', address: "4252  Stutler Lane", services: ['First aid']  },
      { id: 13, name: 'Oracle', address: "343  Chapmans Lane", services: ['First aid','saddling'] },
      { id: 14, name: 'Fiserv', address: "1135  Maple Street", services: ['First aid','saddling','X-ray'] },
      { id: 15, name: 'Matrix', address: "4757  Benson Street", services: ['First aid','X-ray'] }
    ];
    return {vendors};
  }

  // Overrides the genId method to ensure that a vendor always has an id.
  // If the vendors array is empty,
  // the method below returns the initial number (11).
  // if the vendors array is not empty, the method below returns the highest
  // vendor id + 1.
  genId(vendors: Vendor[]): number {
    return vendors.length > 0 ? Math.max(...vendors.map(vendor => vendor.id)) + 1 : 11;
  }
}
