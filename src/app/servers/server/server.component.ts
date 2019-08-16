import {Component, OnDestroy, OnInit} from '@angular/core';

import { ServersService } from '../servers.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit{
  paramsSubscription: Subscription;
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
  this.server = this.serversService.getServer(id);


  /*  this.server = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
      status: this.route.snapshot.params['status']
    }; */

     this.route.params.subscribe((params: Params) => {
      this.server  = this.serversService.getServer(+params['id']);

    });
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
