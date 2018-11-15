import { Component, OnInit } from '@angular/core';
import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  vendors: Vendor[] = [];
  
  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    this.getVendors();
  }

  getVendors(): void {
    this.vendorService.getVendors()
      .subscribe(vendors => this.vendors = vendors);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.vendorService.addVendor({ name } as Vendor)
      .subscribe(vendor => {
        this.vendors.push(vendor);
      });
  }

  delete(vendor: Vendor): void {
    this.vendors = this.vendors.filter(h => h !== vendor);
    this.vendorService.deleteVendor(vendor).subscribe();
  }

}
