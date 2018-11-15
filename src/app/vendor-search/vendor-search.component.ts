import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Observable, Subject } from 'rxjs';
import { Vendor } from '../vendor';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-vendor-search',
  templateUrl: './vendor-search.component.html',
  styleUrls: ['./vendor-search.component.css']
})
export class VendorSearchComponent implements OnInit {
  vendors$: Observable<Vendor[]>;
  private searchTerms = new Subject<string>();

  constructor(private vendorService: VendorService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.vendors$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.vendorService.searchVendors(term)),
    );
  }
}
