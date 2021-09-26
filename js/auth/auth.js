import {oauth2} from '@sexycoders/oauth2';
import {libauth} from '@sexycoders/libauth.js';

export class AuthObject
  {
    constructor(protocol)
      {
        if(protocol=='libauth')
          this.libauth=new libauth();
        else
          this.oauth2=new oauth2();

        //general properties
        this.site=new Object();
        this.site.location=window.location.href;
        this.site.protocol=window.location.protocol;
        this.site.domain=window.document.domain;
        this.site.port=window.location.port;
        this.site.parent=null;
        this.site.home="https://uniclient.sexycoders.org";
        this.site.auth_server_domain="https://auth.sexycoders.org";
        this.site.auth_page=this.auth_server_domain+"/login.html"
        this.site.auth_domain="https://auth.sexycoders.org";
      }
  }

