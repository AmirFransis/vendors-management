import { Component, OnInit } from '@angular/core';
import { Vendor } from '../vendor';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from '../vendor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  @Input() vendor: Vendor;

  constructor(
    private route: ActivatedRoute,
    private vendorService: VendorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVendor();
  }

  getVendor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.vendorService.getVendor(id)
      .subscribe(vendor => this.vendor = vendor);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.vendorService.updateVendor(this.vendor)
      .subscribe(() => this.goBack());
  }
}
